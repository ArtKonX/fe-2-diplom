import styles from './Advantages.module.scss';

import advantages1 from '../../../assets/svg/advantages1.svg';
import advantages2 from '../../../assets/svg/advantages2.svg';
import advantages3 from '../../../assets/svg/advantages3.svg';

const Advantages = () => {

    return (
        <ul className={styles["work__advantages"]}>
            <li className={styles['work__advantages-elem']}>
                <img src={advantages1} alt="монитор" className={styles['work__image']} />
                <p className={styles["work__advantages-text"]}>Удобный заказ<br/>на сайте</p>
            </li>
            <li className={styles['work__advantages-elem']}>
                <img src={advantages2} alt="дом" className={styles['work__image']} />
                <p className={styles["work__advantages-text"]}>Нет необходимости<br/>ехать в офис</p>
            </li>
            <li className={styles['work__advantages-elem']}>
                <img src={advantages3} alt="глобальная паутина" className={styles['work__image']} />
                <p className={styles["work__advantages-text"]}>Огромный выбор<br/>направлений</p>
            </li>
        </ul>
    )
}

export default Advantages