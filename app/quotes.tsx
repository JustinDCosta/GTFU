import { useRouter } from 'expo-router';
import { ArrowLeft, Heart } from 'lucide-react-native';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useGTFUStore } from '../context/useGTFUStore';
import { quotes } from '../utils/quotes';

export default function QuotesScreen() {
  const router = useRouter();
  const { likedQuotes, toggleLikeQuote } = useGTFUStore();

  // Sort: Liked quotes on top
  const sortedQuotes = [...quotes].sort((a, b) => {
    const aLiked = likedQuotes.includes(a);
    const bLiked = likedQuotes.includes(b);
    if (aLiked && !bLiked) return -1;
    if (!aLiked && bLiked) return 1;
    return 0;
  });

  const renderItem = ({ item }: { item: string }) => {
    const isLiked = likedQuotes.includes(item);
    return (
      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>{item}</Text>
        <Pressable onPress={() => toggleLikeQuote(item)} style={styles.likeButton}>
          <Heart size={24} color={isLiked ? '#FF5722' : '#555'} fill={isLiked ? '#FF5722' : 'transparent'} />
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#fff" size={24} />
        </Pressable>
        <Text style={styles.title}>All Quotes</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={sortedQuotes}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  backButton: {
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 24,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  quoteCard: {
    backgroundColor: '#151515',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#222',
  },
  quoteText: {
    color: '#eaeaea',
    fontSize: 16,
    flex: 1,
    marginRight: 16,
    lineHeight: 24,
  },
  likeButton: {
    padding: 8,
  },
});
