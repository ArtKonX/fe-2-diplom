import { useSelector } from 'react-redux';
import HeadingTop from '../../../Ui/HeadingTop/HeadingTop';
import AllPrice from './AllPrice/AllPrice';
import PassengerList from './PassengerList/PassengerList';
import styles from './Passengers.module.scss';

type Direction = string;

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
        [key in Direction]: {
            direction: PriceInfoDirection;
            passengersAgeAndNumber: PassengersAgeAndNumber;
        }
    }
}

const Passengers = () => {

    const pricesAndPassengers = useSelector((state: {prices: PriceInfo}) => state.prices);
    const arrival = pricesAndPassengers.directions.arrival;
    const departure = pricesAndPassengers.directions.departure;
    const allPrice = arrival.direction.allPrice + departure.direction.allPrice;

    return (
        <div className={styles["passengers"]}>
            <HeadingTop text='Пассажиры' classHeading='train-heading' />
            <div className={styles["passengers-list-and-all-price"]}>
                <PassengerList />
                <AllPrice price={allPrice}/>
            </div>
        </div>
    )
}

export default Passengers