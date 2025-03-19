import styles from './TrainCarriage.module.scss';
import TrainCarriageInfo from './TrainCarriageInfo/TrainCarriageInfo';

const TrainCarriage = ({ trainCarriage, directionTrain }: { trainCarriage: TypeOfTrainCarriage[], directionTrain: "departure" | "arrival" }) => {

    return (
        <div className={styles['train-carriage']}>
            <TrainCarriageInfo trainCarriage={trainCarriage} directionTrain={directionTrain} />
        </div>
    )
}

export default TrainCarriage