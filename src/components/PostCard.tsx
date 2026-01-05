import { Post } from '@/types/post';
import styles from './PostCard.module.css';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.metadata}>
        User ID: {post.userId} | Post ID: {post.id}
      </div>
      <h2 className={styles.title}>
        {post.title}
      </h2>
      <p className={styles.body}>
        {post.body}
      </p>
    </div>
  );
}