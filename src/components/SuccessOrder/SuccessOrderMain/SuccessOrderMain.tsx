import { useEffect, useState } from 'react';
import FeedbackAndLink from './FeedbackAndLink/FeedbackAndLink';
import NumberOrderAndPrice from './NumberOrderAndPrice/NumberOrderAndPrice';
import OrderSuccessInfo from './OrderSuccessInfo/OrderSuccessInfo';
import styles from './SuccessOrderMain.module.scss';
import TextAboutSuccessOrder from './TextAboutSuccessOrder/TextAboutSuccessOrder';
import generateRandomCodeOrder from '../../../utils/generateRandomCode';
import { useSelector } from 'react-redux';

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

interface Passenger {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

const SuccessOrderMain = () => {

    const pricesAndPassengers = useSelector((state: { prices: PriceInfo }) => state.prices);
    const personalData = useSelector((state: {personalData: {personalData: Passenger[]}}) => state.personalData);

    const arrival = pricesAndPassengers.directions.arrival;
    const departure = pricesAndPassengers.directions.departure;
    const allPrice = arrival.direction.allPrice + departure.direction.allPrice;

    const [numberOrder, setNumberOrder] = useState<string>();
    const [price, setPrice] = useState<number>();
    const [personalDataState, setPersonalDataState] = useState<{firstName: string, patronymic: string}>();

    useEffect(() => {
        setNumberOrder(generateRandomCodeOrder());
        setPrice(allPrice);
        setPersonalDataState({
            firstName: personalData?.personalData[0]?.name,
            patronymic: personalData?.personalData[0]?.patronymic
        })
    }, [allPrice, personalData.personalData, ])

    return (
        <div className={styles["success-order-header-main"]}>
            <h2 className={styles["success-order-header-main__title"]}>
                Благодарим Вас за заказ!
            </h2>
            <div className={styles["success-order-header-main__content"]}>
                <NumberOrderAndPrice numberOrder={numberOrder} price={price} />
                <OrderSuccessInfo />
                <TextAboutSuccessOrder name={personalDataState?.firstName + ' ' + personalDataState?.patronymic} />
                <FeedbackAndLink />
            </div>
        </div>
    )
}

export default SuccessOrderMain