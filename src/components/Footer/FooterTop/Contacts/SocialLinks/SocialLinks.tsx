import { Link } from 'react-router-dom';
import styles from './SocialLinks.module.scss';

const SocialLinks = () => {

    return (
        <ul className={styles['social-links']}>
            <li className={styles['social-elem']}>
                <Link to="https://www.youtube.com/" className={`${styles['social-link']} ${styles['social-link_youtube']}`}>
                    <span className={styles['visually-hidden']}>youtube</span>
                </Link>
            </li>
            <li className={styles['social-elem']}>
                <Link to="https://www.linkedin.com/" className={`${styles['social-link']} ${styles['social-link_linkedin']}`}>
                    <span className={styles['visually-hidden']}>linkedin</span>
                </Link>
            </li>
            <li className={styles['social-elem']}>
                <Link to="https://www.google.com/" className={`${styles['social-link']} ${styles['social-link_google']}`}>
                    <span className={styles['visually-hidden']}>google</span>
                </Link>
            </li>
            <li className={styles['social-elem']}>
                <Link to="https://www.facebook.com/" className={`${styles['social-link']} ${styles['social-link_facebook']}`}>
                    <span className={styles['visually-hidden']}>facebook</span>
                </Link>
            </li>
            <li className={styles['social-elem']}>
                <Link to="https://www.twitter.com/" className={`${styles['social-link']} ${styles['social-link_twitter']}`}> 
                    <span className={styles['visually-hidden']}>twitter</span>
                </Link>
            </li>
        </ul>
    )
}

export default SocialLinks