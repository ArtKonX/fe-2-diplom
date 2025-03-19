import styles from './Contacts.module.scss';

import ContactsList from './ContactsList/ContactsList';
import SocialLinks from './SocialLinks/SocialLinks';
import Subscribe from './Subscribe/Subscribe';

const Contacts = () => {

    return (
        <div id='contacts' className={styles['contacts-block']}>
            <div className={styles['contacts-block__container']}>
                <div className={styles['contacts']}>
                    <h3 className={styles["contacts__title"]}>
                        Свяжитесь с нами
                    </h3>
                    <ContactsList />
                </div>
                <div className={styles['subscribe']}>
                    <h3 className={styles['subscribe__title']}>Подписка</h3>
                    <Subscribe />
                    <h3 className={styles['subscribe__title-social']}>Подписывайтесь на нас</h3>
                    <SocialLinks />
                </div>
            </div>
        </div>
    )
}

export default Contacts