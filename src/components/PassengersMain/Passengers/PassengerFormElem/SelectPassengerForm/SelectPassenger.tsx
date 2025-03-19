import { FC } from 'react';
import './SelectPassenger.scss';
import { Select } from 'antd';

interface Option {
    value: string;
    label: string;
}

interface SelectPassengerProps {
    classNameSelect: string;
    options: Option[];
    activeOption: Option;
    setAge?: (value: string) => void;
    disabled: boolean;
    text?: string;
}

const SelectPassenger: FC<SelectPassengerProps> = ({
    classNameSelect,
    options,
    activeOption,
    setAge,
    disabled,
    text
}) => {
    const handleChange = (value: Option) => {
        if (setAge) {
            setAge(value.value);
        }
    };


    return (
        <div className={classNameSelect}>
            {text && (<span className={`${classNameSelect}__text`}>{text}</span>)}
            <Select
                options={options}
                bordered={true}
                disabled={disabled}
                defaultValue={activeOption}
                value={activeOption}
                onChange={handleChange}
                labelInValue
                popupClassName="filters-select"
            />
        </div>
    );
}

export default SelectPassenger;