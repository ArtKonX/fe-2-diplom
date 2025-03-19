import { ConfigProvider, Slider } from 'antd';
import styles from './OnlySliderPrice.module.scss';
import './OnlySliderPrice.scss';
import { addOption, fetchTrainsByOption } from '../../../../redux/slices/fetchTrainsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../Hooks/useDebounce';
import { AppDispatch } from '../../../../redux/store';

const OnlySliderPrice = ({ min, max, defaultValue }: { min: number, max: number, defaultValue: number[] }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [currentValue, setCurrentValue] = useState([min, max]);
    const debouncedValue = useDebounce(currentValue, 500) as unknown as number[];
    const [values, setValues] = useState(defaultValue);

    const trains = useSelector((state: { fetchTrains: { trains: { items: TrainCardProps[] }, render: boolean } }) => state.fetchTrains);

    const handleChange = (newValue: number[]) => {

        setCurrentValue(newValue);
    };

    useEffect(() => {
        setValues(currentValue)
    }, [trains.render, currentValue])

    useEffect(() => {

        if (debouncedValue) {

            dispatch(addOption({ option: { nameForUrl: 'price_from', status: debouncedValue[0] || values[0] } }));
            dispatch(addOption({ option: { nameForUrl: 'price_to', status: debouncedValue[1] || values[1] } }));
            dispatch(fetchTrainsByOption());
        }
    }, [debouncedValue, dispatch, values]);

    return (
        <div className={styles['only-slider-price']}>
            <ConfigProvider
                theme={{
                    components: {
                        Slider: {
                            trackBg: '#FFA800',
                            trackHoverBg: '#FFA800',
                            railSize: 17,
                            handleSize: 27,
                            handleSizeHover: 27,
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
                        placement: 'bottom',
                        arrow: false,
                        color: '#3e3c4100',
                    }}
                    className='slider-price'
                    step={10}
                    min={min}
                    max={max}
                    defaultValue={values}
                    onChange={handleChange}
                />
                <span className={styles['only-slider-price__max-value']}>
                    {max}
                </span>
            </ConfigProvider>
        </div>
    )
}

export default OnlySliderPrice