import { Link } from 'react-router-dom';
import styles from './ContactsList.module.scss';

const ContactsList = () => {

    return (
        <ul className={styles['contacts__list']}>
            <li className={styles['contact']}>
                <Link to='tel:+88000000000' className={styles['contact__link']}><span className={`${styles['contact__icon']} ${styles['contact__icon_phone']}`} /> 8 (800) 000 00 00</Link>
            </li>
            <li className={styles['contact']}>
                <Link to="mailto:inbox@mail.ru" className={styles['contact__link']}><span className={`${styles['contact__icon']} ${styles['contact__icon_letter']}`} /> inbox@mail.ru</Link>
            </li>
            <li className={styles['contact']}>
                <Link to="skype:tu.train.tickets" className={styles['contact__link']}><span className={`${styles['contact__icon']} ${styles['contact__icon_skype']}`} /> tu.train.tickets</Link>
            </li>
            <li className={styles['contact']}>
                <div className={styles['contact__position']}>
                    <span className={`${styles['contact__icon']} ${styles['contact__icon_geoposition']}`} />
                    г. Москва
                    <br />
                    ул. Московская 27-35
                    <br />
                    555 555
                </div>
            </li>
        </ul>
    )
}

export default ContactsList