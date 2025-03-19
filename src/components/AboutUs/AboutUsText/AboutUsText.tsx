import styles from './AboutUsText.module.scss';

const AboutUsText = () => {

    return (
        <div className={styles["greeting"]}>
            <p className={styles["greeting__first-info"]}>
                Мы рады видеть вас! Мы рботаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем
                все больше людей заказывают жд билеты через интернет.
            </p>

            <p className={styles["greeting__second-info"]}>
                Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать?
                Мы расскажем о преимуществах заказа через интернет.
            </p>
        </div>
    )
}

export default AboutUsText