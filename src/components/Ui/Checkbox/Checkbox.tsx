import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({ passenger, setPassenger, name, children, classCheckbox, id }: { passenger?: {[key in string]: boolean}, setPassenger?: Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>, name: string, children: ReactNode, classCheckbox: string, id: number }) => {

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target

        if (name === 'online') {
            if (checked && setPassenger) {
                setPassenger?.(prevState => ({ ...prevState, online: true, cash: false }));
            }
        }

        if (name === 'cash') {
            if (checked && setPassenger) {
                setPassenger?.(prevState => ({ ...prevState, cash: true, online: false }));
            }
        }

        if (name === 'limitations' && setPassenger) {
            setPassenger(prevState => ({...prevState, [name]: checked}))
        }
    }

    return (
        <div className={`${styles[`checkbox-${classCheckbox}`]}`}>
            <input checked={passenger && passenger[name]} onChange={onChange} className={`${styles[`checkbox-${classCheckbox}__checkbox`]}`} id={classCheckbox + id} type="checkbox" />
            {children}
        </div>
    )
}

export default Checkbox