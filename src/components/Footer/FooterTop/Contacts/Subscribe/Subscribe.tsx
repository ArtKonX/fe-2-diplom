import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Subscribe.module.scss';
import validateEmail from '../../../../../utils/validateEmail';
import { changeRender, changeStatus } from '../../../../../redux/slices/fetchTrainsSlice';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import axios from 'axios';

interface Option {
    option: string,
    status: string | boolean | number
}

interface Date {
    from?: dayjs.Dayjs | null | undefined,
    to?: dayjs.Dayjs | null | undefined
}

interface Directions {
    from?: string,
    to?: string
}

interface FetchTrainsState {
    date: Date[],
    directions: Directions[],
    options: Option[],
    trains: TrainCardProps[],
    loading: boolean,
    url: string,
    render: boolean,
    error: string
}

const Subscribe = () => {

    const [email, setEmail] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);

    const infoAboutTrains = useSelector((state: {
        fetchTrains: FetchTrainsState
    }) => state.fetchTrains);

    const dispatch = useDispatch();

    const subscribe = (email: string) => {
        axios.post(`${import.meta.env.API_ROOT}/subscribe`, {
            email
        })
            .then(response => {
                if (response.data.status) {
                    dispatch(changeRender({ render: !infoAboutTrains.render }));
                    dispatch(changeStatus({ statusName: 'subscribe', status: true }));
                }
            })
            .catch(error => {
                console.error('Ошибка подписки:', error);
            });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        subscribe(email);

        setEmail('')
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (validateEmail(value.trim()).valid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }

        setEmail(value.replace(/\s/g, ''))
    }

    return (
        <>
            <form className={styles['subscribe__form']} onSubmit={handleSubmit}>
                <div className={styles['subscribe__input-and-label']}>
                    <label htmlFor="subscribe__input" className={styles['subscribe__label']}>Будьте в курсе событий</label>
                    <input placeholder='e-mail' id='subscribe__input' type="email" name='email' className={styles['subscribe__input']} onChange={handleChange} value={email} />
                </div>
                <button disabled={disabled} type='submit' className={styles['subscribe__btn-submit']}>отправить</button>
            </form>
        </>
    )
}

export default Subscribe