import { useDispatch } from 'react-redux';
import styles from './ButtonQuantity.module.scss';
import { addLimit, fetchTrainsByOption } from '../../../../redux/slices/fetchTrainsSlice';
import { AppDispatch } from '../../../../redux/store';

const ButtonQuantity = ({ quantity, maxQuantity, selectedQuantity, setSelectedQuantity }: { quantity: number, maxQuantity: number, selectedQuantity: number, setSelectedQuantity: (selectedQuantity: number) => void }) => {

    const dispatch = useDispatch<AppDispatch>();

    const onQuantity = () => {
        // Реализация показа по количеству поездов
        setSelectedQuantity(quantity);
        dispatch(addLimit({limit: quantity}));
        dispatch(fetchTrainsByOption())
    }

    return (
        <button type='button' onClick={onQuantity} className={`${styles['button-quantity']} ${selectedQuantity == quantity && `${styles['button-quantity_active']}`}`} disabled={(quantity > maxQuantity)}>
            {quantity}
        </button>
    )
}

export default ButtonQuantity