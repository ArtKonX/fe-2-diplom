import styles from './FeedbacksList.module.scss';

import feedbacks1 from '../../../assets/images/feedback1.png';
import feedbacks2 from '../../../assets/images/feedback2.png';

const FeedbacksList = () => {

    return (
        <ul className={styles["feedbacks__list"]}>
            <li className={styles["feedback"]}>
                <img src={feedbacks1} alt="молодая девушка" className={styles["feedback__avatar"]} />
                <div className={styles["feedback__name-and-text"]}>
                    <h2 className={styles["feedback__name"]}>Екатерина Вальнова</h2>
                    <p className={styles["feedback__text"]}>
                        <span className={`${styles["feedback__symbol"]} ${styles["feedback__symbol_open"]}`}>“</span>Доброжелательные подсказки
                        на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые. <span className={`${styles["feedback__symbol"]} ${styles["feedback__symbol_closed"]}`}>”</span>
                    </p>
                </div>
            </li>
            <li className={styles["feedback"]}>
                <img src={feedbacks2} alt="мужчина с бородой на пляже" className={styles["feedback__avatar"]} />
                <div className={styles["feedback__name-and-text"]}>
                    <h2 className={styles["feedback__name"]}>Евгений Стрыкало</h2>
                    <p className={styles["feedback__text"]}>
                        <span className={`${styles["feedback__symbol"]} ${styles["feedback__symbol_open"]}`}>“</span>СМС-сопровождение до посадки
                        Сразу после оплаты ж/д билетов
                        и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке. <span className={`${styles["feedback__symbol"]} ${styles["feedback__symbol_closed"]}`}>”</span></p>
                </div>
            </li>
        </ul>
    )
}

export default FeedbacksList