import { useDispatch } from 'react-redux';
import './SelectElem.scss';

import { Select } from 'antd';
import { fetchTrainsByOption, sortTrains } from '../../../../redux/slices/fetchTrainsSlice';
import { AppDispatch } from '../../../../redux/store';

interface options {
    value: string,
    label: string
}

const SelectElem = ({ options, activeOption }: { options: options[], activeOption: string }) => {

    const dispatch = useDispatch<AppDispatch>();

    const handleChange = (e: string) => {
       
        const { value } = e as unknown as { value: string }
        dispatch(sortTrains({ nameSort: value }))
        dispatch(fetchTrainsByOption())
    }

    return (
        <div className={'select-elem'}>
            <Select options={options}
                bordered={false}
                defaultValue={activeOption}
                onChange={handleChange}
                labelInValue
                popupClassName="filters-select" />
        </div>
    )
}

export default SelectElem