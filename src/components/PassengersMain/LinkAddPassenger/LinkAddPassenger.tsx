import { Link } from 'react-router-dom';
import styles from './LinkAddPassenger.module.scss';

const LinkAddPassenger = () => {

    return (
        <Link className={styles['link-to-go-selection-places']} to='/selection-places'>
            <span className={styles['link-to-go-selection-places__text']}>Добавить пассажира</span>
            <span className={styles['link-to-go-selection-places__plus']}>+</span>
        </Link>
    )
}

export default LinkAddPassenger