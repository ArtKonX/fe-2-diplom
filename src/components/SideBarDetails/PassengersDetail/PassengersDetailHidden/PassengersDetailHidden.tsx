import { useState } from 'react';
import styles from './PassengersDetailHidden.module.scss';
import PassengersDetailAll from '../PassengersDetailAll/PassengersDetailAll';
import human from '../../../../assets/icons/human.svg';

const PassengersDetailHidden = ({ passengersData }: { passengersData: {adults: {number: number, price: number}, kids:{number: number, price: number}}}) => {

    const [hidden, setHidden] = useState<boolean>(false);

    const onAction = () => {
        setHidden(!hidden);
    }

    return (
        <div className={styles["passengers-details"]}>
            <div className={styles["passengers-details__data-and-action"]}>
                <div className={styles["passengers-details-data"]}>
                    <img src={human} alt="стрелка" className={styles["details-human"]} />
                    <h3 className={styles["details-name"]}>
                        Пассажиры
                    </h3>
                </div>
                <button onClick={onAction} className={styles["passengers-details__button"]}>{hidden ? '+' : '-'}</button>
            </div>
            {!hidden && <PassengersDetailAll passengersData={passengersData} />}
        </div>
    )
}

export default PassengersDetailHidden