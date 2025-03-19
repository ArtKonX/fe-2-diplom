import { useSelector } from 'react-redux';
import ButtonQuantity from './ButtonQuantity/ButtonQuantity';
import styles from './Filters.module.scss';
import SelectElem from './Select/SelectElem';
import dayjs from 'dayjs';
import { useState } from 'react';

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
    trains: {
        items: TrainCardProps[],
        total_count: number,
    },
    loading: boolean,
    url: string,
    error: string
}

interface Option {
    option: string,
    status: string | boolean | number
}

const options = [
    {
        value: 'date_depart',
        label: 'времени',
    },
    {
        value: 'price_min',
        label: 'стоимости',
    },
    {
        value: 'duration',
        label: 'длительности',
    },
];

const quantity = [
    5, 10, 20
]

const maxQuantity = 20;

const Filters = () => {

    const [selectedQuantity, setSelectedQuantity] = useState<number>(5);

    const infoAboutTrains = useSelector((state: {
        fetchTrains: FetchTrainsState
    }) => state.fetchTrains);

    return (
        <div className={styles['filters']}>
            <div className={styles['filters__found']}>
                найдено {infoAboutTrains.trains.total_count}
            </div>
            <div className={styles['filters__sort-and-showing-quantity']}>
                <div className={styles['filters__sort']}>
                    сортировать по:
                    <SelectElem options={options} activeOption={options[0].label} />
                </div>
                <div className={styles['filters__showing-quantity']}>
                    показывать по:
                    {quantity.map(number => (
                        <ButtonQuantity quantity={number} maxQuantity={maxQuantity} selectedQuantity={selectedQuantity} setSelectedQuantity={setSelectedQuantity} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Filters