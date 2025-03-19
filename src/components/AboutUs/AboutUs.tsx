import styles from './AboutUs.module.scss';
import AboutUsText from './AboutUsText/AboutUsText';
import Warning from './Warning/Warning';

const AboutUs = () => {

    return (
        <div id='about-us' className={styles['about-us']}>
            <div className={styles['about-us__container']}>
                <h2 className={styles["about-us__title"]}>о нас</h2>
                <div className={styles['about-us__information']}>
                    <AboutUsText />
                    <Warning />
                </div>
            </div>
        </div >
    )
}

export default AboutUs