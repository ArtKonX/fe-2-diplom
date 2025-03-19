import { Link } from 'react-router-dom';
import styles from './TransitionLink.module.scss';

const TransitionLink = ({id, text, to, disabled}: {id?: string, text: string, to: string, disabled: boolean}) => {

    return (
        <Link id={id} className={`${disabled ? `${styles['link-to-go']} ${styles['link-to-go_disabled']}` : `${styles['link-to-go']}`}`} to={to}>{text}</Link>
    )
}

export default TransitionLink