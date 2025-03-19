import { ChangeEvent } from 'react';
import styles from './InputName.module.scss';

const InputName = ({  nameData, value, onChange, classNameInput, placeholderLength }: { nameData: { name: string, nameRus: string }, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, classNameInput: string, placeholderLength?: number }) => {

    const createPlaceholderWithInput = (inputValue: string, length: number) => {
        const inputChars = inputValue?.split('');
        return Array.from({ length }, (_, i) => i < inputChars?.length ? inputChars[i] : '_').join('');
    }

    return (
        <label className={`${styles["name-input-block"]} ${styles[`${classNameInput}-input-block`]}`}>
            {nameData.nameRus}
            <input className={styles['name-input-block__input']} type="text" onChange={onChange} name={nameData.name} value={value} placeholder={createPlaceholderWithInput(value, placeholderLength ? placeholderLength : 0)} maxLength={placeholderLength}/>
        </label>
    )
}

export default InputName