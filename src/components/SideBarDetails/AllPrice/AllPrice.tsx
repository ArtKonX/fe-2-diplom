import styles from './AllPrice.module.scss';
import currency from '../../../assets/svg/currency-white.svg';

const AllPrice = ({ price }: { price: number }) => {

    return (
        <div className={styles["all-price"]}>
            <h4 className={styles["all-price__text"]}>
                Итог
            </h4>
            <span className={styles["all-price__price"]}>
                {price}
                <img src={currency} alt="рубль" className={styles["price-currency"]} />
            </span>
        </div>
    )
}

export default AllPrice