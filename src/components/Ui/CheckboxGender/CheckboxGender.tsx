import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './CheckboxGender.module.scss';

const CheckboxGender = ({ setPassenger, name }: {setPassenger: Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>, name: string}) => {

    const [checkedGender, setCheckedGender] = useState<boolean>(false)

    useEffect(() => {
        setPassenger(prevState => ({ ...prevState, [name]: checkedGender ? "man" : "woman" }));
    }, [checkedGender, name, setPassenger])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {

        const {checked} = e.target;

        setCheckedGender(checked)

        setPassenger(prevState => ({ ...prevState, [name]: checked ? "man" : "woman" }));
    }

    return (
        <div className={styles["input-gender-block"]}>
            <span className={styles["input-gender-block__text"]}>Пол</span>
            <label className={styles["checkbox"]}>
                <input type="checkbox" name={name} onChange={onChange} checked={checkedGender} />
                <span className={styles["checkbox-switch"]} data-label-on="М" data-label-off="Ж"></span>
            </label>
        </div>
    )
}

export default CheckboxGender