import styles from './TypeOfTrainCarriageElem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentCarriage, addTypeOfTrainCarriage, removeCurrentCarriage } from '../../../../../redux/slices/typeOfTrainCarriageSlice';
import { resetPrice } from '../../../../../redux/slices/pricesSlice';

const TypeOfTrainCarriageElem = ({ direction, id, typeCarriage, typesOfTrainCarriage }: { direction: string, id: number, typeCarriage: TypeOfTrainCarriage, typesOfTrainCarriage: TypeOfTrainCarriage[] }) => {

    const typeOfTrainCarriageData = useSelector((state: { typeOfTrainCarriage: TypeOfTrainCarriageState }) => state.typeOfTrainCarriage);

    const dispatch = useDispatch();

    const onAction = () => {
        const currentType = typesOfTrainCarriage.filter(type => type?.coach?.class_type == typeCarriage.name);

        dispatch(addTypeOfTrainCarriage({ currentTypeInfo: typeCarriage, typeOfTrainCarriage: currentType, direction }));
        dispatch(removeCurrentCarriage({direction}));
        dispatch(addCurrentCarriage({ currentCarriage: currentType[0], direction: direction }));
        dispatch(resetPrice());
    }

    const currentId = typeOfTrainCarriageData.currentTypeInfo.directions

    const check = currentId && id === currentId[direction]?.currentTypeInfoList[0]?.id;

    const imgSrc = check ? typeCarriage.imgActive : typeCarriage.img;

    return (
        <button className={styles["type-arriage-btn"]} onClick={onAction}>
            <img src={imgSrc} alt={`${typeCarriage.name}`} className={styles["type-arriage-btn__img"]} />
            <span className={`${check ? `${styles["type-arriage-btn__type"]} ${styles["type-arriage-btn__type_active"]}` : `${styles["type-arriage-btn__type"]}`}`}>{typeCarriage.nameRus}</span>
        </button>
    )
}

export default TypeOfTrainCarriageElem