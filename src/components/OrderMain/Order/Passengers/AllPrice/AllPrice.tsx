import LinkChange from '../../../../Ui/LinkChange/LinkChange';
import currency from '../../../../../assets/svg/currency.svg';
import styles from './AllPrice.module.scss';

const AllPrice = ({ price }: { price: number }) => {

    return (
        <div className={styles['all-price']}>
            <div className={styles["all-price__text"]}>
                Всего
                <div className={styles["price-currency"]}>
                    <span className={styles["price"]}>{price}</span>
                    <img src={currency} alt="рубль" className={styles['currency']} />
                </div>
            </div>
            <LinkChange text='Изменить' to='/selection-places' />
        </div>
    )
}

export default AllPrice