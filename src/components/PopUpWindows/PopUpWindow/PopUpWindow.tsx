import styles from './PopUpWindow.module.scss';

import warning from '../../../assets/svg/warning.svg';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../../../redux/slices/fetchTrainsSlice';

const PopUpWindow = ({ statusName, typePopUp, errorTitle, errorMessage, setStatus }: { statusName: string, typePopUp: string, errorTitle: string, errorMessage: string, setStatus: (status: { [x: string]: boolean; }) => void }) => {

    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(changeStatus({statusName: statusName, status: false}))
        setStatus({[statusName]: false});
    }

    return (
        <div className={styles["pop-up-window-container"]}>
            <div className={styles["pop-up-window"]}>
                <div className={`${styles["pop-up-window__top"]} ${styles[`pop-up-window__top_${typePopUp}`]}`}>
                    <img src={warning} alt="Восклицательный знак" className="warning-img" />
                </div>
                <div className={styles["pop-up-window__middle"]}>
                    <h2 className={`${styles["pop-up-window-title"]} ${styles[`pop-up-window-title_${typePopUp}`]}`}>
                        {errorTitle}
                    </h2>
                    <p className={styles["pop-up-window-text"]}>{errorMessage}</p>
                </div>
                <div className={styles["pop-up-window__bottom"]}>
                    <button onClick={onClose} type='button' className={styles['pop-up-window-close']}>Понятно</button>
                </div>
            </div>
        </div>
    )
}

export default PopUpWindow