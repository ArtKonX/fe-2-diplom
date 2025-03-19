import styles from './Header.module.scss';

import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

import pagesInfoTabs from '../../../pagesInfoTabs.json';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import FindTicketsForm from './FindTicketsForm/FindTicketsForm';

const Header = ({ page }: { page: string }) => {

    if (page == 'main') {
        return (
            <header id="header" className={`${styles.header} ${styles[`header-${page}`]}`}>
                <Logo logoText="Лого" />
                <Menu infoTabs={pagesInfoTabs} />
                <div className={`${styles["header__title-and-form"]} ${styles["header__title-and-form_container"]}`}>
                    <HeaderTitle />
                    <FindTicketsForm className={'header-form'} />
                </div>
            </header>
        )
    } else if (page == 'different') {
        return (
            <header id="header" className={`${styles.header} ${styles[`header-${page}`]}`}>
                <Logo logoText="Лого" />
                <Menu infoTabs={pagesInfoTabs} />
                <FindTicketsForm className={'header-form-horizontal'} />
            </header>
        )
    }
}

export default Header