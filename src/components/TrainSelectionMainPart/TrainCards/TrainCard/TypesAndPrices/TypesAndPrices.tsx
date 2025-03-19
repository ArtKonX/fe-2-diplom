import TypeAndPrice from './TypeAndPrice/TypeAndPrice';
import styles from './TypesAndPrices.module.scss';

const TypesAndPrices = ({ availableSeats, priceDep, prices }: TypesAndPricesProps) => {

    return (
        <ul className={styles["types-and-prices"]}>
            {availableSeats?.fourth && (
                <TypeAndPrice
                    type="Сидячий"
                    numberPlaces={availableSeats?.fourth}
                    priceDep={priceDep?.fourth}
                    prices={prices?.fourth}
                />
            )}
            {availableSeats?.third && (
                <TypeAndPrice
                    type="Плацкарт"
                    numberPlaces={availableSeats?.third}
                    priceDep={priceDep?.third}
                    prices={prices?.third}
                />
            )}
            {availableSeats?.second && (
                <TypeAndPrice
                    type="Купе"
                    numberPlaces={availableSeats?.second}
                    priceDep={priceDep?.second}
                    prices={prices?.second}
                />
            )}
            {availableSeats?.first && (
                <TypeAndPrice
                    type="Люкс"
                    numberPlaces={availableSeats?.first}
                    priceDep={priceDep?.first}
                    prices={prices?.first}
                />
            )}
        </ul>
    )
}

export default TypesAndPrices