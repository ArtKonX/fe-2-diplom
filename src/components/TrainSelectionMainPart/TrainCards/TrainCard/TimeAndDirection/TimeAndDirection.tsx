import hoursMinutesFormatted from '../../../../../utils/hoursMinutesFormatted';
import secondsToFormattedTime from '../../../../../utils/secondsToFormattedTime';
import styles from './TimeAndDirection.module.scss';

const TimeAndDirection = ({ startNamesPlace, endNamesPlace, imgArrow, times, allTime, startNamesStation, endNamesStation }: TimeAndDirectionProps) => {

    return (
        <div className={styles["time-and-direction"]}>
            <div className={styles["start-direction"]}>
                <time className={styles["start-direction__time"]}>
                    {hoursMinutesFormatted(times[0])}
                </time>
                <p className={styles["start-direction__city"]}>
                    {startNamesPlace}
                </p>
                <p className={styles["start-direction__railway-station"]}>
                    {startNamesStation} вокзал
                </p>
            </div>
            <div className={styles["time-and-arrow"]}>
                <time className={styles["time-and-arrow__all-time"]}>
                    {secondsToFormattedTime(allTime)}
                </time>
                <img src={imgArrow} alt="стрелка" className={styles["time-and-arrow__arrow-img"]} />
            </div>
            <div className={styles["end-direction"]}>
                <time className={styles["end-direction__time"]}>
                    {hoursMinutesFormatted(times[1])}
                </time>
                <p className={styles['end-direction__city']}>
                    {endNamesPlace}
                </p>
                <p className={styles["end-direction__railway-station"]}>
                    {endNamesStation} вокзал
                </p>
            </div>
        </div>
    )
}

export default TimeAndDirection