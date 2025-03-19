import Advantages from './Advantages/Advantages';
import styles from './Work.module.scss';
import { HashLink } from 'react-router-hash-link';

const Work = () => {

    return (
        <div id='work' className={styles["work"]}>
            <div className={styles["work__container"]}>
                <div className={styles['work__title-and-link']}>
                    <h2 className={styles['work__title']}>
                        Как это работает
                    </h2>
                    <HashLink smooth to='#contacts' className={styles['work__link']}>Узнать больше</HashLink>
                </div>
                <Advantages />
            </div>
        </div>
    )
}

export default Work