import { ChangeEvent, useEffect, useState } from 'react';
import styles from './NumberOfTickets.module.scss';
import './NumberOfTickets.scss';

import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPassengersAgeAndNumber } from '../../../../redux/slices/pricesSlice';

interface PriceInfo {
    directions: {
        ['departure']: {
            from: PriceInfoFrom;
            to: PriceInfoTo;
        },
        ['arrival']: {
            from: PriceInfoFrom;
            to: PriceInfoTo;
        },
        passengersAgeAndNumber: PassengersAgeAndNumber;
    }
}

interface PriceInfoFrom {
    classPlace: string;
    optionsPrice:  {name: string, price: number}[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PriceInfoTo {
    classPlace: string;
    optionsPrice:  {name: string, price: number}[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PassengersAgeAndNumber {
    adults: number,
    children: number,
    baby: number,
    all: number
}

const NumberOfTickets = ({ directionTrain }: { directionTrain: "departure" | "arrival" }) => {

    const numberAdult = 2;
    const maxAdultNumber = 5;

    const numberChildren = 1;
    const maxChildrenNumber = 4;

    const numberBaby = 0;
    const maxBabyNumber = 2;

    const dispatch = useDispatch();

    const passengersAgeAndNumber = useSelector((state: { prices: PriceInfo }) => state.prices.directions.passengersAgeAndNumber);

    const render = useSelector((state: { prices: { render: boolean } }) => state.prices);

    const [dataNumberState, setDataNumberState] = useState({ adults: passengersAgeAndNumber.adults, children: passengersAgeAndNumber.children, baby: passengersAgeAndNumber.baby });

    useEffect(() => {
        setDataNumberState({ adults: passengersAgeAndNumber.adults, children: passengersAgeAndNumber.children, baby: passengersAgeAndNumber.baby })
    }, [render, passengersAgeAndNumber.adults, passengersAgeAndNumber.baby, passengersAgeAndNumber.children])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target as unknown as { name: 'children' | 'adults' | 'baby', value: number };

        dispatch(addPassengersAgeAndNumber({ directionTrain: directionTrain, ageName: name, ageNumber: Number(value) }))
    }

    return (
        <div className={styles["number-of-tickets"]}>
            <h3 className={styles["number-of-tickets__title"]}>
                Количество билетов
            </h3>
            <Form className={styles["number-of-tickets__form"]}>
                <Form.Item className={styles["adults-form"]}>
                    <Input
                        type="number"
                        name="adults"
                        prefix="Взрослых — "
                        defaultValue={0}
                        value={dataNumberState.adults}
                        min={0}
                        max={maxAdultNumber}
                        onChange={onChange}
                        className={styles['adults-form__input']}
                    />
                    <span className={styles['adults-form__info']}>
                        {` Можно добавить еще ${maxAdultNumber - dataNumberState.adults}  ${maxAdultNumber - numberAdult === 1
                            ? 'пассажира'
                            : 'пассажиров'
                            }`}
                    </span>
                </Form.Item>
                <Form.Item className={styles["children-form"]}>
                    <Input
                        type="number"
                        name='children'
                        prefix="Детских — "
                        defaultValue={0}
                        value={dataNumberState.children}
                        min={0}
                        max={maxChildrenNumber}
                        onChange={onChange}
                        className={styles['children-form__input']}
                    />
                    <span className={styles['children-form__info']}>
                        {`Можно добавить еще ${maxChildrenNumber - dataNumberState.children} ${maxChildrenNumber - numberChildren === 1
                            ? 'ребёнка'
                            : 'детей'
                            } до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%`}
                    </span>
                </Form.Item>
                <Form.Item className={styles["children-without-place-form"]}>
                    <Input
                        type="number"
                        name='baby'
                        prefix="Детских «без места» — "
                        defaultValue={0}
                        value={dataNumberState.baby}
                        min={0}
                        max={maxBabyNumber}
                        onChange={onChange}
                        className={styles['baby-form__input']}
                    />
                    <span className={styles['baby-form__info']}>
                        {`Можно добавить еще ${maxBabyNumber - dataNumberState.baby} ${maxBabyNumber - numberBaby === 1
                            ? 'младенца'
                            : 'младенцев'
                            }`}
                    </span>
                </Form.Item>
            </Form>
        </div>
    )
}

export default NumberOfTickets