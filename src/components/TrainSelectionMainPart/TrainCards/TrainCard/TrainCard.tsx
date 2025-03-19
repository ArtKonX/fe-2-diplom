import NameAndDirection from './NameAndDirection/NameAndDirection';
import styles from './TrainCard.module.scss';

import trainCardImg from '../../../../assets/svg/train-card-img.svg';
import TimeAndDirection from './TimeAndDirection/TimeAndDirection';
import SelectionPlacesLinkOptions from './SelectionPlacesLinkOptions/SelectionPlacesLinkOptions';

import leftArrow from '../../../../assets/svg/left-arrow-direction.svg';
import rightArrow from '../../../../assets/svg/right-arrow-direction.svg';
import TypesAndPrices from './TypesAndPrices/TypesAndPrices';

const TrainCard = ({ type, ...props }: TrainCardProps) => {

    const departureFrom = props?.departure?.from;
    const departureTo = props?.departure?.to;
    const arrivalFrom = props?.arrival?.from;
    const arrivalTo = props?.arrival?.to;
    const priceDep = props?.departure?.price_info;
    const prices = props?.arrival?.price_info;
    const availableSeats = props?.available_seats_info;

    const dataNameAndDirection = {
        nameTrain: props?.departure?.train?.name,
        directions: [props?.departure?.from?.city?.name, props?.departure?.to?.city?.name],
        arrTo: props?.arrival?.to?.city?.name,
        arrTrain: props?.arrival?.train?.name,
        currentPlace: props?.departure?.from?.city?.name
    }

    const dataTimeAndDirection = {
        startNamesPlace: departureFrom?.city?.name,
        startNamesStation: departureFrom?.railway_station_name,
        times: [departureFrom?.datetime, departureTo?.datetime],
        endNamesPlace: departureTo?.city?.name,
        endNamesStation: departureTo?.railway_station_name,
        allTime: props?.departure?.duration
    }

    const dataTimeAndDirectionArrival = {
        startNamesPlace: arrivalTo?.city?.name,
        startNamesStation: arrivalTo?.railway_station_name,
        times: [arrivalFrom?.datetime, arrivalTo?.datetime],
        arrTime: arrivalTo?.datetime,
        endNamesPlace: arrivalFrom?.city?.name,
        endNamesStation: arrivalFrom?.railway_station_name,
        allTime: props?.arrival?.duration
    }

    const dataSelectionPlacesLinkOptions = { conditioning: props?.have_air_conditioning, wifi: props?.have_wifi, express: props?.is_express }

    return (
        <div className={`${type == 'card-tarin' ? styles["train-card"] : styles["order-train-card"]}`}>
            <div className={styles["name-and-direction-train"]}>
                <NameAndDirection img={trainCardImg} {...dataNameAndDirection} />
            </div>
            <div className={styles["time-and-direction"]}>
                <TimeAndDirection imgArrow={rightArrow} {...dataTimeAndDirection} />
                {props?.arrival && (<TimeAndDirection imgArrow={leftArrow} {...dataTimeAndDirectionArrival} />)}
            </div>
            <div className={styles["seats-and-price"]}>
                <TypesAndPrices availableSeats={availableSeats} priceDep={priceDep} prices={prices} />
                <SelectionPlacesLinkOptions train={props} options={dataSelectionPlacesLinkOptions} type={type} />
            </div>
        </div>
    )
}

export default TrainCard