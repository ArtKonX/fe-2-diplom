import { useDispatch, useSelector } from 'react-redux';
import styles from './ButtonOption.module.scss';
import { addOption, removeOption } from '../../../../../../../redux/slices/pricesSlice';
import { useState } from 'react';

type Direction = string;

interface PriceInfoDirection {
    classPlace: string;
    optionsPrice:  {name: string, price: number}[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PassengersAgeAndNumber {
    adults?: number,
    children?: number,
    baby?: number,
    all?: number
}

interface PriceInfo {
    directions: {
        [key in Direction]: {
            direction: PriceInfoDirection;
            passengersAgeAndNumber: PassengersAgeAndNumber;
        }
    }
}

const ButtonOption = ({ option, directionTrain }: { option: OptionObj, directionTrain: "departure" | "arrival" }) => {

    const prices = useSelector((state: { prices: PriceInfo }) => state.prices);

    const dispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);

    const check = prices?.directions[directionTrain].direction?.optionsPrice?.find((elem: OptionPrice) => elem.name == option.name)

    const onAction = () => {
        if (check) {
            dispatch(removeOption({ option: option, directionTrain: directionTrain }))
        } else {
            dispatch(addOption({ option: option, directionTrain: directionTrain }))
        }
    }

    const handleMouseEnter = () => { setIsHovered(true) };
    const handleMouseLeave = () => { setIsHovered(false) };

    const imgSrc = check || isHovered && !option.available ? option.srcActive : option.src;

    if (option.name == 'conditing' && option.available == false) return

    return (
        <button onClick={onAction} type='button' className={check ? `${styles['btn-option']} ${styles['btn-option_active']}` : `${styles['btn-option']}`} disabled={option.available || option.price == 0}><img alt={option.name} src={imgSrc} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} /></button>
    )
}

export default ButtonOption