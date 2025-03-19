import styles from './TextAboutSuccessOrder.module.scss';

const TextAboutSuccessOrder = ({ name }: { name: string }) => {

    return (
        <div className={styles["text-about-success-order"]}>
            <h3 className={styles["text-about-success-order__title"]}>
                {name}!
            </h3>
            <p className={styles["text-about-success-order__text"]}>
                Ваш заказ успешно оформлен.<br />
                В ближайшее время с вами свяжется наш оператор для подтверждения.
            </p>
            <p className={styles['text-about-success-order__thankfulness']}>
                Благодарим Вас за оказанное доверие и желаем приятного путешествия!
            </p>
        </div>
    )
}

export default TextAboutSuccessOrder