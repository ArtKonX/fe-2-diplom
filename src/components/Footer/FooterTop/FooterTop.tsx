import Contacts from './Contacts/Contacts';
import styles from './FooterTop.module.scss';

const FooterTop = () => {

    return (
        <div className={styles['footer-top']}>
            <Contacts />
        </div>
    )
}

export default FooterTop