import { useDispatch } from 'react-redux';
import LinkChange from '../../../Ui/LinkChange/LinkChange';
import Feedback from './Feedback/Feedback';
import styles from './FeedbackAndLink.module.scss';
import { resetFetchTrains } from '../../../../redux/slices/fetchTrainsSlice';
import { resetPrice } from '../../../../redux/slices/pricesSlice';
import { resetPassengerData } from '../../../../redux/slices/dataPassengersSlice';
import { resetTypesOfTrainCarriage } from '../../../../redux/slices/typesOfTrainCarriageSlice';
import { resetTypeOfTrainCarriageSlice } from '../../../../redux/slices/typeOfTrainCarriageSlice';
import { resetSelectTrain } from '../../../../redux/slices/selectedTrainSlice';
import { resetDataPassengersOrder } from '../../../../redux/slices/dataPassengersOrderSlice';
import { resetPersonalData } from '../../../../redux/slices/personalDataSlice';

const FeedbackAndLink = () => {

    const dispatch = useDispatch();

    const onGoind = () => {
        dispatch(resetFetchTrains());
        dispatch(resetPrice());
        dispatch(resetPassengerData());
        dispatch(resetTypesOfTrainCarriage());
        dispatch(resetTypeOfTrainCarriageSlice());
        dispatch(resetSelectTrain());
        dispatch(resetDataPassengersOrder());
        dispatch(resetPersonalData());
    }

    return (
        <div className={styles["feedback-and-link"]}>
            <Feedback />
            <LinkChange onGoind={onGoind} text='вернуться на главную' to='/' classLinkChange='back-to-main' />
        </div>
    )
}

export default FeedbackAndLink