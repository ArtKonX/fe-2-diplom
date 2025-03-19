import styles from './SuccessOrderHeader.module.scss';

import pagesInfoTabs from '../../../../pagesInfoTabs.json';
import Logo from '../../Header/Logo/Logo';
import Menu from '../../Header/Menu/Menu';

const SuccessOrderHeader = ({page}: {page: string}) => {

    return (
        <header id="header" className={`${styles.header} ${styles[`header-${page}`]}`}>
            <Logo logoText="Лого" />
            <Menu infoTabs={pagesInfoTabs} />
        </header >
    )
}

export default SuccessOrderHeader