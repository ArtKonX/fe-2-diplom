import currency from '../../../../assets/svg/currency.svg';

import styles from './NumberOrderAndPrice.module.scss';

const NumberOrderAndPrice = ({ numberOrder, price }: { numberOrder: string | undefined, price: number | undefined }) => {

    return (
        <div className={styles["number-order-and-price"]}>
            <div className={styles["number-order"]}>
                №Заказа &nbsp;
                <span className={styles["number-order__number"]}>
                    {numberOrder}
                </span>
            </div>
            <div className={styles["all-price"]}>
                сумма
                <div className={styles["price-and-currency"]}>
                    <span className={styles["price"]}>
                        {price}
                    </span>
                    <img src={currency} alt="рубль" className={styles["currency"]} />
                </div>
            </div>
        </div>
    )
}

export default NumberOrderAndPrice