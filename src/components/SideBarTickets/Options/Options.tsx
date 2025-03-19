import Option from './Option/Option';
import styles from './Options.module.scss';

const Options = ({ data }: { data: OptionElem[] }) => {

    return (
        <ul className={styles['train-selection-sidebar__options']}>
            {data.map(elem => (
                <li className={styles['option-item']} key={elem.id}>
                    <Option img={elem.img} nameOption={elem.name} status={elem.status} name={elem.nameEng} nameForUrl={elem.nameForUrl} />
                </li>
            ))}
        </ul>
    )
}

export default Options