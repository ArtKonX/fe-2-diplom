import Direction from '../../Ui/Direction/Direction';
import styles from './FindTicketsForm.module.scss';

import twister from '../../../assets/icons/twister.svg';
import Calendar from '../../Ui/Calendar/Calendar';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDate, addDirections, changeRender, changeStatus, fetchTrains } from '../../../redux/slices/fetchTrainsSlice';
import { AppDispatch } from '../../../redux/store';
import ButtonSubmit from '../../Ui/ButtonSubmit/ButtonSubmit';
import dayjs from 'dayjs';

interface DataUserDirectionState {
    directionFrom: string,
    directionThere: string
}

interface DataUserDateState {
    dateFrom: string | dayjs.Dayjs,
    dateThere: string | dayjs.Dayjs
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

interface Option {
    option: string,
    status: string | boolean | number
}

const FindTicketsForm = ({ className }: { className: string }) => {

    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    const infoAboutTrains = useSelector((state: {
        fetchTrains: FetchTrainsState
    }) => state.fetchTrains);

    const [dataUserDirection, setDataUserDirection] = useState<DataUserDirectionState>({ directionFrom: '', directionThere: '' });
    const [dataUserDate, setDataUserDate] = useState<DataUserDateState>({ dateFrom: '', dateThere: '' });

    useEffect(() => {
        if (infoAboutTrains?.directions[0]?.from && infoAboutTrains?.directions[1]?.to) {
            setDataUserDirection({
                directionFrom: infoAboutTrains.directions[0].from,
                directionThere: infoAboutTrains.directions[1].to
            });
        }
    }, [infoAboutTrains.directions]);


    useEffect(() => {
        if (infoAboutTrains?.date[0]?.from && infoAboutTrains?.date[1]?.to) {
            setDataUserDate({
                dateFrom: dayjs(infoAboutTrains.date[0].from),
                dateThere: dayjs(infoAboutTrains.date[1].to)
            });
        }
    }, [infoAboutTrains.date]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (dataUserDirection.directionFrom === dataUserDirection.directionThere && dataUserDirection.directionFrom.trim() && dataUserDirection.directionThere.trim()) {
            dispatch(changeRender({ render: !infoAboutTrains.render }))
            dispatch(changeStatus({ statusName: 'double', status: true }))
        } else if (dataUserDirection.directionFrom && dataUserDirection.directionThere) {
            const from = dataUserDirection.directionFrom as string | undefined;
            const to = dataUserDirection.directionThere as string | undefined;

            dispatch(addDate({ from: dataUserDate.dateFrom, to: dataUserDate.dateThere }));
            dispatch(addDirections({ from: dataUserDirection.directionFrom, to: dataUserDirection.directionThere }));
            dispatch(fetchTrains({ from, to }));

            navigate('/train-selection');
        } else {
            dispatch(changeRender({ render: !infoAboutTrains.render }))
            dispatch(changeStatus({ statusName: 'fields', status: true }))
        }
    }

    const changeDirection = () => {
        const { directionFrom, directionThere } = dataUserDirection;

        setDataUserDirection({ directionFrom: directionThere, directionThere: directionFrom });

        if (directionFrom !== directionThere) {
            dispatch(addDirections({ from: directionThere, to: directionFrom }));
        }
    }

    return (
        <form className={styles[`${className}`]} onSubmit={handleSubmit}>
            <div className={styles['direction-and-date']}>
                <div className={styles['direction-general']}>
                    <h3 className={styles['direction-general__title']}>Направление</h3>
                    <div className={styles['direction-general__actions']}>
                        <Direction directionValue={infoAboutTrains?.directions[0]?.from} setDataUserDirection={setDataUserDirection} className='direction__from' name='directionFrom' placeholder='Откуда' />
                        <button type='button' onClick={changeDirection} className={styles['twister-button']}><img className={styles['twister-button__image']} alt='картинка с круглыми стрелками' src={twister} /></button>
                        <Direction directionValue={infoAboutTrains?.directions[1]?.to} setDataUserDirection={setDataUserDirection} className='direction__there' name='directionThere' placeholder='Куда' />
                    </div>
                </div>

                <div className={styles['date']}>
                    <h3 className={styles['date__title']}>Дата</h3>
                    <div className={styles['date__actions']}>
                        <Calendar directionName='from' disabled={false} dateValue={infoAboutTrains?.date[0]?.from ? dayjs(infoAboutTrains?.date[0]?.from) : null} setDataUserDate={setDataUserDate} className='date__from' name='dateFrom' />
                        <Calendar directionName='to' disabled={false} dateValue={infoAboutTrains?.date[1]?.to ? dayjs(infoAboutTrains?.date[1]?.to) : null} setDataUserDate={setDataUserDate} className='date__there' name='dateThere' />
                    </div>
                </div>
            </div>
            <div className={styles["header-form__submit-wrapper"]}>
                <ButtonSubmit modifierBtnColor='black' text='найти билеты' />
            </div>
        </form>
    )
}

export default FindTicketsForm