import styles from './Passenger.module.scss';

import passengerIcon from '../../../../../assets/icons/icon-passenger.svg';

interface Passenger {
    id: number,
    age: string,
    name: string,
    lastName: string,
    patronymic: string,
    gender: string,
    dateOfBirth: string,
    passport?: string,
    birthCertificate?: string
    series: number,
    number: number | string,
    calendarDateOfBirth: {
        $D: number,
        $M: number,
        $y: number
    }
}

const Passenger = ({ ...props }: Passenger) => {

    return (
        <div className={styles['passenger']}>
            <div className={styles["passenger__icon-age"]}>
                <img src={passengerIcon} alt="иконка человека" className={styles["passenger-icon"]} />
                <span className={styles["passenger-age"]}>
                    {props.age == 'adults' ? 'Взрослый' : 'Детский'}
                </span>
            </div>
            <div className={styles["passenger__data"]}>
                <div className={styles["passenger-info"]}>
                    <span className={styles["passenger-info__name"]}>
                        {props.lastName} {props.patronymic} {props.name}
                    </span>
                </div>
                <span className={styles['gender']}>Пол {props.gender == 'woman' ? 'женский' : 'мужской'}</span>
                <span className={styles['date-of-birth']}>Дата рождения {`${props.calendarDateOfBirth.$D < 10 ? '0' + props.calendarDateOfBirth.$D : props.calendarDateOfBirth.$D}.${props.calendarDateOfBirth.$M + 1 < 10 ? '0' + (props.calendarDateOfBirth.$M + 1) : props.calendarDateOfBirth.$M + 1}.${props.calendarDateOfBirth.$y}`}</span>
                {props.series ? (<span className={styles['passport']}>Паспорт РФ {props.series} {props.number}</span>) : (<span className={styles['birth-certificate']}>Свидетельство о рождении {props.number}</span>)}
            </div>
        </div>
    )
}

export default Passenger