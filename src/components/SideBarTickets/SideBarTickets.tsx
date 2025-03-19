import DatesActions from './DatesActions/DatesActions';

import Option1 from '../../assets/icons/Option2.svg';
import Option2 from '../../assets/icons/Option2.svg';
import Option3 from '../../assets/icons/Option3.svg';
import Option4 from '../../assets/icons/Option4.svg';
import Option5 from '../../assets/icons/Option5.svg';
import Option6 from '../../assets/icons/Option6.svg';
import Options from './Options/Options';
import PriceSlider from './PriceSlider/PriceSlider';
import DirectionHidden from './Direction/DirectionHidden/DirectionHidden';

import rightArrow from '../../assets/svg/right-arrow.svg';
import leftArrow from '../../assets/svg/left-arrow.svg';
import LastTickets from './LastTickets/LastTickets';

const OptionsData = [
    {
        id: 1,
        name: 'Купе',
        nameEng: 'secondClass',
        nameForUrl: 'have_second_class',
        img: Option1,
        status: true
    },
    {
        id: 2,
        name: 'Плацкарт',
        nameEng: 'thirdClass',
        nameForUrl: 'have_third_class',
        img: Option2,
        status: false
    },
    {
        id: 3,
        name: 'Сидячий',
        nameEng: 'fourthClass',
        nameForUrl: 'have_fourth_class',
        img: Option3,
        status: false
    },
    {
        id: 4,
        name: 'Люкс',
        nameEng: 'firstClass',
        nameForUrl: 'have_first_class',
        img: Option4,
        status: false
    },
    {
        id: 5,
        name: 'Wi-Fi',
        nameEng: 'wifi',
        nameForUrl: 'have_wifi',
        img: Option5,
        status: true
    },
    {
        id: 6,
        name: 'Экспресс',
        nameEng: 'express',
        nameForUrl: 'have_express',
        img: Option6,
        status: false
    },
]

const SideBarTickets = () => {

    return (
        <div className={'train-selection-sidebar'}>
            <DatesActions />
            <Options data={OptionsData} />
            <PriceSlider />
            <DirectionHidden direction='Туда' img={rightArrow} />
            <DirectionHidden direction='Обратно' img={leftArrow} />
            <LastTickets />
        </div>
    )
}

export default SideBarTickets