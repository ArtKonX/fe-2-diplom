import { Link } from 'react-router-dom';
import styles from './LinkChange.module.scss';

const LinkChange = ({ onGoind, text, to, classLinkChange }: { onGoind?: () => void, text: string, to: string, classLinkChange?: string }) => {

    return (
        <Link onClick={onGoind} className={`${classLinkChange ? `${styles['link-change']} ${styles[`${classLinkChange}`]}` : `${styles['link-change']}` }`} to={to} >{text}</Link>
    )
}

export default LinkChange