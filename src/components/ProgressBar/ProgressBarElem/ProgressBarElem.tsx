import styles from './ProgressBarElem.module.scss';

const ProgressBarElem = ({ step, id, title, lengthSteps }: { step: number, id: number, title: string, lengthSteps: number }) => {

    const lastProgressBarElemClassIsActive = id == step ? 'progress-bar__item-last-step' : 'progress-bar__item';

    const lastProgressBarElemClass = id == lengthSteps ? 'progress-bar__item-last-elem' : 'progress-bar__item-not-last-elem';

    const progressBarElemClassIsActive = id <= step
        ? `${styles[`${lastProgressBarElemClassIsActive}`]} ${styles[`${lastProgressBarElemClassIsActive + '_active'}`]} ${styles[`${lastProgressBarElemClass}`]} ${styles[`${lastProgressBarElemClass + '_active'}`]}`
        : `${styles[`${lastProgressBarElemClassIsActive}`]} ${styles[`${lastProgressBarElemClass}`]}`;

    return (
        <div className={progressBarElemClassIsActive}>
            <span className={styles['progress-bar__step']}>{id}</span>
            <p className={styles['progress-bar__name']}>{title}</p>
        </div>
    )
}

export default ProgressBarElem