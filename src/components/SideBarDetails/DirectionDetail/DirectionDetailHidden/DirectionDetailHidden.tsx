import { useState } from 'react';
import styles from './DirectionDetailHidden.module.scss';
import DirectionDetailAll from '../DirectionDetailAll/DirectionDetailAll';

const DirectionDetailHidden = ({ directionWay, directionImg, directionData, direction, arrow }: { directionWay: string, directionImg: string, directionData: {duration: number, train: {name: string}, from: {railway_station_name: string, city: {name: string}, datetime: number}, to: {railway_station_name: string, city: {name: string}, datetime: number}}, direction: {name: string, date: string}, arrow: string }) => {

    const [hidden, setHidden] = useState<boolean>(false);

    const onAction = () => {
        setHidden(!hidden);
    }

    return (
        <div className={styles["direction-details"]}>
            <div className={styles["direction-details__data-and-action"]}>
                <div className={styles["direction-details-data"]}>
                    <img src={directionImg} alt="стрелка" className={styles["details-arrow"]} />
                    <div className={styles["direction-details-data__text"]}>
                        <h3 className={styles["details-title"]}>{direction.name}</h3>
                        <span className={styles["details-date"]}>{direction.date}</span>
                    </div>
                </div>
                <button onClick={onAction} className={styles["direction-details__button"]}>{hidden ? '+' : '-'}</button>
            </div>
            {!hidden && <DirectionDetailAll directionWay={directionWay} directionData={directionData} arrow={arrow} />}
        </div>
    )
}

export default DirectionDetailHidden