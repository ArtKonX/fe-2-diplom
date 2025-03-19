import DirectionDetailHidden from './DirectionDetail/DirectionDetailHidden/DirectionDetailHidden';
import styles from './SideBarDetails.module.scss';

import arrowRight from '../../assets/svg/right-arrow.svg';
import arrowDirectionRight from '../../assets/svg/right-arrow-direction.svg';

import arrowLeft from '../../assets/svg/left-arrow.svg';
import arrowDirectionLeft from '../../assets/svg/left-arrow-direction.svg';

import { useSelector } from 'react-redux';
import PassengersDetailHidden from './PassengersDetail/PassengersDetailHidden/PassengersDetailHidden';
import AllPrice from './AllPrice/AllPrice';
import { useEffect } from 'react';

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


const SideBarDetails = () => {

    const selectedTrain = useSelector((state: { selectedTrain: { selectedTrain: TrainCardProps[] } }) => state.selectedTrain);
    const pricesAndPassengers = useSelector((state: { prices: PriceInfo }) => state.prices);
    const arrival = pricesAndPassengers.directions.arrival;
    const departure = pricesAndPassengers.directions.departure;
    const allPrice = arrival.direction.allPrice + departure.direction.allPrice;

    const compareMin = (a: number, b: number) => b - a;

    const sortedPricesArrival = arrival.direction.placesPrice.map(place => place.price).sort(compareMin as unknown as (a: number | undefined, b: number | undefined) => number);
    const sortedPricesDeparture = departure.direction.placesPrice.map(place => place.price).sort(compareMin as unknown as (a: number | undefined, b: number | undefined) => number);

    const {
        adults = 0,
        children = 0,
        baby = 0,
        all = 0
    } = pricesAndPassengers.directions.passengersAgeAndNumber || {};

    const arrivalPlacesPriceLength = arrival.direction.placesPrice.length || 0;
    const departurePlacesPriceLength = departure.direction.placesPrice.length || 0;

    const calculateOffset = (placesPriceLength: number) => {
        return (children + baby - (all - placesPriceLength - adults)) || 0;
    };

    const priceArrivalAdults = sortedPricesArrival.slice(
        0,
        adults
    );

    const priceDepartureAdults = sortedPricesDeparture.slice(
        0,
        adults
    );

    const priceArrivalKids = sortedPricesArrival.slice(
        adults,
        calculateOffset(arrivalPlacesPriceLength)
    );

    const priceDepartureKids = sortedPricesDeparture.slice(
        adults,
        calculateOffset(departurePlacesPriceLength)
    );

    const priceArrivalAdultsSum = priceArrivalAdults.reduce(
        (acc: number, item: number | undefined) => {
            return acc + (typeof item === 'number' ? item : 0);
        },
        0
    )
    const priceDepartureAdultsSum = priceDepartureAdults.reduce(
        (acc: number, item: number | undefined) => {
            return acc + (typeof item === 'number' ? item : 0);
        },
        0
    )
    const priceAdultsAll = (priceArrivalAdultsSum && priceDepartureAdultsSum) && priceArrivalAdultsSum + priceDepartureAdultsSum;

    const priceArrivalKidsSum = priceArrivalKids.reduce(
        (acc: number, item: number | undefined) => {
            return acc + (typeof item === 'number' ? item : 0);
        },
        0
    );
    const priceDepartureKidsSum = priceDepartureKids.reduce(
        (acc: number, item: number | undefined) => {
            return acc + (typeof item === 'number' ? item : 0);
        },
        0
    )

    useEffect(() => {console.log(arrival.direction.placesPrice.length > 0)}, [])

    const priceKidsAll = (priceArrivalKidsSum && priceDepartureKidsSum) && priceArrivalKidsSum + priceDepartureKidsSum;

    const priceArrivalOptions = arrival.direction.optionsPrice.map(option => option.price).reduce((acc, item) => acc + item, 0);
    const priceDepartureOptions = departure.direction.optionsPrice.map(option => option.price).reduce((acc, item) => acc + item, 0);

    const passengersData = { adults: { number: pricesAndPassengers.directions.passengersAgeAndNumber.adults, price: arrival.direction.placesPrice.length > 0 && priceAdultsAll ? priceAdultsAll + priceArrivalOptions + priceDepartureOptions : priceDepartureAdultsSum + priceDepartureOptions  }, kids: { number: pricesAndPassengers.directions.passengersAgeAndNumber.baby ? pricesAndPassengers.directions.passengersAgeAndNumber.children && pricesAndPassengers.directions.passengersAgeAndNumber.children + pricesAndPassengers.directions.passengersAgeAndNumber.baby : pricesAndPassengers.directions.passengersAgeAndNumber.children, price: arrival.direction.placesPrice.length > 0 ? priceKidsAll : priceDepartureKidsSum} }

    return (
        <div className={styles['sidebar-details']}>
            <div className={styles["sidebar-details__title"]}>
                <h2 className={styles["title-details"]}>Детали поездки</h2>
            </div>
            <div className={styles["sidebar-details__from-details"]}>
                <DirectionDetailHidden directionWay='departure' directionImg={arrowRight} directionData={selectedTrain.selectedTrain[0].departure} direction={{ name: 'Туда', date: '30.08.2018' }} arrow={arrowDirectionRight} />
            </div>
            <div className={styles["sidebar-details__to-details"]}>
                {selectedTrain.selectedTrain[0].arrival && <DirectionDetailHidden directionWay='arrival' directionImg={arrowLeft} directionData={selectedTrain.selectedTrain[0].arrival} direction={{ name: 'Обратно', date: '09.09.2018' }} arrow={arrowDirectionLeft} />}
            </div>
            <div className={styles["sidebar-details__passengers"]}>
                <PassengersDetailHidden passengersData={passengersData as unknown as { adults: { number: number; price: number; }; kids: { number: number; price: number; }; }} />
            </div>
            <div className={styles["sidebar-details__all-price"]}>
                <AllPrice price={allPrice} />
            </div>
        </div>
    )
}

export default SideBarDetails