import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './InputPhoneOrEmail.module.scss';

const InputPhoneOrEmail = ({ passenger, setPassenger, type, text }: { passenger: {[key in  string]: string}, setPassenger: Dispatch<SetStateAction<{ phone: string; email: string; }>>, type: string, text: string }) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        let valuePhone;

        if (type == 'phone') {
            if (value) {
                valuePhone = '+7' + value.slice(2).replace(/[^\d]/g, '');;
            }
        }

        const newValue = type === 'phone' ? valuePhone?.slice(0, 12) : value;

        setPassenger(prevState => ({ ...prevState, [type]: newValue }));
    }

    return (
        <label className={styles["label-contact"]}>
            {text}
            <input value={passenger ? passenger[type] : ''} onChange={onChange} placeholder={type == 'phone' ? '+7 ___ ___ __ __' : 'inbox@gmail.ru'} type={type == 'phone' ? 'tel' : 'email'} className={styles['label-contact__input']} />
        </label>
    )
}

export default InputPhoneOrEmail