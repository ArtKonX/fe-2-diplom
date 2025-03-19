import styles from './OrderSuccessInfo.module.scss';

import iconInfo1 from '../../../../assets/icons/success-info-icon-1.svg';
import iconInfo2 from '../../../../assets/icons/success-info-icon-2.svg';
import iconInfo3 from '../../../../assets/icons/success-info-icon-3.svg';

const OrderSuccessInfo = () => {

    return (
        <div className={styles["order-success-info-container"]}>
            <ul className={styles["order-success-info"]}>
                <li className={styles["order-success-info__elem"]}>
                    <img src={iconInfo1} alt="монитор с изображением билета" className={styles["success-info-img"]} />
                    <span className={styles['success-info-text']}>
                        билеты будут<br/>
                        отправлены<br/>
                        на ваш <span className={styles['success-info-text__color']}>e-mail</span>
                    </span>
                </li>
                <li className={styles["order-success-info__elem"]}>
                    <img src={iconInfo2} alt="билеты" className={styles["success-info-img"]} />
                    <span className={styles['success-info-text']}>
                        <span className={styles['success-info-text__color']}>распечатайте</span><br/>
                        и сохраняйте билеты<br/>
                        до даты поездки
                    </span>
                </li>
                <li className={styles["order-success-info__elem"]}>
                    <img src={iconInfo3} alt="проводник" className={styles["success-info-img"]} />
                    <span className={styles['success-info-text']}>
                        <span className={styles['success-info-text__color']}>предьявите</span><br/>
                        распечатанные<br/>
                        билеты при посадке
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default OrderSuccessInfo