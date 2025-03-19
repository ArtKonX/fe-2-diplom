import { useEffect, useState } from 'react';
import TrainCard from './TrainCard/TrainCard';
import styles from './TrainCards.module.scss';
import { useSelector } from 'react-redux';

const TrainCards = () => {

    const [data, setData] = useState<TrainCardProps[] | null>(null);

    const fetchTrains = useSelector((state: {
        fetchTrains: {
            trains: {
                items: TrainCardProps[]
            }
        }
    }) => state.fetchTrains);

    useEffect(() => {
        setData(fetchTrains?.trains?.items);

    }, [data, setData, fetchTrains.trains]);

    if (!data) return

    return (
        <ul className={styles["train-cards"]}>
            {[...data].map((elem, indx) => (
                <li key={indx} className={styles["train-cards__elem"]}>
                    <TrainCard {...elem} type="card-tarin" />
                </li>
            ))}
        </ul>
    )
}

export default TrainCards