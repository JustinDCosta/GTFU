import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { create } from 'zustand';
import { auth, db } from '../utils/firebaseConfig';
import { getData, storeData } from '../utils/storage';

interface GTFUState {
  gtfuCount: number;
  customTimerLength: number;
  user: User | null;
  likedQuotes: string[];
  setGtfuCount: (count: number) => void;
  incrementGtfu: () => Promise<void>;
  setCustomTimerLength: (length: number) => void;
  setUser: (user: User | null) => void;
  toggleLikeQuote: (quote: string) => void;
  initializeStore: () => Promise<void>;
}

export const useGTFUStore = create<GTFUState>((set, get) => ({
  gtfuCount: 0,
  customTimerLength: 3,
  user: null,
  likedQuotes: [],

  setGtfuCount: (count) => set({ gtfuCount: count }),
  
  setCustomTimerLength: (length) => {
     set({ customTimerLength: length });
     storeData('customTimerLength', length);
  },

  setUser: (user) => set({ user }),

  toggleLikeQuote: (quote) => {
    const current = get().likedQuotes;
    const isLiked = current.includes(quote);
    const newLiked = isLiked ? current.filter(q => q !== quote) : [...current, quote];
    set({ likedQuotes: newLiked });
    storeData('likedQuotes', newLiked);
  },

  incrementGtfu: async () => {
    const { gtfuCount, user } = get();
    const newCount = gtfuCount + 1;
    
    // 1. Update local state
    set({ gtfuCount: newCount });
    
    // 2. Update AsyncStorage
    await storeData('gtfuCount', newCount);

    // 3. Sync to Firebase if logged in
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          gtfuCount: increment(1)
        }).catch(async (error) => {
           if (error.code === 'not-found') {
             await setDoc(userRef, { gtfuCount: newCount, createdAt: new Date(), email: user.email, customTimerLength: get().customTimerLength });
           }
        });
      } catch (error) {
        console.error("Error syncing to Firebase:", error);
      }
    }
  },

  initializeStore: async () => {
    // Load initial local data
    const localCount = await getData('gtfuCount');
    if (localCount !== null) {
      set({ gtfuCount: localCount });
    }
    const localTimerLength = await getData('customTimerLength');
    if (localTimerLength !== null) {
        set({ customTimerLength: localTimerLength });
    }
    const localLikedQuotes = await getData('likedQuotes');
    if (localLikedQuotes !== null) {
        set({ likedQuotes: localLikedQuotes });
    }

    // Listen to Auth State
    onAuthStateChanged(auth, async (currentUser) => {
      set({ user: currentUser });
      if (currentUser) {
        // Fetch remote count
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const remoteData = userSnap.data();
          if (remoteData.gtfuCount !== undefined && remoteData.gtfuCount > get().gtfuCount) {
             set({ gtfuCount: remoteData.gtfuCount });
             await storeData('gtfuCount', remoteData.gtfuCount);
          }
        } else {
           // Create user doc if not exists
           await setDoc(userRef, {
             gtfuCount: get().gtfuCount,
             email: currentUser.email,
             createdAt: new Date(),
             customTimerLength: get().customTimerLength
           });
        }
      }
    });
  }
}));
