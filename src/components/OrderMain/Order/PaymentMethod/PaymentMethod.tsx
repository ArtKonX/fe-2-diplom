import { useSelector } from 'react-redux';
import HeadingTop from '../../../Ui/HeadingTop/HeadingTop';
import LinkChange from '../../../Ui/LinkChange/LinkChange';
import styles from './PaymentMethod.module.scss';

interface Passenger {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

const PaymentMethod = () => {

    const personalData = useSelector((state: { personalData: {personalData: Passenger[]} }) => state.personalData);

    let methodPayment = personalData.personalData[0]?.cash ? 'Наличными' : 'Онлайн';

    if (personalData.personalData[0]) {
        methodPayment = personalData.personalData[0].cash ? 'Наличными' : 'Онлайн';
    }

    return (
        <div className={styles['payment-method']}>
            <HeadingTop text='Способ оплаты' classHeading='train-heading' />
            <div className={styles["payment-method__current-and-link"]}>
                <span className={styles["method"]}>
                    {methodPayment}
                </span>
                <div className={styles["link-change"]}>
                    <LinkChange text='Изменить' to='/payment' />
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod