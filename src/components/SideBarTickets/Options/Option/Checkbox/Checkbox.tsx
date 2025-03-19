import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrainsByOption, addOption } from '../../../../../redux/slices/fetchTrainsSlice';
import { AppDispatch } from '../../../../../redux/store';

interface FetchTrainsState {
    fetchTrains: {
        trains: {
            items: TrainCardProps[]
        }
    }
}

interface OptionsList {
    [key: string]: boolean;
}

const Checkbox = ({ status, name, nameForUrl }: { status: boolean, name: string, nameForUrl: string }) => {

    const trains = useSelector((state: FetchTrainsState) => state?.fetchTrains?.trains?.items)

    const [isChecked, setIsChecked] = useState({ [name]: status });

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const optionsList: OptionsList[] = trains?.map(train => ({
            have_air_conditioning: train.departure.have_air_conditioning,
            have_first_class: train.departure.have_first_class,
            have_fourth_class: train.departure.have_fourth_class,
            have_second_class: train.departure.have_second_class,
            have_third_class: train.departure.have_third_class,
            have_wifi: train.departure.have_wifi,
            is_express: train.departure.is_express
        })) || [];
        const optionsListArrival: OptionsList[] = trains?.map(train => ({
            have_air_conditioning: train?.arrival?.have_air_conditioning,
            have_first_class: train?.arrival?.have_first_class,
            have_fourth_class: train?.arrival?.have_fourth_class,
            have_second_class: train?.arrival?.have_second_class,
            have_third_class: train?.arrival?.have_third_class,
            have_wifi: train?.arrival?.have_wifi,
            is_express: train?.arrival?.is_express
        })) || [];

        const containsTrueOption = optionsList?.some(option => option[nameForUrl] === true);

        let containsTrueOptionArrival;
        let optionAvailability;

        if (optionsListArrival) {
            containsTrueOptionArrival = optionsListArrival?.some(option => option[nameForUrl] === true);
            optionAvailability = [containsTrueOptionArrival, containsTrueOption];
        } else {
            optionAvailability = [containsTrueOption];
        }

        const checkBooleanOption = optionAvailability.some(elem => elem == true);

        setIsChecked({ [name]: checkBooleanOption })

    }, [trains, name, nameForUrl])

    const onChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;

        dispatch(addOption({ option: { nameForUrl: nameForUrl, status: !isChecked[name] } }));

        dispatch(fetchTrainsByOption());

        setIsChecked({ [name]: !isChecked[name] });
    }

    return (
        <label className={styles['option__checkbox']}>
            <input className={styles['checkbox']} onChange={onChecked} checked={isChecked[name]} type="checkbox" name={name} />
            <span className={styles['checkbox-switch']} ></span>
        </label>
    )
}

export default Checkbox