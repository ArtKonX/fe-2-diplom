import InputsNames from '../../../PassengersMain/Passengers/PassengerFormElem/InputsNames/InputsNames';
import InputPhoneOrEmail from '../InputPhoneOrEmail/InputPhoneOrEmail';
import HeadingTop from '../../../Ui/HeadingTop/HeadingTop';
import styles from './PersonalData.module.scss';
import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';

interface PassengerState {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

const PersonalData = ({passenger, setPassenger}: {passenger: PassengerState, setPassenger: Dispatch<SetStateAction<{ phone: string; email: string; age?: string | undefined; series?: string | undefined; number?: string | undefined; }>>}) => {

    const personalDataName = useSelector((state: {dataPassengers: {
        passangers: [{name: string, lastName: string, patronymic: string}]
    }}) => state.dataPassengers);

    const { name, lastName, patronymic } = personalDataName.passangers[0];

    return (
        <div className={styles["personal-data"]}>
            <HeadingTop text='Персональные данные' classHeading='payment-heading' />
            <div className={styles["personal-data__main-content"]}>
                <InputsNames setPassenger={setPassenger as unknown as Dispatch<SetStateAction<PassengerState>>} values={{ lastName: lastName, name: name, patronymic: patronymic }} />
                <InputPhoneOrEmail passenger={passenger as unknown as {[key in  string]: string}} setPassenger={setPassenger} type='phone' text='Контактный телефон' />
                <InputPhoneOrEmail passenger={passenger as unknown as {[key in  string]: string}} setPassenger={setPassenger} type='email' text='E-mail' />
            </div>
        </div>
    )
}

export default PersonalData