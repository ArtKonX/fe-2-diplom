import formatDurationAsDate from '../../../../utils/formatDurationAsDate';
import hoursMinutesFormatted from '../../../../utils/hoursMinutesFormatted';
import secondsToFormattedTime from '../../../../utils/secondsToFormattedTime';
import styles from './DirectionDetailAll.module.scss';

const DirectionDetailAll = ({ directionWay, directionData, arrow }: { directionWay: string, directionData: {duration: number, train: {name: string}, from: {railway_station_name: string, city: {name: string}, datetime: number}, to: {railway_station_name: string, city: {name: string}, datetime: number}}, arrow: string }) => {

    return (
        <div className={styles["direction-detail-all"]}>
            <div className={styles["number-train"]}>
                <span className={styles["number-train__number-text"]}>№ Поезда</span>
                <span className={styles["number-train__number-name"]}>{directionData.train.name}</span>
            </div>
            <div className={styles["name-places"]}>
                <span className={styles['name-places__name-text']}>Название</span>
                <ul className={styles['name-places__directions']}>
                    <li className={styles["name-place-elem"]}>
                        {directionData?.from.city.name}
                    </li>
                    <li className={styles["name-place-elem"]}>
                        {directionData?.to.city.name}
                    </li>
                </ul>
            </div>
            <div className={styles["dates-and-time-train"]}>
                <div className={styles["dates-and-time-train__time-and-date-first"]}>
                    <span className={styles["time"]}>
                        {directionWay == 'departure' ? hoursMinutesFormatted(directionData.from.datetime) : hoursMinutesFormatted(directionData.to.datetime)}
                    </span>
                    <span className={styles["date"]}>
                        {directionWay == 'departure' ? formatDurationAsDate(directionData.from.datetime) : formatDurationAsDate(directionData.to.datetime)}
                    </span>
                </div>
                <div className={styles["dates-and-time-train__arrow-time"]}>
                    <span className={styles["time"]}>
                        {secondsToFormattedTime(directionData.duration)}
                    </span>
                    <img src={arrow} alt="стрелка" className={styles["arrow"]} />
                </div>
                <div className={styles["dates-and-time-train__time-and-date-second"]}>
                    <span className={styles["time"]}>
                        {directionWay == 'departure' ? hoursMinutesFormatted(directionData.to.datetime) : hoursMinutesFormatted(directionData.from.datetime)}
                    </span>
                    <span className={styles["date"]}>
                        {directionWay == 'departure' ? formatDurationAsDate(directionData.to.datetime) : formatDurationAsDate(directionData.from.datetime)}
                    </span>
                </div>
            </div>
            <div className={styles["cities-and-stations-train"]}>
                <div className={styles["cities-and-stations-train__cities"]}>
                    <span className={styles["city-first"]}>
                        {directionWay == 'departure' ? directionData.from.city.name : directionData.to.city.name}
                    </span>
                    <span className={styles["city-second"]}>
                        {directionWay == 'departure' ? directionData.to.city.name : directionData.from.city.name}
                    </span>
                </div>
                <div className={styles["cities-and-stations-train__stations"]}>
                    <span className={styles["station-first"]}>
                        {directionWay == 'departure' ? directionData.from.railway_station_name : directionData.to.railway_station_name}
                        <br />вокзал
                    </span>
                    <span className={styles["station-second"]}>
                        {directionWay == 'departure' ? directionData.to.railway_station_name : directionData.from.railway_station_name}
                        <br />вокзал
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DirectionDetailAll