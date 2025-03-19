import { useDispatch, useSelector } from 'react-redux';
import styles from './PlaceBtn.module.scss';
import { addPlace, removePlace } from '../../../../../../redux/slices/pricesSlice';


interface PriceInfo {
    directions: {
        ['departure']: {
            direction: PriceInfoDirection
        },
        ['arrival']: {
            direction: PriceInfoDirection
        },
        passengersAgeAndNumber: PassengersAgeAndNumber
    }
}

interface PriceInfoDirection {
    classPlace: string;
    optionsPrice:  {name: string, price: number}[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PassengersAgeAndNumber {
    adults: number,
    children: number,
    baby: number,
    all: number
}

const PlaceBtn = ({ place, price, classPlaceBtn, directionTrain }: { place: Seat, price: number | undefined, classPlaceBtn: string, directionTrain: "departure" | "arrival" }) => {

    const dispatch = useDispatch();

    const prices = useSelector((state: { prices: PriceInfo }) => state.prices);

    const numberPlaces = prices.directions[directionTrain].direction.placesPrice.length;

    const passengersAgeAndNumber = prices.directions.passengersAgeAndNumber as unknown as PassengersAgeAndNumber

    const check = prices?.directions[directionTrain].direction?.placesPrice.find((placePrice: PlacesPrice) => placePrice.index == place.index);

    const onAction = () => {

        if (check) {

            if (prices.directions[directionTrain].direction.placesPrice.length > prices.directions.passengersAgeAndNumber.children + prices.directions.passengersAgeAndNumber.baby) {
                dispatch(removePlace({ place: { index: place.index }, directionTrain: directionTrain }));
            } else {
                dispatch(removePlace({ place: { index: place.index }, directionTrain: directionTrain }));
            }
        } else {
            if (passengersAgeAndNumber.all > numberPlaces) {
                if (prices.directions[directionTrain].direction.placesPrice.length < prices.directions.passengersAgeAndNumber.adults) {
                    dispatch(addPlace({ place: { index: place.index, price: price && price }, directionTrain: directionTrain }));
                }
                else {
                    if (prices.directions[directionTrain].direction.placesPrice.length - prices.directions.passengersAgeAndNumber.children - prices.directions.passengersAgeAndNumber.adults < prices.directions.passengersAgeAndNumber.adults) {
                        dispatch(addPlace({ place: { index: place.index, price: price && price * 0.5 }, directionTrain: directionTrain }));
                    }
                }
            }
        }
    }

    return (
        <button onClick={onAction} className={`${check ? `${styles[`${classPlaceBtn}`]} ${styles[`${classPlaceBtn}_active`]}` : `${styles[`${classPlaceBtn}`]}`}`} disabled={!place.available}>{place.index}</button>
    )
}

export default PlaceBtn
