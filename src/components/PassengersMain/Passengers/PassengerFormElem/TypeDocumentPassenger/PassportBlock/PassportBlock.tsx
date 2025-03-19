import { ChangeEvent, useState } from 'react';
import InputName from '../../InputName/InputName';
import SelectPassenger from '../../SelectPassengerForm/SelectPassenger';
import styles from './PassportBlock.module.scss';
import {Dispatch, SetStateAction } from 'react';

interface PassportState {
    series: string,
    number: string
}

interface Option {
    value: string,
    label: string
}

const PassportBlock = ({ setPassenger, options, setStatus, isRender, setIsRender }: {setPassenger:  Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>, options: Option[], setStatus: Dispatch<SetStateAction<{ lastName: boolean; name: boolean; patronymic: boolean; number: boolean; series: boolean; calendarDateOfBirth: boolean; }>>, isRender: boolean, setIsRender: (isRender: boolean) => void} ) => {

    const [passport, setPassport] = useState<PassportState>({series: '', number: ''});

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        const cleanedValue = value.replace(/[^\d]/g, '');

        setPassport(prevState => ({
            ...prevState,
            [name]: cleanedValue
        }));

        setPassenger(prevState => ({...prevState, [name]: cleanedValue}));

        if ((name == 'series' && value.length >= 4)  || (name == 'number' && value.length >= 6)) {
            setStatus(prevState => ({...prevState, [name]: true}));
        } else {
            setStatus(prevState => ({...prevState, [name]: false}));
        }

        setIsRender(!isRender)
    };

    return (
        <div className={styles["passport-block"]}>
            <SelectPassenger text='Тип документа' disabled={true} classNameSelect={'select-passport'} options={options} activeOption={options[0].value as unknown as Option} />
            <InputName classNameInput='series' nameData={{ name: 'series', nameRus: 'Серия' }} value={passport['series']} onChange={onChange} placeholderLength={4} />
            <InputName classNameInput='number' nameData={{ name: 'number', nameRus: 'Номер' }} value={passport['number']} onChange={onChange} placeholderLength={6} />
        </div>
    )
}

export default PassportBlock