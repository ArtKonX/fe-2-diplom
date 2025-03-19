import styles from './ButtonSubmit.module.scss';

const ButtonSubmit = ({ modifierBtnColor, text, disabled }: {modifierBtnColor: string, text: string, disabled?: boolean}) => {

    return (
        <button disabled={disabled} className={`${styles['form-submit-button']} ${styles[`form-submit-button_${modifierBtnColor}`]} `} type='submit'>{text}</button>
    )
}

export default ButtonSubmit