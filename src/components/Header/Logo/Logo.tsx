import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = ({ logoText }: { logoText: string }) => {

    return (
        <Link to='/' className={`${styles['header-logo']} ${styles['header-logo_container']}`}>
            <h2 className={`${styles['header-logo__title']}`}>
                {logoText}
            </h2>
        </Link>
    )
}

export default Logo