import styles from './LastTicket.module.scss';

import food from '../../../../assets/svg/food.svg';
import express from '../../../../assets/svg/express.svg';
import wifi from '../../../../assets/svg/wifi.svg';
import conditioner from '../../../../assets/svg/conditioner.svg';

import currency from '../../../../assets/svg/currency.svg';

const LastTicket = ({ ticket }: {ticket: TrainCardProps}) => {

    return (
        <div className={styles["ticket"]}>
            <div className={styles["directions"]}>
                <div className={`${styles["direction"]} ${styles["direction__from"]}`}>
                    <span className={styles["direction__city"]}>
                        {ticket.departure.from.city.name}
                    </span>
                    <span className={styles["direction__station"]}>
                        {ticket.departure.from.railway_station_name} вокзал
                    </span>
                </div>
                <div className={`${styles["direction"]} ${styles["direction__to"]}`}>
                    <span className={styles["direction__city"]}>
                        {ticket.departure.to.city.name}
                    </span>
                    <span className={styles["direction__station"]}>
                        {ticket.departure.to.railway_station_name} вокзал
                    </span>
                </div>
            </div>
            <div className={styles["options-and-min-price"]}>
                <div className={styles["options"]}>
                    {ticket.have_wifi && (<img src={wifi} alt="wifi" className={styles["options__img"]} />)}
                    {ticket.is_express && (<img src={express} alt="ракета" className={styles["options__img"]} />)}
                    <img src={food} alt="питание" className={styles["options__img"]} />
                    {ticket.have_air_conditioning && (<img src={conditioner} alt="кондиционер" className={styles["options__img"]} />)}
                </div>
                <div className={styles["min-price"]}>
                    <span className={styles['min-price__from']}>от</span>{ticket.min_price}<img alt='рубль' src={currency} className={styles['min-price__currency-img']} />
                </div>
            </div>
        </div>
    )
}

export default LastTicket