import SideBarTickets from '../SideBarTickets/SideBarTickets';
import SelectionPlacesBlock from './SelectionPlacesBlock/SelectionPlacesBlock';
import styles from './SelectionPlacesMainPart.module.scss';
import { useSelector } from 'react-redux';
import TransitionLink from '../Ui/TransitionLink/TransitionLink';

import directionRight from '../../assets/svg/right-arrow.svg';
import directionLeft from '../../assets/svg/left-arrow.svg';

import rightArrowDirection from '../../assets/svg/right-arrow-direction.svg';
import leftArrowDirection from '../../assets/svg/left-arrow-direction.svg'


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

interface TypeOfTrainCarriageCurrent {
    typeOfTrainCarriage: {
        directions: {
            departure: {
                typeOfTrainCarriageList: TypeOfTrainCarriage[]
            };
            arrival: {
                typeOfTrainCarriageList: TypeOfTrainCarriage[]
            };
        }
    };
}

const SelectionPlacesMainPart = () => {

    const train = useSelector((state: { selectedTrain: { selectedTrain: SelectedTrain[] } }) => state.selectedTrain.selectedTrain[0]);
    const typesOfTrainCarriage = useSelector((state: { typesOfTrainCarriage: TypesOfTrainCarriageState }) => state.typesOfTrainCarriage);
    const prices = useSelector((state: { prices: PriceInfo }) => state.prices);

    const pricesDirections = useSelector((state: {
        prices: PriceInfo
    }) => state.prices.directions);

    const numberPlacesArrival = pricesDirections['arrival'].direction.placesPrice.length;
    const numberPlacesDeparture = pricesDirections['departure'].direction.placesPrice.length;
    const passengersNumber = pricesDirections.passengersAgeAndNumber.all;

    const trainCarriage = useSelector((state: { typeOfTrainCarriage: TypeOfTrainCarriageCurrent }) => state.typeOfTrainCarriage);

    const checkPassengers = () => {
        if (pricesDirections.passengersAgeAndNumber.baby && passengersNumber) {
            if (numberPlacesArrival) {
                return (numberPlacesArrival < passengersNumber - pricesDirections.passengersAgeAndNumber.baby && passengersNumber != numberPlacesArrival) || (numberPlacesDeparture < passengersNumber - pricesDirections.passengersAgeAndNumber.baby && numberPlacesDeparture != passengersNumber)
            } else {
                return (numberPlacesDeparture < passengersNumber - pricesDirections.passengersAgeAndNumber.baby && numberPlacesDeparture != passengersNumber)
            }
        }

        if (numberPlacesArrival) {
            return (numberPlacesArrival != passengersNumber) || (numberPlacesDeparture != passengersNumber)
        } else {
            return (numberPlacesDeparture != passengersNumber)
        }
    }

    return (
        <div className={`${styles['main-part']} ${styles['main-part-container']}`}>
            <div className={styles["sidebar-and-last-tickets"]}>
                <SideBarTickets />
            </div>
            <div className={styles['main-content']}>
                <h2 className={styles["main-content__title"]}>
                    Выбор мест
                </h2>
                <SelectionPlacesBlock imgArrow={rightArrowDirection} directionMainImg={directionRight} directionTrain='departure' prices={prices} train={train.departure} typesOfTrainCarriage={typesOfTrainCarriage.typesOfTrainCarriage.departure} trainCarriage={trainCarriage?.typeOfTrainCarriage?.directions['departure']?.typeOfTrainCarriageList} />
                {typesOfTrainCarriage.typesOfTrainCarriage.arrival.length > 0 && <SelectionPlacesBlock imgArrow={leftArrowDirection} directionMainImg={directionLeft} directionTrain='arrival' prices={prices} train={train.arrival} typesOfTrainCarriage={typesOfTrainCarriage.typesOfTrainCarriage.arrival} trainCarriage={trainCarriage?.typeOfTrainCarriage?.directions['arrival']?.typeOfTrainCarriageList} />}
                <div className={styles["main-content__link-block"]}>
                    <TransitionLink text='ДАЛЕЕ' to='/passengers' disabled={checkPassengers()} />
                </div>
            </div>
        </div>

    )
}

export default SelectionPlacesMainPart