import './Direction.scss';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import axios from 'axios';

import VITE_BACKEND_URL from '../../../environment/environment';

interface DataUserDirectionState {
    directionFrom: string,
    directionThere: string
}

const Direction = ({ directionValue, setDataUserDirection, className, name, placeholder }: { directionValue: string | undefined, setDataUserDirection: Dispatch<SetStateAction<DataUserDirectionState>>, className: string, name: string, placeholder: string }) => {

    const [inputValue, setInputValue] = useState<string | undefined>(directionValue ? directionValue : '');

    const [data, setData] = useState([])

    useEffect(() => { setInputValue(directionValue) }, [directionValue,]);

    const searchHandler = (value: string) => {

        axios.get(`${VITE_BACKEND_URL}/routes/cities?name=${value}`)
            .then(response => {
                const data = response.data.map((city: { name: string }) => ({ value: city.name, label: city.name }));
                setData(data);
            })

            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });

        setInputValue(value);
        setDataUserDirection((prevState: DataUserDirectionState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelect = (value: string) => {
        setInputValue(value);
        setDataUserDirection((prevState: DataUserDirectionState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <AutoComplete
            options={data ? data : []}
            className='direction'
            onSearch={searchHandler}
            onSelect={handleSelect}
            value={inputValue}
            allowClear
        >
            <input
                name={name}
                type="text"
                placeholder={placeholder}
                className={className}
            />
        </AutoComplete>
    )
}

export default Direction