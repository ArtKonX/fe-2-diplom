import { Dispatch, SetStateAction, useState } from 'react';
import PassengerRevealing from './PassengerRevealing/PassengerRevealing';
import styles from './Passengers.module.scss';

interface Passenger {
    id: number,
    hidden?: boolean,
    agePassenger?: "children" | "adults" | "baby",
    age?: string | undefined,
    series?: string,
    number?: string
}

const Passengers = ({ passengers, isRender, setIsRender, setStatuses }: { passengers: Passenger[], isRender: boolean, setIsRender: (isRender: boolean) => void, setStatuses: Dispatch<SetStateAction<{ id: number; status: boolean; }[]>> }) => {

    const passengersList = passengers?.map(passenger => ({ id: passenger.id, hidden: passenger.id !== 1 && true }));

    const [hiddenPassengersForms, setHiddenPassengersForms] = useState<Passenger[]>(passengersList);

    if (passengers)
        return (
            <div className={styles["passengers-block"]}>
                <ul className={styles["passengers-list"]}>
                    {passengers?.map(passenger => (<li key={passenger.id} id={`passanger-form-${String(passenger.id)}`} className={styles['passenger-elem']}><PassengerRevealing passengersLength={passengers.length} id={passenger.id} setStatuses={setStatuses} isRender={isRender} setIsRender={setIsRender} hiddenPassengersForms={hiddenPassengersForms} setHiddenPassengersForms={setHiddenPassengersForms} passenger={passenger} /></li>))}
                </ul>
            </div>
        )
}

export default Passengers