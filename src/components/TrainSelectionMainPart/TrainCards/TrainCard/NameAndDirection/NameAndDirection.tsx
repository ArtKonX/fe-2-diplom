import styles from './NameAndDirection.module.scss';

const NameAndDirection = ({ img, nameTrain, directions }: NameAndDirectionProps) => {

    return (
        <div className={styles["name-and-direction"]}>
            <img src={img} alt="картинка с поездом" className={styles["name-and-direction__train-img"]} />
            <h3 className={styles["name-and-direction__name-train"]}>
                {nameTrain}
            </h3>
            <ul className={styles["name-and-direction__directions"]}>
                {directions.map((direction, indx) => (
                    <li className={styles["direction-elem"]} key={indx}>
                        <p className={styles["direction"]}>
                            {`${direction} ${(indx + 1 != directions.length) ? '→' : ''}`}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NameAndDirection