import TransitionLink from '../Ui/TransitionLink/TransitionLink';
import LinkAddPassenger from './LinkAddPassenger/LinkAddPassenger';
import Passengers from './Passengers/Passengers';
import styles from './PassengersMain.module.scss';
import SideBarDetails from '../SideBarDetails/SideBarDetails';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

interface PassengersAgeAndNumber {
    adults?: number,
    children?: number,
    baby?: number,
    all?: number
}

interface Passenger {
    id: number,
    hidden?: boolean,
    agePassenger?: "children" | "adults" | "baby",
    age?: string | undefined,
    series?: string,
    number?: string
}

interface PriceInfo {
    directions: {
        arrival: {
            from: PriceInfoFrom;
            to: PriceInfoTo;
            direction: { placesPrice: PlacesPrice[] };
        },
        departure: {
            from: PriceInfoFrom;
            to: PriceInfoTo;
            direction: { placesPrice: PlacesPrice[] };
        },
        passengersAgeAndNumber: PassengersAgeAndNumber;
    }
}

interface PriceInfoFrom {
    classPlace: string;
    optionsPrice:  {name: string, price: number}[];
    allPrice: number;
}

interface PriceInfoTo {
    classPlace: string;
    optionsPrice:  {name: string, price: number}[];
    allPrice: number;
}

const PassengersMain = () => {

    const pricesAndPassengers = useSelector((state: { prices: PriceInfo }) => state.prices);

    const [isRender, setIsRender] = useState<boolean>(false);

    const [statuses, setStatuses] = useState<{ id: number; status: boolean; }[]>([{ id: 0, status: false }]);
    const [statusPassengers, setStatusPassengers] = useState(false);

    const pricesAndPassengersData = pricesAndPassengers.directions.passengersAgeAndNumber;
    const agesPassengersAllData = Object.entries(pricesAndPassengersData).filter(elem => elem[0] !== 'all' && elem[1] !== 0);

    if (agesPassengersAllData[2]) {
        const passengersAgeAndNumberAll = pricesAndPassengers.directions.passengersAgeAndNumber.all;

        if (passengersAgeAndNumberAll) {
            if (passengersAgeAndNumberAll - pricesAndPassengers.directions.arrival.direction.placesPrice.length != 0) {
                agesPassengersAllData[2][1] = agesPassengersAllData[2][1] - (passengersAgeAndNumberAll - pricesAndPassengers.directions.arrival.direction.placesPrice.length)
            }
        }
    }

    const agesPassengers = agesPassengersAllData.map((elem, indx) => ({ id: indx, age: elem[0] as "children" | "adults" | "baby", number: elem[1] }));


    const agesPassengersExpanded = useMemo(() => {
        const array = [];
        for (const elem of agesPassengers) {
            for (let i = 0; i < elem.number; i++) {
                array.push(elem.age);
            }
        }
        return array;
    }, [agesPassengers]);

    const initialLength = pricesAndPassengersData.all || 0;

    const [passengers, setPassengers] = useState(
        Array.from({ length: initialLength }, (_, i) => i)
            .map((item) => ({ id: item + 1, agePassenger: agesPassengersExpanded[item] }))
    )

    useEffect(() => {

        const arrayPassengers = Array.from({ length: initialLength }, (_, i) => i)
            .map((item) => ({
                id: item + 1,
                agePassenger: agesPassengersExpanded[item],
                dataPlaces: { departure: [], arrival: [] }
            }))
            .filter(elem => elem.agePassenger !== undefined);

        setPassengers(arrayPassengers)

        if (statuses.length == passengers.length) {
            setStatusPassengers(statuses?.map(elem => elem.status).every(elem => elem == true))
        }

    }, [pricesAndPassengersData, isRender, initialLength, passengers.length, statuses,])

    return (
        <div className={styles['passengers-main-container']}>
            <div className={styles['passengers-main']}>
                <div className={styles["sidebar"]}>
                    <SideBarDetails />
                </div>
                <div className={styles["passengers"]}>
                    <Passengers isRender={isRender} setIsRender={setIsRender} passengers={passengers as unknown as Passenger[]} setStatuses={setStatuses} />
                    <LinkAddPassenger />
                    <div className={styles['link-next-page-block']}><TransitionLink id={`passanger-form-${String(passengers.length + 1)}`} text='ДАЛЕЕ' to='/payment' disabled={!statusPassengers} /></div>
                </div>
            </div>
        </div>
    )
}

export default PassengersMain