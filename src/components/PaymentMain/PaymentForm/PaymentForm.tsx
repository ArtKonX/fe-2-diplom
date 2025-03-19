import { useNavigate } from 'react-router-dom';
import styles from './PaymentForm.module.scss';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import PersonalData from './PersonalData/PersonalData';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import ButtonSubmit from '../../Ui/ButtonSubmit/ButtonSubmit';
import validateEmail from '../../../utils/validateEmail';
import { useDispatch } from 'react-redux';
import { addPersonalData } from '../../../redux/slices/personalDataSlice';

interface PassengerState {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

const PaymentForm = () => {

    const navigate = useNavigate();

    const [passenger, setPassenger] = useState<PassengerState>({ phone: '', email: '', lastName: '', name: '', patronymic: '', cash: false, online: false });
    const [status, setStatus] = useState<boolean>(true);

    const dispatch = useDispatch();

    const { phone, email, lastName, name, patronymic, cash, online } = passenger;

    useEffect(() => {
        if (passenger && passenger['phone']) {
            if (passenger['phone'].length >= 12 && validateEmail(passenger['email']).valid && passenger['lastName'] && passenger['name'] && passenger['patronymic'] && (passenger['cash'] || passenger['online'])) {
                setStatus(false)
            }
        }
    }, [phone, email, lastName, name, patronymic, cash, online, passenger,])

    const buyTickets = (e: FormEvent) => {
        e.preventDefault();

        if (passenger) {
            if (passenger) {
                if (passenger['phone'].length >= 12 && validateEmail(passenger['email']).valid && passenger['lastName'] && passenger['name'] && passenger['patronymic'] && (passenger['cash'] || passenger['online'])) {
                    setStatus(false)
                    dispatch(addPersonalData({ personalData: passenger }));
                    navigate('/order');
                }
            }
        }
    }

    return (
        <form className={styles["payment-form"]} onSubmit={buyTickets}>
            <PersonalData passenger={passenger} setPassenger={setPassenger as unknown as Dispatch<SetStateAction<{ phone: string; email: string; age?: string | undefined; series?: string | undefined; number?: string | undefined; }>>} />
            <PaymentMethod passenger={passenger} setPassenger={setPassenger} />
            <div className={styles["payment-form__submit-btn-block"]}>
                <ButtonSubmit disabled={status} modifierBtnColor='white' text='КУПИТЬ БИЛЕТЫ' />
            </div>
        </form>
    )
}

export default PaymentForm