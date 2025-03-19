import styles from './Star.module.scss';
import star from '../../../../../../assets/icons/star.svg'
import starActive from '../../../../../../assets/icons/star-active.svg'

const Star = ({ active, setActive, index }: { active: number, setActive: (active: number) => void, index: number }) => {

    const onActive = () => {
        setActive(index + 1);
    }

    const src = active <= index ? star: starActive;

    return (
        <button onClick={onActive} className={styles['star-btn']}>
            <img className={styles['star']} src={src} alt="звезда" />
        </button>
    )
}

export default Star