import { Dispatch, SetStateAction } from 'react';
import Checkbox from '../../../Ui/Checkbox/Checkbox';
import HeadingTop from '../../../Ui/HeadingTop/HeadingTop';
import styles from './PaymentMethod.module.scss';

interface PassengerState {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

const PaymentMethod = ({passenger, setPassenger}: {passenger: PassengerState, setPassenger: Dispatch<SetStateAction<PassengerState>>}) => {

    const paymentOnlineMethods = [
        { id: 1, name: 'Банковской картой' },
        { id: 2, name: 'PayPal' },
        { id: 3, name: 'Visa QIWI Wallet' }
    ]

    return (
        <div className={styles["payment-method"]}>
            <HeadingTop text='Способ оплаты' classHeading='payment-heading'/>
            <div className={styles["payment-method__main-content"]}>
                <div className={styles["payment-online-methods-block"]}>
                    <Checkbox passenger={passenger as unknown as { [x: string]: boolean; }} name='online' classCheckbox='payment-method' id={1} setPassenger={setPassenger as unknown as Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>}>
                        <label className={styles['payment-method-label']} htmlFor="payment-method1" >Онлайн</label>
                    </Checkbox>
                    <ul className={styles["payment-online-methods"]}>
                        {paymentOnlineMethods.map(method => (<li key={method.id} className={styles['payment-online-methods__elem']}>{method.name}</li>))}
                    </ul>
                </div>
                <div className={styles["payment-cash-methods-block"]}>
                    <Checkbox passenger={passenger as unknown as { [x: string]: boolean; }} name='cash' classCheckbox='payment-method' id={2} setPassenger={setPassenger as unknown as Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>}>
                        <label className={styles['payment-method-label']} htmlFor="payment-method2" >Наличными</label>
                    </Checkbox>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod