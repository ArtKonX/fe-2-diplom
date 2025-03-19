import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './PassengerRevealing.module.scss';

import unwrap from '../../../../assets/icons/unwrap.svg';
import rollUp from '../../../../assets/icons/roll-up.svg';
import PassengerFormElem from '../PassengerFormElem/PassengerFormElem';
import { useDispatch, useSelector } from 'react-redux';
import { addPassengersAgeAndNumber, removeBabyWithoutPlace, removePlace } from '../../../../redux/slices/pricesSlice';

interface Passenger {
    id: number,
    hidden?: boolean,
    agePassenger?: "children" | "adults" | "baby",
    age?: string | undefined,
    series?: string,
    number?: string
}

interface PassengersAgeAndNumber {
    adults?: number,
    children?: number,
    baby?: number,
    all?: number
}

interface PriceInfo {
    directions: {
        arrival: {
            direction: PriceInfoDirection;
        },
        departure: {
            direction: PriceInfoDirection;
        },
        passengersAgeAndNumber: PassengersAgeAndNumber;
    }
}

interface PriceInfoDirection {
    classPlace: string;
    optionsPrice: { name: string, price: number }[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

const PassengerRevealing = ({ passengersLength, id, isRender, setIsRender, passenger, hiddenPassengersForms, setHiddenPassengersForms, setStatuses }: { passengersLength: number, id: number, isRender: boolean, setIsRender: (isRender: boolean) => void, passenger: Passenger, hiddenPassengersForms: Passenger[], setHiddenPassengersForms: (hiddenPassengersForms: Passenger[]) => void, setStatuses: Dispatch<SetStateAction<{ id: number; status: boolean; }[]>> }) => {

    const [hidden, setHidden] = useState<boolean | undefined>(false);

    const [currentAge, setCurrentAge] = useState(passenger.agePassenger)

    const dispatch = useDispatch();

    const pricesAndPassengers = useSelector((state: { prices: PriceInfo }) => state.prices);
    const pricesAndPassengersData = pricesAndPassengers.directions.passengersAgeAndNumber;

    useEffect(() => {
        const findHiddens = hiddenPassengersForms?.find(passengerHidden => passengerHidden.id == passenger.id);
        if (findHiddens) {
            setHidden(findHiddens?.hidden);
        }

        setCurrentAge(passenger.agePassenger)

    }, [passenger.id, isRender, setIsRender, currentAge, hiddenPassengersForms, passenger.agePassenger,]);

    const onAction = () => {

        const hiddenPassengersFormsList = hiddenPassengersForms;
        const hiddenPassengersFormsFindIndx = hiddenPassengersForms.findIndex(hiddenPassenger => hiddenPassenger.id == passenger.id);

        hiddenPassengersFormsList[hiddenPassengersFormsFindIndx].hidden = !hiddenPassengersFormsList[hiddenPassengersFormsFindIndx].hidden;

        setHiddenPassengersForms(hiddenPassengersFormsList);

        setHidden(!hidden);

        setIsRender(!isRender);
    }

    const onActionRemove = () => {
        if (!passenger.agePassenger) return;
        const numberPassengersAge = (pricesAndPassengersData[passenger.agePassenger] || 0) - 1;

        dispatch(addPassengersAgeAndNumber({ directionTrain: 'arrival', ageName: passenger.agePassenger, ageNumber: numberPassengersAge }))

        dispatch(removePlace({ place: { index: pricesAndPassengers.directions['arrival'].direction.placesPrice[id - 1].index, price: pricesAndPassengers.directions['arrival'].direction.placesPrice[id - 1].price }, directionTrain: 'arrival' }));
        dispatch(removePlace({ place: { index: pricesAndPassengers.directions['departure'].direction.placesPrice[id - 1].index, price: pricesAndPassengers.directions['departure'].direction.placesPrice[id - 1].price }, directionTrain: 'departure' }));

        if (passenger.agePassenger == 'adults') {
            if (pricesAndPassengersData.all) {
                if (pricesAndPassengersData.all - passengersLength >= 1) {
                    dispatch(removeBabyWithoutPlace())
                }
            }
        }

        setIsRender(!isRender);

        setCurrentAge(passenger.agePassenger)
    }

    const revealingBtnImg = hidden ? { src: unwrap, alt: 'плюс' } : { src: rollUp, alt: 'минус' }

    return (
        <div className={styles["passenger"]}>
            <div className={styles["revealing"]}>
                <div className={styles["revealing__button-and-info"]}>
                    <button onClick={onAction} className={styles['revealing-btn']}><img src={revealingBtnImg.src} alt={revealingBtnImg.alt} /></button>
                    <h3 className={styles["title-info-passenger"]}>
                        Пассажир {passenger.id}
                    </h3>
                </div>
                {!hidden && <button className={styles['remove-card']} onClick={onActionRemove} >x</ button>}
            </div>
            {!hidden && <PassengerFormElem passengersLength={passengersLength} setStatuses={setStatuses} isRender={isRender} setIsRender={setIsRender} hiddenPassengersForms={hiddenPassengersForms} setHiddenPassengersForms={setHiddenPassengersForms} id={passenger.id} agePassenger={passenger.agePassenger} />}
        </div>
    )
}

export default PassengerRevealing