import styles from './CheckboxLimitations.module.scss';

const CheckboxLimitations = () => {

    return (
        <div className={styles['checkbox-limitations-block']}>
            <input className={styles['checkbox-limitations-block__checkbox']} type="checkbox" />
            <label htmlFor="checkbox-limitations" >ограниченная подвижность</label>
        </div>
    )
}

export default CheckboxLimitations