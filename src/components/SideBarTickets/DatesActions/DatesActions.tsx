import { useSelector } from 'react-redux';
import Calendar from '../../Ui/Calendar/Calendar';
import styles from './DatesActions.module.scss';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface DataUserDateState {
    dateFrom: string | dayjs.Dayjs,
    dateThere: string | dayjs.Dayjs
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
    render: boolean,
    url: string,
    error: string
}

interface Option {
    option: string,
    status: string | boolean | number
}

interface Date {
    from?: dayjs.Dayjs | null | undefined,
    to?: dayjs.Dayjs | null | undefined
}

const DatesActions = () => {

    const infoAboutTrains = useSelector((state: {
        fetchTrains: FetchTrainsState
    }) => state.fetchTrains);

    const [dataUserDate, setDataUserDate] = useState<DataUserDateState>({ dateFrom: '', dateThere: '' });

    useEffect(() => {
        const dateFrom = infoAboutTrains?.date[0]?.from as unknown as string;
        const dateThere = infoAboutTrains?.date[1]?.to as unknown as string;
        setDataUserDate({ dateFrom, dateThere });
    }, [infoAboutTrains.render, infoAboutTrains?.date])

    return (
        <div className={styles['train-selection-sidebar__dates-actions']}>
            <div className={styles["train-selection-sidebar__from-date"]}>
                <h3 className={styles['train-selection-sidebar__from-date-title']}>
                    Дата поездки
                </h3>
                <Calendar directionName='from' disabled={true} dateValue={dayjs(dataUserDate.dateFrom)} setDataUserDate={setDataUserDate} className={styles['train-selection-sidebar__date-from']} name='dateFrom' />
            </div>
            <div className={styles["train-selection-sidebar__date-there"]}>
                <h3 className={styles['train-selection-sidebar__date-there-title']}>
                    Дата возвращения
                </h3>
                <Calendar directionName='to' disabled={true} dateValue={dayjs(dataUserDate.dateThere)} setDataUserDate={setDataUserDate} className={styles['train-selection-sidebar__data-there']} name='dateThere' />
            </div>
        </div>
    )
}

export default DatesActions