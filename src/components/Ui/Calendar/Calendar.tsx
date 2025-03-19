import './Calendar.scss';

import { ConfigProvider } from 'antd';
import generatePicker from 'antd/es/date-picker/generatePicker';
import ru_RU from 'antd/lib/locale/ru_RU';
import dayjs from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { addDateDirection } from '../../../redux/slices/fetchTrainsSlice';
import { useDispatch, useSelector } from 'react-redux';

const DatePicker = generatePicker(dayjsGenerateConfig);

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
    error: string,
    renderDate: boolean
}

interface Option {
    option: string,
    status: string | boolean | number
}

const Calendar = ({ directionName, disabled, dateValue, setDataUserDate, className, name }: { directionName: string, disabled: boolean, dateValue?: dayjs.Dayjs | null | undefined, setDataUserDate: Dispatch<SetStateAction<DataUserDateState>>, className: string, name: string }) => {

    const infoAboutTrains = useSelector((state: {
        fetchTrains: FetchTrainsState
    }) => state.fetchTrains);

    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null | undefined>(dateValue ? dateValue : null);

    const [selectedDateDisabled, setSelectedDateDisabled] = useState<dayjs.Dayjs | null | undefined>(null)

    const dispatch = useDispatch()

    useEffect(() => {

        setSelectedDateDisabled(directionName == 'from' ? dayjs(infoAboutTrains.date[0]?.from) : dayjs(infoAboutTrains.date[1]?.to))

    }, [infoAboutTrains.renderDate, directionName, infoAboutTrains.date]);

    const minDate = dayjs(new Date());

    const maxDate = dayjs(new Date()).add(100, 'days');

    const handleChange = (date: dayjs.Dayjs | null): void => {
        setSelectedDate(date);

        if (date) {
            const formattedDate = date.format('YYYY-MM-DD');
            if (formattedDate == date.format('YYYY-MM-DD')) {
                setDataUserDate((prevState: DataUserDateState) => ({
                    ...prevState,
                    [name]: formattedDate
                }));

                dispatch(addDateDirection({ directionName: directionName, date: formattedDate }))
            }
        }
    };

    const disabledDate = (currentDate: dayjs.Dayjs ) => {

        if (directionName == 'from') {
            return currentDate && (currentDate <= minDate || currentDate >= maxDate);
        } else {
            if (dayjs(infoAboutTrains.date[0]?.from)) {

                return currentDate && (currentDate <= dayjs(infoAboutTrains.date[0]?.from) || currentDate <= minDate || currentDate >= maxDate);
            } else {
                return currentDate && (currentDate <= minDate || currentDate >= maxDate);
            }
        }
    }

    return (
        <ConfigProvider locale={ru_RU}>
            <DatePicker
                className={className}
                placeholder="дд.мм.гг"
                onChange={handleChange}
                disabledDate={disabledDate}
                format="DD.MM.YY"
                allowClear
                showToday={true}
                value={disabled ? selectedDateDisabled : selectedDate}
                name={name}
                disabled={disabled}
            />
        </ConfigProvider>
    )
}

export default Calendar