import styles from './SelectionPlacesLinkOptions.module.scss';

import food from '../../../../../assets/svg/food.svg';
import express from '../../../../../assets/svg/express.svg';
import wifi from '../../../../../assets/svg/wifi.svg';
import conditioner from '../../../../../assets/svg/conditioner.svg';

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addSelectTrain } from '../../../../../redux/slices/selectedTrainSlice';
import { fetchTypesOfTrainCarriageArrival, fetchTypesOfTrainCarriageDeparture } from '../../../../../redux/slices/typesOfTrainCarriageSlice';
import { AppDispatch } from '../../../../../redux/store';
import { Link } from 'react-router-dom';

const SelectionPlacesLinkOptions = ({ train, options, type }: { options: SelectionPlacesLinkOptionsProps, train: TrainCardProps, type: string | undefined }) => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onAction = () => {
        dispatch(addSelectTrain({ selectedTrain: train }));
        dispatch(fetchTypesOfTrainCarriageDeparture({id: train.departure._id}));

        if (train.arrival?._id) {
            dispatch(fetchTypesOfTrainCarriageArrival({id: train.arrival._id}))
        }
        navigate('/selection-places')
    }

    return (
        <div className={styles["selection-places"]}>
            <div className={styles["additional-options"]}>
                {options.wifi && (<img src={wifi} alt="wifi" className={styles["additional-options__img"]} />)}
                {options.express && (<img src={express} alt="ракета" className={styles["additional-options__img"]} />)}
                <img src={food} alt="питание" className={styles["additional-options__img"]} />
                {options.conditioning && (<img src={conditioner} alt="кондиционер" className={styles["additional-options__img"]} />)}
            </div>
            {type == 'card-tarin' ? <button onClick={onAction} className={styles['link-to-selection-places']}>Выбрать места</button> : <Link className={styles['change-train-link']} to='/train-selection'>Изменить</Link>}
        </div>
    )
}

export default SelectionPlacesLinkOptions