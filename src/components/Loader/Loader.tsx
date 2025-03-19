import styles from './Loader.module.scss';

import loaderGif from '../../assets/gif/loader.gif';

const Loader = () => {

    return (
        <div className={styles["loader-block"]}>
            <h4 className={styles["loader-block__title"]}>
                идет поиск
            </h4>
            <img src={loaderGif} alt='едет поезд' className={styles["loader-block__loader-gif"]} />
        </div>
    )
}

export default Loader