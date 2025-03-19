import styles from './TimeSlider.module.scss';
import OnlySliderTime from "./OnlySliderTime/OnlySliderTime"
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

interface ThereAndBackTimeState {
    from: {
        min: number,
        max: number
    },
    to: {
        min: number,
        max: number
    }
}

const TimeSlider = ({ direction, className, directionName }: { direction: string, className: string, directionName: string }) => {

    const min = 0;
    const max = 24 * 60;

    const [thereTime, setThereTime] = useState<ThereAndBackTimeState>({ from: { min, max }, to: { min, max } });
    const [backTime, setBackTime] = useState<ThereAndBackTimeState>({ from: { min, max }, to: { min, max } });

    const trains = useSelector((state: {
        fetchTrains: {
            trains: {
                items: TrainCardProps[]
            }
        }
    }) => state.fetchTrains.trains.items);

    const render = useSelector((state: {
        fetchTrains: {
            render: boolean
        }
    }) => state.fetchTrains.render);

    const compareFnMax = (a: number, b: number) => b - a;
    const compareFnMin = (a: number, b: number) => a - b;


    useEffect(() => {

        if (direction == 'Туда') {
            if (className == 'from') {
                const maxTimeFromThere = new Date(Number(trains?.map(item => item?.departure?.from?.datetime).sort(compareFnMax)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.departure?.from?.datetime).sort(compareFnMax)[0]) * 1000).getHours() * 60;
                const minTimeFromThere = new Date(Number(trains?.map(item => item?.departure?.from?.datetime).sort(compareFnMin)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.departure?.from?.datetime).sort(compareFnMin)[0]) * 1000).getHours() * 60;
                setThereTime(prevState => ({ ...prevState, from: { min: minTimeFromThere, max: maxTimeFromThere } }));
            }
            if (className == 'after') {
                const maxTimeToThere = new Date(Number(trains?.map(item => item?.departure?.to?.datetime).sort(compareFnMax)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.departure?.to?.datetime).sort(compareFnMax)[0]) * 1000).getHours() * 60;
                const minTimeToThere = new Date(Number(trains?.map(item => item?.departure?.to?.datetime).sort(compareFnMax)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.departure?.to?.datetime).sort(compareFnMin)[0]) * 1000).getHours() * 60;
                setThereTime(prevState => ({ ...prevState, to: { min: minTimeToThere, max: maxTimeToThere } }));
            }
        } else {
            if (className == 'from') {
                const maxTimeFromBack = new Date(Number(trains?.map(item => item?.arrival?.from?.datetime).sort(compareFnMax)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.arrival?.from?.datetime).sort(compareFnMax)[0]) * 1000).getHours() * 60;
                const minTimeFromBack = new Date(Number(trains?.map(item => item?.arrival?.from?.datetime).sort(compareFnMin)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.arrival?.from?.datetime).sort(compareFnMin)[0]) * 1000).getHours() * 60;
                setBackTime(prevState => ({ ...prevState, from: { min: minTimeFromBack, max: maxTimeFromBack } }));
            }
            if (className == 'after') {
                const maxTimeToBack = new Date(Number(trains?.map(item => item?.arrival?.to?.datetime).sort(compareFnMax)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.arrival?.to?.datetime).sort(compareFnMax)[0]) * 1000).getHours() * 60;
                const minTimeToBack = new Date(Number(trains?.map(item => item?.arrival?.to?.datetime).sort(compareFnMax)[0]) * 1000).getMinutes() + new Date(Number(trains?.map(item => item?.arrival?.to?.datetime).sort(compareFnMin)[0]) * 1000).getHours() * 60;
                setBackTime(prevState => ({ ...prevState, to: { min: minTimeToBack, max: maxTimeToBack } }));
            }
        }

    }, [render, className, direction, trains,])

    const getMinValue = () => {
        return direction === 'Туда'
            ? className === 'from'
                ? thereTime.from.min
                : thereTime.to.min
            : direction === 'Обратно'
                ? className === 'from'
                    ? backTime.from.min
                    : backTime.to.min
                : min;
    };

    const getMaxValue = () => {
        return direction === 'Туда'
            ? className === 'from'
                ? thereTime.from.max
                : thereTime.to.max
            : direction === 'Обратно'
                ? className === 'from'
                    ? backTime.from.max
                    : backTime.to.max
                : max
    };

    return (
        <div className={styles['time-slider']}>
            <h3 className={styles[`time-slider__title-${className}`]}>{directionName}</h3>
            <OnlySliderTime direction={direction} className={className} min={min} max={max} defaultValue={[getMinValue(), getMaxValue()]} />
        </div>
    )
}

export default TimeSlider