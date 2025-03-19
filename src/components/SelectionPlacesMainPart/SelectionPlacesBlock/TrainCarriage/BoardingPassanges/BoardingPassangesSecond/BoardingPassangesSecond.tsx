import { useSelector } from 'react-redux';
import styles from './BoardingPassangesSecond.module.scss';
import PlaceBtn from '../PlaceBtn/PlaceBtn';

const BoardingPassangesSecond = ({ type, seats, directionTrain }: { type: string, seats: Seat[], directionTrain: "departure" | "arrival" }) => {

    const currentCarriage = useSelector((state: BoardingPassangesProps) => state.typeOfTrainCarriage);

    if (!seats) return null;

    const allSeats = { top: [] as Seat[], bottom: [] as Seat[]};

    const groupedSeats = [];
    for (let i = 0; i < seats.length; i += 4) {
        groupedSeats.push(seats.slice(i, i + 4));
    }

    groupedSeats.forEach(group => {
        group.forEach((place, index) => {
            if ((index + 1) % 2 === 0) {
                allSeats.top.push(place);
            } else {
                allSeats.bottom.push(place);
            }
        });
    });

    const pricesList = currentCarriage.currentCarriage.directions &&  [currentCarriage?.currentCarriage.directions[directionTrain].currentCarriageList[0]?.coach?.bottom_price, currentCarriage?.currentCarriage.directions[directionTrain].currentCarriageList[0]?.coach?.top_price];

    if (!seats) return

    return (
        <div className={styles['boarding-passanges-group']}>
            <div className={styles['boarding-passanges-group__container']}>
                <div className={`${styles["boarding-passanges-group-top"]} ${styles[`boarding-passanges-group-top_${type}`]}`}>
                    <ul className={`${styles["boarding-passanges-group-top__list-top"]} ${styles[`boarding-passanges-group-top__list-top_${type}`]}`}>
                        {allSeats.top.map(place => (
                            <li key={place.index} className={styles['boarding-passanges-group-top__elem-top']}>
                                <PlaceBtn price={place.index % 2 === 0  ? pricesList && pricesList[1] : pricesList && pricesList[0]} place={place} classPlaceBtn={'btn-place-second'} directionTrain={directionTrain}/>
                            </li>
                        ))}
                    </ul>
                    <ul className={`${styles["boarding-passanges-group-top__list-bottom"]} ${styles[`boarding-passanges-group-top__list-bottom_${type}`]}`}>
                        {allSeats.bottom.map(place => (
                            <li key={place.index} className={styles['boarding-passanges-group-top__elem-bottom']}>
                                <PlaceBtn price={place.index % 2 === 0 ? pricesList && pricesList[1] : pricesList && pricesList[0]} place={place} classPlaceBtn={'btn-place-second'} directionTrain={directionTrain}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${styles["boarding-passanges-group-bottom"]} ${styles[`boarding-passanges-group-bottom_${type}`]}`}>
                    <ul className={`${styles["boarding-passanges-group-bottom__list"]} ${styles[`boarding-passanges-group-bottom__list${type}`]}`}>
                        {Array.from({ length: 10 }, (_, indx) => indx++).map(place => (
                            <li key={place} className={styles['boarding-passanges-group-bottom__elem-bottom']}>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default BoardingPassangesSecond