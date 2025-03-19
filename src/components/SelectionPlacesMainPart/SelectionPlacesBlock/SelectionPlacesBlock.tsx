import styles from './SelectionPlacesBlock.module.scss';

import { useNavigate } from 'react-router-dom';
import TrainInfo from './TrainInfo/TrainInfo';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelectTrain } from '../../../redux/slices/selectedTrainSlice';
import NumberOfTickets from './NumberOfTickets/NumberOfTickets';
import TypeOfTrainCarriage from './TypeOfTrainCarriage/TypeOfTrainCarriage';
import TrainCarriage from './TrainCarriage/TrainCarriage';
import { removeCurrentCarriage } from '../../../redux/slices/typeOfTrainCarriageSlice';
import { resetPrice } from '../../../redux/slices/pricesSlice';
import AllPrice from '../AllPrice/AllPrice';

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

interface PriceInfoDirection {
    classPlace: string;
    optionsPrice:  {name: string, price: number}[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PassengersAgeAndNumber {
    adults?: number,
    children?: number,
    baby?: number,
    all?: number
}

interface PriceInfo {
    directions: {
        ['arrival']: {
            direction: PriceInfoDirection;
        },
        ['departure']: {
            direction: PriceInfoDirection;
        },
        passengersAgeAndNumber: PassengersAgeAndNumber
    }
}

const SelectionPlacesBlock = ({ imgArrow, directionMainImg, directionTrain, train, typesOfTrainCarriage, trainCarriage, prices }: { imgArrow: string, directionMainImg: string, directionTrain: 'arrival' | 'departure', train: Direction, typesOfTrainCarriage: TypeOfTrainCarriage[], trainCarriage: TypeOfTrainCarriage[], prices: PriceInfo }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const typeOfTrainCarriage = useSelector((state: { typeOfTrainCarriage: TypeOfTrainCarriageState }) => state.typeOfTrainCarriage);

    const onAction = () => {
        dispatch(resetPrice())
        dispatch(resetSelectTrain());
        dispatch(removeCurrentCarriage({direction: directionTrain}))
        navigate('/train-selection')
    }

    return (
        <div className={styles["selection-places-block"]}>
            <div className={`${directionTrain == 'departure' ? `${styles["change-another-train"]} ${styles["change-another-train_left"]}` : `${styles["change-another-train"]} ${styles["change-another-train_right"]}`}`}>
                <div className={styles["change-another-train__img-block"]}>
                    <img className={styles['direction-img']} src={directionMainImg} alt="картинка направления" />
                </div>
                <button onClick={onAction} className={styles["change-another-train__link"]}>Выбрать другой поезд</button>
            </div>

            <TrainInfo directionTrain={directionTrain} imgArrow={imgArrow} direction={train} />
            <NumberOfTickets directionTrain={directionTrain}/>
            <TypeOfTrainCarriage direction={directionTrain} typesOfTrainCarriage={typesOfTrainCarriage} />

            {typeOfTrainCarriage.currentCarriage.directions[directionTrain].currentCarriageList.length !== 0 && <TrainCarriage trainCarriage={trainCarriage} directionTrain={directionTrain} />}
            {typeOfTrainCarriage.currentCarriage.directions[directionTrain].currentCarriageList.length !== 0 && <AllPrice price={prices?.directions[directionTrain].direction?.allPrice} />}
        </div>
    )
}

export default SelectionPlacesBlock