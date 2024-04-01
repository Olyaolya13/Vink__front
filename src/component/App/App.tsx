import styles from './app.module.scss';
import ChatbotBtn from '../ChatbotBtn/ChatbotBtn';

export default function App() {
  return (
    <div className={styles.app}>
      <ChatbotBtn />
    </div>
  );
}
