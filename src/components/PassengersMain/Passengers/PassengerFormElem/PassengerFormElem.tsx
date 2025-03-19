import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './PassengerFormElem.module.scss';
import SelectPassenger from './SelectPassengerForm/SelectPassenger';
import CheckboxGender from '../../../Ui/CheckboxGender/CheckboxGender';
import CalendarDateOfBirth from './CalendarDateOfBirth/CalendarDateOfBirth';
import TypeDocumentPassenger from './TypeDocumentPassenger/TypeDocumentPassenger';
import { HashLink } from 'react-router-hash-link';
import InputsNames from './InputsNames/InputsNames';
import Checkbox from '../../../Ui/Checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addPassengerData } from '../../../../redux/slices/dataPassengersSlice';
import isBirthCertificateValid from '../../../../utils/isBirthCertificateValid';

interface Passenger {
    id: number,
    hidden?: boolean,
    agePassenger?: "children" | "adults" | "baby",
    age?: string | undefined,
    series?: string,
    number?: string
}

interface PassengerState {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

interface Option {
    value: string;
    label: string;
}


interface Passangers {
    passangers: Passenger[]
}

interface Passenger {
    age?: string | undefined;
    series?: string | undefined;
    number?: string | undefined;
}

const PassengerFormElem = ({ passengersLength, setStatuses, isRender, setIsRender, id, hiddenPassengersForms, setHiddenPassengersForms, agePassenger }: { passengersLength: number, setStatuses: Dispatch<SetStateAction<{ id: number; status: boolean; }[]>>, isRender: boolean, setIsRender: (isRender: boolean) => void, id: number, hiddenPassengersForms: Passenger[], setHiddenPassengersForms: (hiddenPassengersForms: Passenger[]) => void, agePassenger: string | undefined }) => {

    const options = [
        {
            value: 'adult',
            label: 'Взрослый',
        },
        {
            value: 'kid',
            label: 'Детский',
        }
    ];

    const [age, setAge] = useState(agePassenger);

    const [check, setCheck] = useState(false);

    const [status, setStatus] = useState({ lastName: false, name: false, patronymic: false, number: false, series: false, calendarDateOfBirth: false });

    const [passenger, setPassenger] = useState<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>({ age: agePassenger, series: '', number: '', limitations: false });

    const [statusNumberCertificate, setStatusNumberCertificate] = useState<boolean | null>(null);

    const dispatch = useDispatch();

    const pricesAndPassengers = useSelector((state: { prices: PriceInfo }) => state.prices);
    const dataPassengers = useSelector((state: { dataPassengers: Passangers }) => state.dataPassengers);

    const pricesAndPassengersData = pricesAndPassengers.directions.passengersAgeAndNumber;

    useEffect(() => {

        if (agePassenger == 'adults') {
            setCheck(Object.values(status).every(elem => elem))
        } else {
            setCheck(Object.entries(status).filter(elem => elem[0] !== 'series').every(elem => elem[1] == true))
        }

        if (passenger.age != 'adults') {
            if (passenger.number) {
                setStatusNumberCertificate(passenger.age != 'adults' && !isBirthCertificateValid(passenger.number) && passenger.number.length >= 14)
            }
        }

        setAge(agePassenger)

    }, [setStatus, status, isRender, setIsRender, agePassenger, passenger.age, passenger.number,])

    const onGoing = () => {

        setCheck(false);

        let boolStatus

        if (agePassenger == 'adults') {
            boolStatus = Object.values(status).every(elem => elem)
        } else {
            boolStatus = Object.entries(status).filter(elem => elem[0] !== 'series').every(elem => elem[1] == true)
        }

        setStatuses(prevState => {
            if (Array.isArray(prevState)) {
                const newStatuses = [...prevState];
                newStatuses[id - 1] = { id: id, status: boolStatus };
                return newStatuses;
            }
            return [{ id: id, status: boolStatus }];
        });

        setStatus({ lastName: false, name: false, patronymic: false, number: false, series: false, calendarDateOfBirth: false });

        setIsRender(!isRender);

        const currentPassenger = passenger as unknown as Passenger

        dispatch(addPassengerData({ index: id - 1, passanger: currentPassenger }));

        if (id == passengersLength) {
            if (pricesAndPassengersData.all - passengersLength !== 0) {
                for (let i = 0; i < pricesAndPassengersData.all - passengersLength; i++) {
                    dispatch(addPassengerData({ index: passengersLength + i, passanger: { ...dataPassengers.passangers[i], age: 'adults-baby' } }));
                }
            }
        }

        const hiddenPassengersFormsList = hiddenPassengersForms;
        const hiddenPassengersFormsFindIndx = hiddenPassengersForms.findIndex(hiddenPassenger => hiddenPassenger.id == id + 1);

        hiddenPassengersFormsList[hiddenPassengersFormsFindIndx].hidden = false;

        setHiddenPassengersForms(hiddenPassengersFormsList);
    }

    return (
        <form className={styles["passenger-form-elem"]}>
            <div className={styles["dropdown-age"]}>
                <SelectPassenger disabled={true} classNameSelect={'select-age'} options={options} activeOption={agePassenger == 'adults' ? options[0].value as unknown as Option : options[1].value as unknown as Option} />
            </div>
            <InputsNames setPassenger={setPassenger as unknown as Dispatch<SetStateAction<PassengerState>>} setStatus={setStatus} isRender={isRender} setIsRender={setIsRender} />
            <div className={styles["checkbox-gender-and-date-of-birth-input"]}>
                <CheckboxGender name='gender' setPassenger={setPassenger} />
                <CalendarDateOfBirth age={age} name='calendarDateOfBirth' setPassenger={setPassenger} setStatus={setStatus} isRender={isRender} setIsRender={setIsRender} />
            </div>
            <div className={styles["checkbox-limitations-container"]}>
                <Checkbox name='limitations' setPassenger={setPassenger} classCheckbox='limitations-block' id={id}>
                    <label htmlFor={`limitations-block${id}`} >ограниченная подвижность</label>
                </Checkbox>
            </div>
            <div className={styles["type-document-and-input"]}>
                <TypeDocumentPassenger setPassenger={setPassenger} type={agePassenger} setStatus={setStatus} isRender={isRender} setIsRender={setIsRender} />
            </div>
            <div className={`${check ? `${styles["next-passenger"]} ${styles["next-passenger_success"]}` : statusNumberCertificate ? `${styles["next-passenger"]} ${styles["next-passenger_error"]}` : `${styles["next-passenger"]}`}`}>
                {statusNumberCertificate && <div className={styles["error-text-block"]}><span className={styles['error-text-block__text']}>Номер свидетельства о рожденни указан некорректно Пример: <span className={styles['error-text-bolt']}>VIII-ЫП-123456</span></span></div>}
                {check && <span className={styles['success-text']}>Готово</span>}
                {!statusNumberCertificate && <HashLink smooth style={!check ? { pointerEvents: "none" } : { pointerEvents: "all" }} to={`#passanger-form-${id + 1}`} className={styles['next-passenger__link']} onClick={onGoing} aria-disabled={check}>Следующий пассажир</HashLink>}
            </div>
        </form>
    )
}

export default PassengerFormElem