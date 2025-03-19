import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import InputName from '../InputName/InputName';
import styles from './InputsNames.module.scss';

const namesData = [
    { nameRus: 'Фамилия', name: 'lastName' },
    { nameRus: 'Имя', name: 'name' },
    { nameRus: 'Отчество', name: 'patronymic' },
];

interface PassengerState {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

const InputsNames = ({
    values,
    setPassenger,
    setStatus,
    isRender,
    setIsRender
}: {
    values?: { lastName: string, name: string, patronymic: string },
    setPassenger: Dispatch<SetStateAction<PassengerState>>,
    setStatus?: Dispatch<SetStateAction<{
        lastName: boolean;
        name: boolean;
        patronymic: boolean;
        number: boolean;
        series: boolean;
        calendarDateOfBirth: boolean;
    }>>,
    isRender?: boolean,
    setIsRender?: (isRender: boolean) => void
}) => {
    const [data, setData] = useState<{ [key: string]: string } | null>(
        values ? {
            lastName: values['lastName'],
            name: values['name'],
            patronymic: values['patronymic']
        } : null
    );

    useEffect(() => {
        const dataPassenger = data as unknown as SetStateAction<PassengerState>;
        if (data !== null) {
            setPassenger(prevState => ({ ...prevState, ...dataPassenger }));
        }
    }, [data, setPassenger]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData(prevState => ({ ...prevState, [name]: value }));

        setPassenger(prevState => ({ ...prevState, [name]: value }));

        if (data !== null) {
            if (data['lastName']?.trim().length >= 4 || data['name']?.trim().length >= 4 || data['patronymic']?.trim().length >= 4) {
                if (setStatus) setStatus(prevState => ({ ...prevState, [name]: true }));
            } else {
                if (setStatus) setStatus(prevState => ({ ...prevState, [name]: false }));
            }
        } else {
            if (setStatus) setStatus(prevState => ({ ...prevState, [name]: false }));
        }

        if (setIsRender) setIsRender(!isRender)
    }

    return (
        <div className={styles["inputs-names"]}>
            {namesData.map(nameData => (
                <InputName classNameInput='names' nameData={nameData} value={data ? data[nameData.name] : ''} onChange={onChange} />
            ))}
        </div>
    )
}

export default InputsNames