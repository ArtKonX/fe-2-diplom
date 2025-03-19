import SideBarDetails from "../SideBarDetails/SideBarDetails";
import Order from "./Order/Order";
import styles from './OrderMain.module.scss';

const OrderMain = () => {

    return (
        <div className={styles['order-main-container']}>
            <div className={styles['order-main']}>
                <div className={styles["sidebar"]}>
                    <SideBarDetails />
                </div>
                <div className={styles["order"]}>
                    <Order />
                </div>
            </div>
        </div>
    )
}

export default OrderMain