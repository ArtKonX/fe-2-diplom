import { useSelector } from 'react-redux';
import styles from './BoardingPassangesFourth.module.scss';
import PlaceBtn from '../PlaceBtn/PlaceBtn';

const BoardingPassangesFourth = ({ type, seats, directionTrain }: { type: string, seats: Seat[], directionTrain: "departure" | "arrival" }) => {

    const currentCarriage = useSelector((state: BoardingPassangesProps) => state.typeOfTrainCarriage);

    if (!seats) return null;

    const placesGroupTop = { top: [] as Seat[], bottom: [] as Seat[] };
    const placesGroupBottom = { top: [] as Seat[], bottom: [] as Seat[] };

    const seatsTop = seats.slice(0, Math.ceil(seats.length / 2));
    const seatsBottom = seats.slice(seatsTop.length);

    const price = currentCarriage.currentCarriage.directions &&  currentCarriage?.currentCarriage.directions[directionTrain].currentCarriageList[0]?.coach?.bottom_price;

    const groupedSeatsTop = [];
    const groupedSeatsBottom = [];

    for (let i = 0; i < seatsTop.length; i += 4) {
        groupedSeatsTop.push(seatsTop.slice(i, i + 4));
    }

    groupedSeatsTop.forEach(group => {
        group.forEach((place, index) => {
            if ((index + 1) % 2 === 0) {
                placesGroupTop.top.push(place);
            } else {
                placesGroupTop.bottom.push(place);
            }
        });
    });

    for (let i = 0; i < seatsTop.length; i += 4) {
        groupedSeatsBottom.push(seatsBottom.slice(i, i + 4));
    }

    groupedSeatsBottom.forEach(group => {
        group.forEach((place, index) => {
            if ((index + 1) % 2 !== 0) {
                placesGroupBottom.top.push(place);
            } else {
                placesGroupBottom.bottom.push(place);
            }
        });
    });

    if (!seats) return

    return (
        <div className={styles['boarding-passanges-group']}>
            <div className={styles['boarding-passanges-group__container']}>
                <div className={`${styles["boarding-passanges-group-top"]} ${styles[`boarding-passanges-group-top_${type}`]}`}>
                    <ul className={`${styles["boarding-passanges-group-top__list-top"]} ${styles[`boarding-passanges-group-top__list-top_${type}`]}`}>
                        {placesGroupTop.top.map(place => (
                            <li key={place.index} className={styles['boarding-passanges-group-top__elem-top']}>
                                <PlaceBtn price={price} place={place} classPlaceBtn={'btn-place-fourth'} directionTrain={directionTrain} />
                            </li>
                        ))}
                    </ul>
                    <ul className={`${styles["boarding-passanges-group-top__list-bottom"]} ${styles[`boarding-passanges-group-top__list-bottom_${type}`]}`}>
                        {placesGroupTop.bottom.map(place => (
                            <li key={place.index} className={styles['boarding-passanges-group-top__elem-bottom']}>
                                <PlaceBtn price={price} place={place} classPlaceBtn={'btn-place-fourth'} directionTrain={directionTrain} />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${styles["boarding-passanges-group-bottom"]} ${styles[`boarding-passanges-group-bottom_${type}`]}`}>
                    <ul className={`${styles["boarding-passanges-group-bottom__list-top"]} ${styles[`boarding-passanges-group-bottom__list-top_${type}`]}`}>
                        {placesGroupBottom.top.map(place => (
                            <li key={place.index} className={styles['boarding-passanges-group-bottom__elem-top']}>
                                <PlaceBtn price={price} place={place} classPlaceBtn={'btn-place-fourth'} directionTrain={directionTrain} />
                            </li>
                        ))}
                    </ul>
                    <ul className={`${styles["boarding-passanges-group-bottom__list-bottom"]} ${styles[`boarding-passanges-group-top__list-bottom_${type}`]}`}>
                        {placesGroupBottom.bottom.map(place => (
                            <li key={place.index} className={styles['boarding-passanges-group-bottom__elem-bottom']}>
                                <PlaceBtn price={price} place={place} classPlaceBtn={'btn-place-fourth'} directionTrain={directionTrain} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BoardingPassangesFourth