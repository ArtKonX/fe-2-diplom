import { useSelector } from 'react-redux';
import Passenger from '../Passenger/Passenger';
import styles from './PassengerList.module.scss';
import { useEffect, useState } from 'react';

interface PassengerState {
    id: number,
    age: string,
    name: string,
    lastName: string,
    patronymic: string,
    gender: string,
    dateOfBirth: string,
    passport?: string,
    birthCertificate?: string
    series: number,
    number: number | string,
    calendarDateOfBirth: {
        $D: number,
        $M: number,
        $y: number
    }
}

const PassengerList = () => {

    const passengers = useSelector((state: { dataPassengers: { passangers: PassengerState[] } }) => state.dataPassengers);

    const [passengersData, setPassengersData] = useState<PassengerState[] | undefined>()

    useEffect(() => {
        setPassengersData(passengers.passangers.filter(passenger => passenger.age !== 'adults-baby'))
    }, [passengers,])

    return (
        <ul className={styles["passengers"]}>
            {passengersData?.map(passenger => (<li key={passenger.id} className={styles['passengers__elem']} >
                <Passenger {...passenger} />
            </li>))}
        </ul>
    )
}

export default PassengerList