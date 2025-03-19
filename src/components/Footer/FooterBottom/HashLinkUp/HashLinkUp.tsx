import { HashLink } from 'react-router-hash-link';
import styles from './HashLinkUp.module.scss';
import linkUp from '../../../../assets/svg/link-up.svg';

const HashLinkUp = () => {

    return (
        <div className={styles['footer-bottom__link-up-block']}>
            <HashLink smooth className={styles['link-up']} to='#header'><img className={styles['link-up__image']} src={linkUp} alt="стрелка навкрх" /></HashLink>
        </div>
    )
}

export default HashLinkUp