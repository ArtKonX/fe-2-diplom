import { ChangeEvent, useState } from 'react';
import InputName from '../../InputName/InputName';
import SelectPassenger from '../../SelectPassengerForm/SelectPassenger';
import styles from './BirthСertificate.module.scss';
import isBirthCertificateValid from '../../../../../../utils/isBirthCertificateValid';
import {Dispatch, SetStateAction } from 'react';
import { Option } from 'antd/es/mentions';

interface BirthСertificateState {
    number: string
}

interface Option {
    value: string,
    label: string
}

const BirthСertificate = ({ setPassenger, options, setStatus, isRender, setIsRender }: { setPassenger: Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>, options: Option[], setStatus: Dispatch<SetStateAction<{ lastName: boolean; name: boolean; patronymic: boolean; number: boolean; series: boolean; calendarDateOfBirth: boolean; }>>,  isRender: boolean, setIsRender: (isRender: boolean) => void }) => {

    const [birthСertificate, setBirthСertificate] = useState<BirthСertificateState>({ number: '' });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setBirthСertificate(prevState => ({ ...prevState, [name]: value.toUpperCase() }));
        setPassenger(prevState => ({ ...prevState, [name]: value.toUpperCase() }));

        if (name == 'number' && value.length >= 14 && isBirthCertificateValid(value.trim())) {
            setStatus(prevState => ({...prevState, [name]: true}));
        } else {
            setStatus(prevState => ({...prevState, [name]: false}));
        }

        setIsRender(!isRender)
    }

    return (
        <div className={styles["birth-certificate-block"]}>
            <SelectPassenger text='Тип документа' disabled={true} classNameSelect={'select-birth-certificate'} options={options} activeOption={options[0].value as unknown as Option} />
            <InputName classNameInput='number-birth-certificate' nameData={{ name: 'number', nameRus: 'Номер' }} value={birthСertificate['number']} onChange={onChange} placeholderLength={14} />
        </div>
    )
}

export default BirthСertificate