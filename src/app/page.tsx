'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import { Post } from '@/types/post';
import styles from './page.module.css';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts when component mounts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Function to show next card
  const showNextCard = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Function to show previous card
  const showPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Function to reset to first card
  const resetCards = () => {
    setCurrentIndex(0);
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.loading}>Loading posts...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.error}>Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Posts from JSONPlaceholder
        </h1>

        <div className={styles.counter}>
          Card {currentIndex + 1} of {posts.length}
        </div>
        
        <div className={styles.cardContainer}>
          <PostCard post={posts[currentIndex]} />
        </div>

        <div className={styles.buttonGroup}>
          <button 
            onClick={showPreviousCard} 
            disabled={currentIndex === 0}
            className={styles.button}
          >
            ← Previous
          </button>

          <button 
            onClick={resetCards}
            className={styles.button}
          >
            Reset
          </button>

          <button 
            onClick={showNextCard} 
            disabled={currentIndex === posts.length - 1}
            className={styles.button}
          >
            Next →
          </button>
        </div>

        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${((currentIndex + 1) / posts.length) * 100}%` }}
          />
        </div>
      </div>
    </main>
  );
}