import { useSelector } from 'react-redux';
import OnlySliderPrice from './OnlySliderPrice/OnlySliderPrice';
import styles from './PriceSlider.module.scss';
import { useEffect, useState } from 'react';

const PriceSlider = () => {

    const trains = useSelector((state: { fetchTrains: { trains: { items: TrainCardProps[] }, render: boolean } }) => state.fetchTrains);

    const compareFnMax = (a: number, b: number) => b - a;
    const compareFnMin = (a: number, b: number) => a - b;

    const [maxPrice, setMaxPrice] = useState(trains?.trains?.items.map(item => item.min_price).sort(compareFnMax));

    const [minPrice, setMinPrice] = useState(trains?.trains?.items?.map(item => item.min_price).sort(compareFnMin));

    const [defaultValuePrice, setDefaultValuePrice] = useState([minPrice ? minPrice[0] : 0, maxPrice[0] ? maxPrice[0] : 10000])

    useEffect(() => {
        const maxPriceCurrent = trains?.trains?.items.map(item => item.min_price).sort(compareFnMax);

        const minPriceCurrent = trains?.trains?.items?.map(item => item.min_price).sort(compareFnMin);

        setMinPrice(minPriceCurrent)
        setMaxPrice(maxPriceCurrent)

        setDefaultValuePrice([minPrice ? minPrice[0] : 0, maxPrice ? maxPrice[0] : 10000]);

    }, [trains.render, trains?.trains?.items,])

    return (
        <div className={styles['price-slider']}>
            <h3 className={styles["price-slider__title"]}>Стоимость</h3>
            <div className={styles["price-slider__additional-info"]}>
                <span className={styles["from"]}>
                    от
                </span>
                <span className={styles["before"]}>
                    до
                </span>
            </div>
            <OnlySliderPrice min={defaultValuePrice[0]} max={defaultValuePrice[1]} defaultValue={defaultValuePrice} />
        </div>
    )
}

export default PriceSlider