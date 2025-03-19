import { useState } from 'react';
import styles from './DirectionHidden.module.scss';
import DirectionAll from '../DirectionAll/DirectionAll';

const DirectionHidden = ({ direction, img}: { direction: string, img: string}) => {

    const [switchState, setSwitchState] = useState<boolean>(false);

    const switchDirection = () => {
        setSwitchState(!switchState)
    }

    return (
        <div className={styles["direction"]}>
            <div className={styles["direction__demo"]}>
                <div className={styles["direction__img-name"]}>
                    <img src={img} alt="картинка с направлением" className={styles['direction__img']} />
                    <h3 className={styles['direction__name']}>{direction}</h3>
                </div>
                <button onClick={switchDirection} className={styles['direction__action']}><span className={styles['direction__action-text']}>{switchState ? '-' : '+'}</span></button>
            </div>
            {switchState && <DirectionAll direction={direction}/>}
        </div>
    )
}

export default DirectionHidden