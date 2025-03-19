import styles from './TrainInfoAboutCarriage.module.scss';

import currency from '../../../../../../assets/svg/currency.svg';

import conditingImg from '../../../../../../assets/icons/conditioning-black.svg';
import conditingImgActive from '../../../../../../assets/icons/conditioning-white.svg';

import wifiImg from '../../../../../../assets/icons/wifi-black.svg';
import wifiImgActive from '../../../../../../assets/icons/wifi-white.svg';

import linesImg from '../../../../../../assets/icons/linens-black.svg';
import linesImgActive from '../../../../../../assets/icons/linens-white.svg';

import foodImg from '../../../../../../assets/icons/food-black.svg';
import foodImgActive from '../../../../../../assets/icons/food-white.svg';

import ButtonOption from './ButtonOption/ButtonOption';

const TrainInfoAboutCarriage = ({ carriage, directionTrain }: {carriage: CurrentCarriage[], directionTrain: "departure" | "arrival"}) => {

    const numberUpPlaces = carriage[0]?.seats?.filter(elem => elem.index % 2 == 0 && elem.available).length;
    const numberDownPlaces = carriage[0]?.seats?.filter(elem => elem.index % 2 != 0 && elem.available).length;
    const upPrice = carriage[0]?.coach?.top_price;
    const downPrice = carriage[0]?.coach?.bottom_price;

    const optionsObj = [
        { name: 'conditing', srcActive: conditingImgActive, src: conditingImg, available: carriage[0]?.coach?.have_air_conditioning, price: null, includes: false },
        { name: 'wifi', srcActive: wifiImgActive, src: wifiImg, available: carriage[0]?.have_wifi, price: carriage[0]?.coach?.wifi_price, includes: false },
        { name: 'lines', srcActive: linesImgActive, src: linesImg, available: carriage[0]?.coach?.is_linens_included, price: carriage[0]?.coach?.linens_price, includes: false },
        { food: 'food', srcActive: foodImgActive, src: foodImg, available: true, price: 0, includes: true }
    ]

    if (carriage)
        return (
            <div className={styles['train-info-about-carriage']}>
                <h3 className={styles["train-info-about-carriage__title"]}>
                    {carriage[0]?.coach?.name}

                    <span className={styles["title-text"]}>
                        вагон
                    </span>
                </h3>
                <div className={styles["train-info-about-carriage__number-places-and-prices-and-options"]}>
                    <div className={styles["number-places"]}>
                        <div className={styles["number-places__number-places"]}>
                            <span className={styles["number-places-text"]}>
                                Места
                                <span className={styles["number-places-text__number"]}>
                                    {numberUpPlaces && numberDownPlaces ?  numberUpPlaces + numberDownPlaces : 0}
                                </span>
                            </span>
                            {!['first', 'fourth'].includes(carriage[0].coach ? carriage[0].coach.class_type : 'first' ) && (<><span className={styles["number-places-up"]}>
                                Верхние
                                <span className={styles["number-places-up__up-number"]}>
                                    {numberUpPlaces}
                                </span>
                            </span>
                                <span className={styles["number-places-down"]}>
                                    Нижние
                                    <span className={styles["number-places-down__down-number"]}>
                                        {numberDownPlaces}
                                    </span>
                                </span>
                            </>)}
                        </div>
                        <div className={styles["number-places__price"]}>
                            <span className={styles["text-price"]}>
                                Стоимость
                            </span>
                            {!['first', 'fourth'].includes(carriage[0].coach ? carriage[0].coach.class_type : 'first') ? (<>
                                <div className={styles["price-places-up"]}>
                                    {upPrice}
                                    <span className={styles["price-places-up__price"]}>
                                        <img src={currency} alt="рубль" className={styles["currency-img"]} />
                                    </span>
                                </div>
                                <div className={styles["price-places-down"]}>
                                    {downPrice}
                                    <span className={styles["price-places-down__price"]}>
                                        <img src={currency} alt="рубль" className={styles["currency-img"]} />
                                    </span>
                                </div>
                            </>) : (<div className={styles["price-places-up"]}>
                                {downPrice}
                                <span className={styles["price-places-up__price"]}>
                                    <img src={currency} alt="рубль" className={styles["currency-img"]} />
                                </span>
                            </div>)}
                        </div>
                        <div className={styles["options"]}>
                            <span className={styles["options__text"]}>
                                Обслуживание
                                <span className={styles["options__color"]}>фпк</span>
                            </span>
                            <ul className={styles["options-list"]}>
                                {optionsObj.map(option => (<ButtonOption option={option} directionTrain={directionTrain} />))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default TrainInfoAboutCarriage