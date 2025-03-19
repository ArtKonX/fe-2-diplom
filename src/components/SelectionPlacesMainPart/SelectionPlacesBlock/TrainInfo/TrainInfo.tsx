import styles from './TrainInfo.module.scss';

import trainImg from '../../../../assets/svg/train.svg';
import hoursMinutesFormatted from '../../../../utils/hoursMinutesFormatted';
import time from '../../../../assets/icons/time.svg';
import secsondsToFormattedTimeWithText from '../../../../utils/secondsToFormattedTimeWithText';

interface Direction {
    from: {
        datetime: number,
        city: {
            name: string
        },
        railway_station_name: string
    },
    to: {
        datetime: number,
        city: {
            name: string
        },
        railway_station_name: string
    },
    train: { name: string },
    duration: number
}

const TrainInfo = ({ directionTrain, imgArrow, direction }: { directionTrain: 'arrival' | 'departure', imgArrow: string, direction: Direction }) => {

    return (
        <div className={styles['train-info']}>
            <div className={styles["directions"]}>
                <img src={trainImg} alt="поезд" className={styles['directions__img-train']} />
                <div className={styles["directions__info"]}>
                    <p className={styles["train-name"]}>{direction?.train?.name}</p>
                    <div className={styles["direction-from-and-to"]}>
                        <span className={styles["direction-from"]}>
                            {direction?.from?.city?.name + ' '}
                            →
                        </span>
                        <span className={styles["direction-to"]}>
                            {direction?.to?.city?.name}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles["direction"]}>
                <div className={styles["start-direction"]}>
                    <time className={styles["start-direction__time"]}>
                        {hoursMinutesFormatted(direction?.from?.datetime)}
                    </time>
                    <p className={styles["start-direction__city"]}>
                        {directionTrain == 'departure' ? direction?.from?.city?.name : direction?.to?.city.name}
                    </p>
                    <p className={styles["start-direction__railway-station"]}>
                        {directionTrain == 'departure' ? direction?.from?.railway_station_name : direction?.to?.railway_station_name} вокзал
                    </p>
                </div>
                <div className={styles["arrow"]}>
                    <img src={imgArrow} alt="стрелка" className={styles["arrow__img"]} />
                </div>
                <div className={styles["end-direction"]}>
                    <time className={styles["end-direction__time"]}>
                        {hoursMinutesFormatted(direction?.to?.datetime)}
                    </time>
                    <p className={styles['end-direction__city']}>
                        {directionTrain == 'departure' ? direction?.to?.city.name : direction?.from?.city?.name}
                    </p>
                    <p className={styles["end-direction__railway-station"]}>
                        {directionTrain == 'departure' ? direction?.to?.railway_station_name : direction?.from?.railway_station_name} вокзал
                    </p>
                </div>
            </div>
            <div className={styles["all-time"]}>
                <img src={time} alt="часы" className={styles["all-time__img"]} />
                <div className={styles["all-time__data-time"]}>
                    <span className={styles["hours"]}>{secsondsToFormattedTimeWithText(direction?.duration).hrs}</span>
                    <span className={styles["minutes"]}>{secsondsToFormattedTimeWithText(direction?.duration).mins}</span>
                </div>
            </div>
        </div>
    )
}

export default TrainInfo