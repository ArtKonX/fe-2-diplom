import styles from './ProgressBar.module.scss';
import infoProgressBar from '../../../infoProgressBar.json';
import ProgressBarElem from './ProgressBarElem/ProgressBarElem';

const ProgressBar = ({ step }: { step: number }) => {

    return (
        <ul className={styles['progress-bar']}>
            {infoProgressBar.map((elem, indx) => (<li className={styles['progress-bar__elem']} key={indx}>
                <ProgressBarElem lengthSteps={infoProgressBar.length} step={step} id={elem.step} title={elem.title} />
            </li>
            ))}
        </ul>
    )
}

export default ProgressBar