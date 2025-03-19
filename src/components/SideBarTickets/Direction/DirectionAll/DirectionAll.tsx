import TimeSlider from '../../TimeSlider/TimeSlider';
import styles from './DirectionAll.module.scss';

const DirectionAll = ({ direction}: { direction: string}) => {

    return (
        <div className={styles['direction__all-actions']}>
            <div className={styles["departure-time"]}>
                <TimeSlider direction={direction} className='from' directionName='Время отбытия' />
            </div>
            <div className={styles["arrival-time"]}>
                <TimeSlider direction={direction} className='after' directionName='Время прибытия' />
            </div>
        </div>
    )
}

export default DirectionAll