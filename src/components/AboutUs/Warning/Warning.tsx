import styles from './Warning.module.scss';

const Warning = () => {

    return (
        <p className={styles["warning"]}>
            Покупать жд билеты дешево можно за 90 суток до отправления поезда.
            Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
        </p>
    )
}

export default Warning