import styles from './HeaderTitle.module.scss';

const HeaderTitle = () => {

    return (
        <h1 className={styles['header__title']}>
            Вся жизнь -
            <span className={styles["header__title-bolt"]}>путешествие!</span>
        </h1>
    )
}

export default HeaderTitle