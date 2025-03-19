import { useDispatch, useSelector } from 'react-redux';
import styles from './TrainCarriageInfoBtnElem.module.scss';
import { addCurrentCarriage } from '../../../../../../redux/slices/typeOfTrainCarriageSlice';
import { resetPrice } from '../../../../../../redux/slices/pricesSlice';

const TrainCarriageInfoBtnElem = ({ trainCarriage, direction }: { trainCarriage: TypeOfTrainCarriage, direction: string }) => {

    const dispatch = useDispatch();
    const typeOfTrainCarriage = useSelector((state: { typeOfTrainCarriage: { currentCarriage: TypeOfTrainCarriage } }) => state.typeOfTrainCarriage);

    const check = () => typeOfTrainCarriage.currentCarriage.directions && typeOfTrainCarriage.currentCarriage.directions[direction].currentCarriageList.some(elem => elem?.coach?.name == trainCarriage?.coach?.name)

    const onAction = () => {
        dispatch(resetPrice())
        dispatch(addCurrentCarriage({ currentCarriage: trainCarriage, direction: direction }));
    }

    return (
        <button type='button' className={`${styles['number-carriage-elem__button']} ${check() && styles['number-carriage-elem__button_active']}`} onClick={onAction}>{trainCarriage?.coach?.name}</button>
    )
}

export default TrainCarriageInfoBtnElem