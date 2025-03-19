import './CalendarDateOfBirth.scss';
import { ConfigProvider } from 'antd';
import generatePicker from 'antd/es/date-picker/generatePicker';
import ru_RU from 'antd/lib/locale/ru_RU';
import dayjs from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

const DatePicker = generatePicker(dayjsGenerateConfig);

const CalendarDateOfBirth = ({ age, name, setPassenger, setStatus, isRender, setIsRender }: { age: string | undefined, name: string, setPassenger: Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>, setStatus: Dispatch<SetStateAction<{ lastName: boolean; name: boolean; patronymic: boolean; number: boolean; series: boolean; calendarDateOfBirth: boolean; }>>, isRender: boolean, setIsRender: (isRender: boolean) => void }) => {

    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

    let minDate;
    let maxDate;

    if (age == 'adults') {
        minDate = dayjs(new Date()).subtract(100, 'years');
        maxDate = dayjs(new Date()).subtract(18, 'years');
    } else if (age == 'children') {
        minDate = dayjs(new Date()).subtract(18, 'years');
        maxDate = dayjs(new Date()).subtract(5, 'years');
    } else {
        minDate = dayjs(new Date()).subtract(5, 'years');
        maxDate = dayjs(new Date()).subtract(0, 'years');
    }

    const handleChange = (date: dayjs.Dayjs | null): void => {

        setSelectedDate(date);

        setPassenger(prevState => ({ ...prevState, [name]: date }))

        if (date) {
            setStatus(prevState => ({ ...prevState, [name]: true }));
        } else {
            setStatus(prevState => ({ ...prevState, [name]: false }));
        }

        setIsRender(!isRender)
    };

    const disabledDate = (currentDate: dayjs.Dayjs) => currentDate && (currentDate <= minDate || currentDate >= maxDate);

    return (
        <div className="calendar-date-of-birth-block">
            <span className="calendar-date-of-birth-block__text">Дата рождения</span>
            <ConfigProvider locale={ru_RU}>
                <DatePicker
                    className='calendar-date-of-birth'
                    placeholder="ДД/ММ/ГГ"
                    onChange={handleChange}
                    format="DD.MM.YY"
                    allowClear
                    showToday={true}
                    value={selectedDate}
                    disabledDate={disabledDate}
                />
            </ConfigProvider>
        </div>
    )
}

export default CalendarDateOfBirth