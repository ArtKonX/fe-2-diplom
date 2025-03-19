import styles from './HeadingTop.module.scss';

const HeadingTop = ({ text, classHeading }: { text: string, classHeading: string }) => {

    return (
        <div className={`${styles[`${classHeading}`]}`}>
            <h3 className={`${styles[`${classHeading}__title`]}`}>
                {text}
            </h3>
        </div>
    )
}

export default HeadingTop