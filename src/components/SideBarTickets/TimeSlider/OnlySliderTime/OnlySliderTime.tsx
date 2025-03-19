import './OnlySliderTime.scss';
import styles from './OnlySliderTime.module.scss';
import { ConfigProvider, Slider } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../../../Hooks/useDebounce';
import { addOption, fetchTrainsByOption } from '../../../../redux/slices/fetchTrainsSlice';
import { AppDispatch } from '../../../../redux/store';

const formatter = (value: number | undefined) => {
    if (!value && value !== 0) return

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${`0${hours}`.slice(-2)}:${`0${minutes}`.slice(-2)}`;
};

const OnlySliderTime = ({ direction, className, min, max, defaultValue }: { direction: string, className: string, min: number, max: number, defaultValue: number[] }) => {

    const dispatch = useDispatch<AppDispatch>();

    const trains = useSelector((state: { fetchTrains: { trains: { items: TrainCardProps[] }, render: boolean } }) => state.fetchTrains);

    const [currentValue, setCurrentValue] = useState({ values: defaultValue, direction, className });
    const [values, setValues] = useState({ values: defaultValue, direction, className })

    const debouncedValue = useDebounce(currentValue, 500);

    useEffect(() => {
        setValues(currentValue)
    }, [trains.render, currentValue, ])

    const handleChange = (newValue: number[]) => {
        setCurrentValue(prevState => ({ ...prevState, values: newValue }));
    };

    useEffect(() => {
        if (debouncedValue) {
            const [startHourFrom, startHourTo] = debouncedValue.values;

            if (debouncedValue.direction === 'Туда') {
                if (debouncedValue.className === 'from') {
                    dispatch(addOption({ option: { nameForUrl: 'start_departure_hour_from', status: startHourFrom / 60 } }));
                    dispatch(addOption({ option: { nameForUrl: 'start_departure_hour_to', status: startHourTo / 60 } }));
                    dispatch(fetchTrainsByOption());

                    // start_departure_hour_to
                } else {
                    dispatch(addOption({ option: { nameForUrl: 'start_arrival_hour_from', status: startHourFrom / 60 } }));
                    dispatch(addOption({ option: { nameForUrl: 'start_arrival_hour_to', status: startHourTo / 60 } }));
                    dispatch(fetchTrainsByOption());
                }
            } else {
                if (debouncedValue.className === 'from') {
                    dispatch(addOption({ option: { nameForUrl: 'end_departure_hour_from', status: startHourFrom / 60 } }));
                    dispatch(addOption({ option: { nameForUrl: 'end_departure_hour_to', status: startHourTo / 60 } }));
                    dispatch(fetchTrainsByOption());
                } else {
                    dispatch(addOption({ option: { nameForUrl: 'end_arrival_hour_from', status: startHourFrom / 60 } }));
                    dispatch(addOption({ option: { nameForUrl: 'end_arrival_hour_to', status: startHourTo / 60 } }));
                    dispatch(fetchTrainsByOption());
                }
            }
        }
    }, [dispatch, debouncedValue, currentValue.values ]);


    return (
        <div className={styles['only-slider-time']}>
            <ConfigProvider
                theme={{
                    components: {
                        Slider: {
                            trackBg: '#FFA800',
                            trackHoverBg: '#FFA800',
                            railSize: 14,
                            handleSize: 22,
                            handleSizeHover: 22,
                            handleActiveColor: '#fff',
                            handleActiveOutlineColor: '#42445A00',
                            railBg: '#fff',
                            railHoverBg: '#fff',
                            colorBorder: '#fff',
                            colorPrimaryBorder: '#fff',


                        },
                    },
                }}
            >
                <Slider
                    range
                    tooltip={{
                        open: true,
                        placement: 'top',
                        arrow: false,
                        color: '#3e3c4100',
                        formatter,
                    }}
                    className='slider-time'
                    step={60}
                    min={min}
                    max={max}
                    defaultValue={values.values}
                    onChange={handleChange}
                />
                <span className={styles['only-slider-time__max-value']}>
                    {formatter(max)}
                </span>
            </ConfigProvider>
        </div>
    )
}

export default OnlySliderTime