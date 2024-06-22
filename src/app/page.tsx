import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Calendar />
    </main>
  );
}
