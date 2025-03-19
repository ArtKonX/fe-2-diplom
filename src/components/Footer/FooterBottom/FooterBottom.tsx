import Logo from '../../Header/Logo/Logo';
import styles from './FooterBottom.module.scss';
import HashLinkUp from './HashLinkUp/HashLinkUp';

const FooterBottom = () => {

    return (
        <div className={styles['footer-bottom']}>
            <div className={styles['footer-bottom__container']}>
                <Logo logoText='Лого'></Logo>
                <HashLinkUp />
                <span className={styles['footer-bottom__year']}>
                    2018 WEB
                </span>
            </div>
        </div>
    )
}

export default FooterBottom