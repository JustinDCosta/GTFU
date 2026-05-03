# GTFU (Get The F*** Up) 🚀

GTFU is a minimalist, no-nonsense productivity mobile app designed to help you break out of procrastination. It challenges you with a countdown timer—when it hits zero, you get up and take action. 

## 🧠 Why I Built This

Procrastination is often fueled by overthinking. We sit, deliberate, and look for the perfect time to start. GTFU is built on the idea that starting should be an involuntary reflex, not a debate. By associating an action with a short, visceral countdown timer, it forces you out of paralysis by analysis. No complex task management, no convoluted scheduling—just a button, a timer, and a lifetime counter of how many times you've conquered inertia.

## ✨ Features

- **Action-Oriented Timer:** A customizable countdown (e.g., 3 seconds) that builds momentum and fires off a haptic success when time is up. 
- **Lifetime GTFU Counter:** Tracks the total number of times you've initiated action. 
- **Offline-First Resilience:** Data is stored locally on your device via AsyncStorage so you can always use the app, whether you have a signal or not.
- **Firebase Cloud Sync:** Log in to automatically sync your lifetime count securely to the cloud.
- **Lo-Fi Productivity Quotes:** A curated collection of 100 hard-hitting, no-nonsense quotes to snap you into focus. You can randomize them on the main dashboard or browse and "like" your favorites to keep them at the top.
- **Auditory/Sensory Feedback:** Full haptic integration for physical feedback (sound effects deliberately omitted to keep the experience discrete and lo-fi).

## 🛠️ How It Was Built (Tech Stack)

- **Framework:** [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for lightweight, global state handling.
- **Local Storage:** `@react-native-async-storage/async-storage` for fast, offline data persistence.
- **Backend / Auth:** [Firebase Auth & Firestore](https://firebase.google.com/) for secure authentication and cloud-syncing stats.
- **UI & Icons:** Custom brutalist/lo-fi styling with `lucide-react-native` and `react-native-svg`.

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/JustinDCosta/GTFU.git
   cd GTFU
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Run the App**
   ```bash
   npx expo start
   ```
