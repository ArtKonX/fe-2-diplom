import { useSelector } from 'react-redux';
import PlaceBtn from '../PlaceBtn/PlaceBtn';
import styles from './BoardingPassangesFirst.module.scss';

const BoardingPassangesFirst = ({ type, seats, directionTrain }: {type: string, seats: Seat[], directionTrain: "departure" | "arrival"}) => {

    const currentCarriage = useSelector((state: BoardingPassangesProps) => state.typeOfTrainCarriage);

    if (!seats) return null;

    const price = currentCarriage.currentCarriage.directions && currentCarriage?.currentCarriage?.directions[directionTrain].currentCarriageList[0]?.coach?.bottom_price;

    return (
        <div className={styles['boarding-passanges-group']}>
            <div className={styles['boarding-passanges-group__container']}>
                <div className={`${styles["boarding-passanges-group-top"]} ${styles[`boarding-passanges-group-top_${type}`]}`}>
                    <ul className={`${styles["boarding-passanges-group-top__list"]} ${styles[`boarding-passanges-group-top__list_${type}`]}`}>
                        {seats.map(place => (
                            <li key={place.index} className={styles['boarding-passanges-group-top__elem']}>
                                 <PlaceBtn price={price} place={place} classPlaceBtn={'btn-place-first'} directionTrain={directionTrain}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${styles["boarding-passanges-group-bottom"]} ${styles[`boarding-passanges-group-bottom_${type}`]}`}>
                    <ul className={`${styles["boarding-passanges-group-bottom__list"]} ${styles[`boarding-passanges-group-bottom__list${type}`]}`}>
                        {Array.from({ length: Math.ceil(seats.length / 2) }, (_, indx) => indx++).map(place => (
                            <li key={place} className={styles['boarding-passanges-group-bottom__elem-bottom']}>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default BoardingPassangesFirst