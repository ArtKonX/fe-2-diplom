import { useState } from 'react';
import styles from './Feedback.module.scss';
import Star from './Star/Star';

const Feedback = () => {

    const [active, setActive] = useState<number>(0);

    return (
        <div className={styles['feedback-block']} >
            <span className={styles["feedback-block__text"]}>
                Оценить сервис
            </span>
            <ul className={styles["feedback-list-stars"]}>
                {Array.from({length: 5}).map((_, i) => (<li className={styles['feedback-list-stars__elem']} key={i}><Star active={active} setActive={setActive} index={i}/></li>))}
            </ul>
        </div>
    )
}

export default Feedback