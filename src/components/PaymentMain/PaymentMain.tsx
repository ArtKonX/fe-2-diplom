import styles from './PaymentMain.module.scss';

import SideBarDetails from "../SideBarDetails/SideBarDetails"
import PaymentForm from './PaymentForm/PaymentForm';


const PaymentMain = () => {

    return (
        <div className={styles['payment-main-container']}>
            <div className={styles['payment-main']}>
                <div className={styles["sidebar"]}>
                    <SideBarDetails />
                </div>
                <div className={styles["payment"]}>
                    <PaymentForm />
                </div>
            </div>
        </div>
    )
}

export default PaymentMain