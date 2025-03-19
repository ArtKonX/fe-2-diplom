import styles from './TypeOfTrainCarriage.module.scss';

import fourth from '../../../../assets/icons/fourth.svg'
import fourthActive from '../../../../assets/icons/fourthActive.svg'

import third from '../../../../assets/icons/third.svg'
import thirdActive from '../../../../assets/icons/thirdActive.svg'

import second from '../../../../assets/icons/second.svg'
import secondActive from '../../../../assets/icons/secondActive.svg'

import first from '../../../../assets/icons/first.svg'
import firstActive from '../../../../assets/icons/firstActive.svg'
import TypeOfTrainCarriageElem from './TypeOfTrainCarriageElem/TypeOfTrainCarriageElem';

const TypeOfTrainCarriage = ({ direction, typesOfTrainCarriage }: { direction: string, typesOfTrainCarriage: TypeOfTrainCarriage[] }) => {

    const typesCarriage = [
        {
            id: 4,
            img: fourth,
            imgActive: fourthActive,
            name: 'fourth',
            nameRus: 'сидячий'
        },
        {
            id: 3,
            img: third,
            imgActive: thirdActive,
            name: 'third',
            nameRus: 'плацкарт'
        },
        {
            id: 2,
            img: second,
            imgActive: secondActive,
            name: 'second',
            nameRus: 'купе'
        },
        {
            id: 1,
            img: first,
            imgActive: firstActive,
            name: 'first',
            nameRus: 'люкс'
        },
    ];

    if (!typesOfTrainCarriage) return (<p className={styles['loading']}>loading...</p>)

    return (
        <div className={styles["type-of-train-carriage"]}>
            <h3 className={styles["type-of-train-carriage__title"]}>
                Тип вагона
            </h3>
            <ul className={styles["type-of-train-carriage__list"]}>
                {
                    typesCarriage.filter(type => typesOfTrainCarriage.some((elem: TypeOfTrainCarriage) => elem?.coach?.class_type === type.name)).map(elem => (
                        <li className={styles['type-of-train-carriage__elem']} key={elem.id}>
                            <TypeOfTrainCarriageElem direction={direction} id={elem.id} typeCarriage={elem} typesOfTrainCarriage={typesOfTrainCarriage} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TypeOfTrainCarriage