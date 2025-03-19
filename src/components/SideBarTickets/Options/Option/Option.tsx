import Checkbox from './Checkbox/Checkbox';
import styles from './Options.module.scss';

const Option = ({ img, nameOption, status, name, nameForUrl }: { img: string, nameOption: string, status: boolean, name: string, nameForUrl: string }) => {

    return (
        <div className={styles['option']}>
            <img src={img} alt={nameOption} className={styles['option__img']} />
            <p className={styles['option__name']}>{nameOption}</p>
            <Checkbox status={status} name={name} nameForUrl={nameForUrl}/>
        </div>
    )
}

export default Option