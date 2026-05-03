import { useRouter } from 'expo-router';
import { Quote, RefreshCw, Settings } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { useGTFUStore } from '../context/useGTFUStore';
import { getRandomQuote } from '../utils/quotes';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { gtfuCount, customTimerLength, initializeStore } = useGTFUStore();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    initializeStore();
    setQuote(getRandomQuote());
  }, []);

  const changeQuote = () => {
    setQuote(getRandomQuote());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/quotes')} style={styles.iconButton}>
          <Quote color="#fff" size={20} />
        </Pressable>
        <Pressable onPress={() => router.push('/profile')} style={styles.iconButton}>
          <Settings color="#fff" size={20} />
        </Pressable>
      </View>

      <View style={styles.centerContent}>
        <View style={styles.counterWrapper}>
          <Text style={styles.counterLabel}>Times you GTFU</Text>
          <Text style={styles.counterText}>{gtfuCount}</Text>
        </View>

        <Pressable 
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
          onPress={() => router.push('/timer')}
        >
          <Text style={styles.actionButtonText}>GTFU • {customTimerLength}s</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <View style={styles.quoteWrapper}>
          <Text style={styles.quoteText}>"{quote}"</Text>
          <Pressable onPress={changeQuote} style={styles.refreshButton}>
            <RefreshCw color="#aaa" size={18} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 24,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  iconButton: {
    padding: 12,
    backgroundColor: '#151515',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#222',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 24,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  counterWrapper: {
    alignItems: 'center',
    marginBottom: 80,
  },
  counterLabel: {
    color: '#666',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 12,
    fontWeight: '600',
  },
  counterText: {
    color: '#fff',
    fontSize: 100,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 110,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    width: '100%',
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  actionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  actionButtonText: {
    color: '#000',
    fontSize: 24,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  quoteWrapper: {
    backgroundColor: '#111',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#252525',
    width: '100%',
    maxWidth: 600,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quoteText: {
    color: '#ccc',
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 24,
    flex: 1,
    marginRight: 16,
  },
  refreshButton: {
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 50,
  },
});