import styles from './overlay.module.scss';

type Tclose = {
    closeChatbot: () => void;
}

function Overlay({closeChatbot}: Tclose) {
    return (
        <section onClick={closeChatbot} className={styles.overlay}></section>
    )
}

export default Overlay