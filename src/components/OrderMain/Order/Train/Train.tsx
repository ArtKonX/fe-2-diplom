import { useEffect, useState } from 'react';
import HeadingTop from '../../../Ui/HeadingTop/HeadingTop';
import styles from './Train.module.scss';
import TrainCard from '../../../TrainSelectionMainPart/TrainCards/TrainCard/TrainCard';
import { useSelector } from 'react-redux';

const Train = () => {

    const [data, setData] = useState<TrainCardProps | null>(null);

    const train = useSelector((state: {selectedTrain: {selectedTrain: TrainCardProps[]}}) => state.selectedTrain.selectedTrain[0])

    useEffect(() => {
        setData(train)
    }, [train, ]);

    if (!data) return <p className={styles['loading']}>Loading...</p>

    return (
        <div className={styles["train"]}>
            <HeadingTop text='Поезд' classHeading='train-heading' />
            <TrainCard {...data} type='train-order'/>
        </div>
    )
}

export default Train