import styles from './Footer.module.scss';
import FooterBottom from './FooterBottom/FooterBottom';
import FooterTop from './FooterTop/FooterTop';

const Footer = () => {

    return (
        <div className={styles['footer']} >
            <FooterTop />
            <FooterBottom />
        </div>
    )
}

export default Footer