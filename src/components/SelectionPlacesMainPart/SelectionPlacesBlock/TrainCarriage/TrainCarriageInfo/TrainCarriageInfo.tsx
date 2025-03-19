import { useSelector } from 'react-redux';
import styles from './TrainCarriageInfo.module.scss';
import TrainCarriageInfoBtnElem from './TrainCarriageInfoBtnElem/TrainCarriageInfoBtnElem';
import TrainInfoAboutCarriage from './TrainInfoAboutCarriage/TrainInfoAboutCarriage';
import BoardingPassanges from '../BoardingPassanges/BoardingPassanges';

const TrainCarriageInfo = ({ trainCarriage, directionTrain }: { trainCarriage: TypeOfTrainCarriage[], directionTrain: "departure" | "arrival" }) => {

    const currentCarriage = useSelector((state: { typeOfTrainCarriage: TypeOfTrainCarriageState }) => state.typeOfTrainCarriage);

    if (trainCarriage)
        return (
            <div className={styles['train-carriage-info']}>
                <div className={styles["number-carriage"]}>
                    <p className={styles["number-carriage__info"]}>
                        Вагоны
                        <ul className={styles["number-carriage__list"]}>
                            {trainCarriage.map((carriage, indx) => (<li key={indx} className={styles['number-carriage-elem']}><TrainCarriageInfoBtnElem direction={directionTrain} trainCarriage={carriage} /></li>))}
                        </ul>
                    </p>
                    <p className={styles['number-carriage__text']}>Нумерация вагонов начинается с головы поезда</p>
                </div>
                <TrainInfoAboutCarriage carriage={currentCarriage.currentCarriage.directions[directionTrain].currentCarriageList} directionTrain={directionTrain} />
                {currentCarriage.currentCarriage.directions[directionTrain].currentCarriageList[0]?.coach?.class_type && currentCarriage.currentCarriage.directions[directionTrain].currentCarriageList[0]?.seats && <BoardingPassanges type={currentCarriage.currentCarriage.directions[directionTrain].currentCarriageList[0]?.coach?.class_type} seats={currentCarriage.currentCarriage.directions[directionTrain].currentCarriageList[0]?.seats} directionTrain={directionTrain} />}
            </div>
        )
}

export default TrainCarriageInfo