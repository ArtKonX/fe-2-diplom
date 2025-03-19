import { useNavigate } from 'react-router-dom';
import styles from './Order.module.scss';
import Passengers from './Passengers/Passengers';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import Train from './Train/Train';
import { FormEvent, useEffect, useState } from 'react';
import ButtonSubmit from '../../Ui/ButtonSubmit/ButtonSubmit';
import { useDispatch, useSelector } from 'react-redux';
import { addDataPassenger, orderPassenger } from '../../../redux/slices/dataPassengersOrderSlice';
import { AppDispatch } from '../../../redux/store';

interface Passenger {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean,
    gender: string
}

interface DataPassenger {
    age?: string | undefined;
    series?: string | undefined;
    number?: string | undefined;
    name: string,
    lastName: string,
    patronymic: string,
    calendarDateOfBirth: {
        $y: number,
        $M: number,
        $D: number
    }
}

type Direction = string;

interface PriceInfoDirection {
    classPlace: string;
    optionsPrice: { name: string, price: number }[];
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

interface Order {
    user: UserData;
    departure: DirectionData;
    arrival?: DirectionData
}

interface UserData {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    payment_method: 'cash' | 'online';
}

interface DirectionData {
    route_direction_id?: number;
    seats?: Seat[];
}

interface Seat {
    coach_id: number;
    person_info: PersonInfo;
    seat_number: number;
    is_child: boolean;
    include_children_seat: boolean;
}

interface PersonInfo {
    is_adult: boolean;
    first_name: string;
    last_name: string;
    patronymic: string;
    gender: boolean;
    birthday: string;
    document_type: 'паспорт' | 'свидетельство';
    document_data?: string;
}

const Order = () => {

    const navigate = useNavigate();

    const personalData = useSelector((state: { personalData: { personalData: Passenger[] } }) => state.personalData);
    const dataPassengers = useSelector((state: { dataPassengers: { passangers: DataPassenger[] } }) => state.dataPassengers);
    const selectedTrain = useSelector((state: { selectedTrain: { selectedTrain: TrainCardProps[] } }) => state.selectedTrain);
    const prices = useSelector((state: { prices: PriceInfo }) => state.prices);

    const [data, setData] = useState<Order[] | undefined>()

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {

        const objectsForOrderArray = [] as unknown as Order[];

        dataPassengers.passangers.forEach((passenger, indx) => {

            if (passenger.age !== 'adults-baby') {
                const objectForOrder = {
                    user: {
                        first_name: personalData?.personalData[0]?.name,
                        last_name: personalData?.personalData[0]?.lastName,
                        patronymic: personalData?.personalData[0]?.patronymic,
                        phone: personalData?.personalData[0]?.phone,
                        email: personalData?.personalData[0]?.email,
                        payment_method: personalData?.personalData[0]?.cash ? 'cash' : (personalData?.personalData[0]?.online ? 'online' : undefined)
                    },
                    departure: {
                        route_direction_id: selectedTrain.selectedTrain[0].departure._id,
                        seats: [
                            {
                                coach_id: selectedTrain.selectedTrain[0].departure.train._id,
                                person_info: {
                                    "is_adult": passenger.age == 'adults',
                                    "first_name": passenger.name,
                                    "last_name": passenger.lastName,
                                    "patronymic": passenger.patronymic,
                                    "gender": personalData?.personalData[0]?.gender == 'man',
                                    "birthday": `${passenger.calendarDateOfBirth.$y}-${passenger.calendarDateOfBirth.$M + 1 < 10 ? '0' + Number(passenger.calendarDateOfBirth.$M + 1) : passenger.calendarDateOfBirth.$M}-${passenger.calendarDateOfBirth.$D + 1 < 10 ? '0' + Number(passenger.calendarDateOfBirth.$D + 1) : passenger.calendarDateOfBirth.$D}`,
                                    "document_type": passenger.series ? "паспорт" : "свидетельство",
                                    "document_data": passenger.series ? passenger.series + ' ' + passenger.number : passenger.number
                                },
                                "seat_number": prices?.directions?.departure?.direction?.placesPrice[indx]?.index,
                                "is_child": passenger.age != 'adults',
                                "include_children_seat": false
                            }
                        ]
                    },
                } as unknown as Order;

                if (selectedTrain.selectedTrain[0].arrival) {
                    objectForOrder.arrival = {
                        route_direction_id: selectedTrain.selectedTrain[0].arrival._id,
                        seats: [
                            {
                                coach_id: selectedTrain.selectedTrain[0].arrival.train._id,
                                person_info: {
                                    "is_adult": passenger.age == 'adults',
                                    "first_name": passenger.name,
                                    "last_name": passenger.lastName,
                                    "patronymic": passenger.patronymic,
                                    "gender": personalData?.personalData[0]?.gender == 'man',
                                    "birthday": `${passenger.calendarDateOfBirth.$y}-${passenger.calendarDateOfBirth.$M + 1 < 10 ? '0' + Number(passenger.calendarDateOfBirth.$M + 1) : passenger.calendarDateOfBirth.$M}-${passenger.calendarDateOfBirth.$D + 1 < 10 ? '0' + Number(passenger.calendarDateOfBirth.$D + 1) : passenger.calendarDateOfBirth.$D}`,
                                    "document_type": passenger.series ? "паспорт" : "свидетельство",
                                    "document_data": passenger.series ? passenger.series + ' ' + passenger.number : passenger.number
                                },
                                "seat_number": prices?.directions?.arrival?.direction?.placesPrice[indx]?.index,
                                "is_child": passenger.age != 'adults',
                                "include_children_seat": false
                            }
                        ]
                    }
                }

                objectsForOrderArray.push(objectForOrder)
            }

            if (passenger.age === 'adults-baby') {

                const indxAdult = objectsForOrderArray.findIndex(object =>
                    object?.departure?.seats?.[0]?.person_info?.document_data === `${passenger.series} ${passenger.number}`
                );

                if (indxAdult !== -1) {
                    const adultObject = objectsForOrderArray[indxAdult];

                    if (adultObject) {
                        const departure = adultObject.departure;
                        const arrival = adultObject.arrival;

                        if (departure && departure.seats && departure.seats[0]) {
                            departure.seats[0].include_children_seat = true;
                        }

                        if (arrival && arrival.seats && arrival.seats[0]) {
                            arrival.seats[0].include_children_seat = true;
                        }
                    }
                }
            }
        })

        console.log('objectsForOrderArray', objectsForOrderArray)

        if (objectsForOrderArray !== null) {
            setData(objectsForOrderArray);
        }

    }, [dataPassengers.passangers, personalData.personalData, prices?.directions?.arrival?.direction?.placesPrice, prices?.directions?.departure?.direction?.placesPrice, selectedTrain.selectedTrain,])

    const orderSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (data !== null) {
            dispatch(addDataPassenger({ dataPassengers: data }))
            dispatch(orderPassenger())
        }

        navigate('/success-order');
    }

    return (
        <div className={styles["order"]}>
            <Train />
            <Passengers />
            <PaymentMethod />
            <form className={styles["order-confirm-form"]} onSubmit={orderSubmit}>
                <ButtonSubmit modifierBtnColor='white' text='подтвердить' />
            </form>
        </div>
    )
}

export default Order