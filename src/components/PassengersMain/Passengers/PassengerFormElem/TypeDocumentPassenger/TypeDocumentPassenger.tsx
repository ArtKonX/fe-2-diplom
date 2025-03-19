import PassportBlock from './PassportBlock/PassportBlock';
import BirthСertificate from './BirthСertificate/BirthСertificate';
import {Dispatch, SetStateAction } from 'react';

const TypeDocumentPassenger = ({ setPassenger, type, setStatus, isRender, setIsRender }: { setPassenger: Dispatch<SetStateAction<{ phone?: string | undefined; email?: string | undefined; age: string | undefined; series: string | undefined; number: string | undefined; limitations: boolean | undefined; }>>, type: string | undefined, setStatus: Dispatch<SetStateAction<{ lastName: boolean; name: boolean; patronymic: boolean; number: boolean; series: boolean; calendarDateOfBirth: boolean; }>>, isRender: boolean, setIsRender: (isRender: boolean) => void }) => {

    const options = [
        [{
            value: 'pasport',
            label: 'Паспорт РФ',
        }],
        [{
            value: 'birthCertificate',
            label: 'Свидетельство о рождении',
        }],
    ];

    return (
        <>
            {type == 'adults' ? (<PassportBlock isRender={isRender} setIsRender={setIsRender} setPassenger={setPassenger} options={options[0]} setStatus={setStatus} />) : (<BirthСertificate isRender={isRender} setIsRender={setIsRender} setPassenger={setPassenger} options={options[1]} setStatus={setStatus}/>)}
        </>
    )
}

export default TypeDocumentPassenger