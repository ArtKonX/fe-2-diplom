import styles from './Menu.module.scss';

import { HashLink } from 'react-router-hash-link';

const Menu = ({ infoTabs }: { infoTabs: InfoTab[] }) => {

    return (
        <div className={styles["header-menu"]}>
            <nav className={`${styles['header-nav']} ${styles['header-nav_container']}`}>
                {infoTabs.map(tab => (
                    <li className={styles["header-nav__elem"]} key={tab.to}>
                        <HashLink smooth className={styles["header-nav__link"]} to={tab.to}>{tab.title}</HashLink>
                    </li>
                ))}
            </nav>
        </div>
    )
}

export default Menu