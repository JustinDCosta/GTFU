import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useGTFUStore } from '../context/useGTFUStore';
import { triggerSuccessHaptic, triggerTickHaptic } from '../utils/haptics';

export default function TimerScreen() {
  const router = useRouter();
  const { customTimerLength, incrementGtfu } = useGTFUStore();
  const [timeLeft, setTimeLeft] = useState(customTimerLength);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        triggerTickHaptic();
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = async () => {
    await triggerSuccessHaptic();
    await incrementGtfu();

    
    // Give user a brief moment to see "0" or "GO" before returning
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.timerText, timeLeft === 0 && styles.goText]}>
        {timeLeft > 0 ? timeLeft : 'GO'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Absolute black full-screen takeover
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    color: '#fff',
    fontSize: 120,
    fontWeight: '900',
  },
  goText: {
    color: '#FF5722',
  },
});
