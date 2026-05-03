import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useGTFUStore } from '../context/useGTFUStore';
import { auth } from '../utils/firebaseConfig';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, customTimerLength, setCustomTimerLength } = useGTFUStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      Alert.alert("Auth Error", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      Alert.alert("Sign Out Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Close</Text>
          </Pressable>
        </View>

        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timer Length (Seconds)</Text>
          <TextInput 
            style={styles.input}
            keyboardType="number-pad"
            value={customTimerLength.toString()}
            onChangeText={(val) => {
               const num = parseInt(val) || 3;
               setCustomTimerLength(num);
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {user ? (
            <View>
              <Text style={styles.userEmail}>Logged in as: {user.email}</Text>
              <Pressable onPress={handleSignOut} style={styles.authButton}>
                <Text style={styles.authButtonText}>Sign Out</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <TextInput 
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <TextInput 
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Pressable onPress={handleAuth} style={styles.authButton}>
                <Text style={styles.authButtonText}>{isLogin ? "Log In" : "Sign Up"}</Text>
              </Pressable>
              <Pressable onPress={() => setIsLogin(!isLogin)} style={styles.toggleAuthButton}>
                <Text style={styles.toggleAuthText}>
                  {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#888',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  userEmail: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  authButton: {
    backgroundColor: '#FF5722',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleAuthButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  toggleAuthText: {
    color: '#888',
    fontSize: 14,
  },
  toggleButton: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleButtonActive: {
    backgroundColor: '#FF5722',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
});
