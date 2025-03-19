import styles from './AllPrice.module.scss';

import currencyImg from '../../../assets/svg/currency.svg'

const AllPrice = ({ price }: { price: number }) => {

    return (
        <div className={styles['all-price']}>
            {price}
            <img src={currencyImg} alt='рубль' className={styles["all-price__img-currency"]} />
        </div>
    )
}

export default AllPrice