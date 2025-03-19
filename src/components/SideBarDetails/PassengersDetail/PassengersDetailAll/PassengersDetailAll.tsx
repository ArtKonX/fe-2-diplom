import styles from './PassengersDetailAll.module.scss';
import currency from '../../../../assets/svg/currency.svg';

const PassengersDetailAll = ({ passengersData }: { passengersData: {adults: {number: number, price: number}, kids:{number: number, price: number}}}) => {

    return (
        <div className={styles["passengers-details-all"]}>
            <div className={styles["adults-and-price"]}>
                <span className={styles["adults-and-price__adults"]}>
                    {passengersData.adults.number == 1 ? `${passengersData.adults.number} Взрослый` : `${passengersData.adults.number} Взрослых`}
                </span>
                <span className={styles["adults-and-price__price"]}>
                    {passengersData.adults.price}
                    <img src={currency} alt="рубль" className={styles["currency"]} />
                </span>
            </div>
            <div className={styles["kids-and-price"]}>
                <span className={styles["kids-and-price__kids"]}>
                    {passengersData.kids.number == 1 ? `${passengersData.kids.number} Ребенок` : `${passengersData.kids.number} Детей`}
                </span>
                <span className={styles["kids-and-price__price"]}>
                    {passengersData.kids.price}
                    <img src={currency} alt="рубль" className={styles["currency"]} />
                </span>
            </div>
        </div>
    )
}

export default PassengersDetailAll