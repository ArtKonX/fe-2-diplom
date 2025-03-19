import styles from './TypeAndPrice.module.scss';
import currency from '../../../../../../assets/svg/currency.svg';

const TypeAndPrice = ({ type, numberPlaces, priceDep, prices }: TypeAndPriceProps) => {

    const priceFilter = () =>
        [
            priceDep?.price,
            priceDep?.top_price,
            priceDep?.bottom_price,
            priceDep?.side_price,
            prices?.price,
            prices?.top_price,
            prices?.bottom_price,
            prices?.side_price,
        ].filter((item) => typeof item === 'number');

    const showTooltip = () => {

        // Логика показа подсказки о информации доступных мест
    }

    return (
        <div className={styles["type-and-price"]}>
            <p className={styles["type-and-price__type"]}>{type}</p>
            <button type='button' className={styles["type-and-price__number-places-btn"]} onClick={showTooltip}>{numberPlaces}</button>
            <p className={styles["type-and-price__min-price"]}><span className={styles['type-and-price__from']}>от</span>{Math.min(...priceFilter())}<img alt='рубль' src={currency} className={styles['type-and-price__currency-img']} /></p>
        </div>
    )
}

export default TypeAndPrice