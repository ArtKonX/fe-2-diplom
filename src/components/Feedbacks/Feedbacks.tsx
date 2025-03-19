import styles from './Feedbacks.module.scss';
import FeedbacksList from './FeedbacksList/FeedbacksList';

const Feedbacks = () => {

    return (
        <div id='feedbacks' className={`${styles['feedbacks']} ${styles['feedbacks_container']}`}>
            <h2 className={styles['feedbacks__title']}>отзывы</h2>
            <FeedbacksList />
        </div>
    )
}

export default Feedbacks