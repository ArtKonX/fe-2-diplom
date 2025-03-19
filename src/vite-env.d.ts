/// <reference types="vite/client" />

interface InfoTab {
    title: string,
    to: string
}

interface ProgressBarElem {
    title: string,
    step: number
}

interface OptionElem {
    id: number,
    name: string,
    img: string,
    status: boolean
    nameEng: string,
    nameForUrl: string
}

interface NamesPlace {
    city: string;
    railwayStation: string;
}

interface NameAndDirectionProps {
    img: string,
    nameTrain: string,
    directions: string[],
    currentPlace: string,
    arrTrain: string,
    arrTo: string
}

interface SelectionPlacesLinkOptionsProps {
    conditioning: boolean,
    wifi: boolean,
    express: boolean,
}

interface TrainCardProps {
    total_count: number,
    type?: string,
    min_price: number,
    have_air_conditioning: boolean,
    have_wifi: boolean,
    is_express: boolean,
    departure: {
        id: number | undefined,
        _id: number,
        duration: number,
        from: {
            city: { name: string };
            datetime: number;
            railway_station_name: string
        };
        to: {
            city: { name: string };
            datetime: number;
            duration: number;
            railway_station_name: string
        };
        train: {
            name: string;
            _id: number,
        };
        price_info: {
            fourth: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            },
            third: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            },
            second: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            },
            first: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            }
        }
        have_air_conditioning: boolean,
        have_first_class: boolean,
        is_express: boolean,
        have_wifi: boolean,
        have_third_class: boolean,
        have_second_class: boolean,
        have_fourth_class: boolean,
    };
    arrival: {
        _id?: number,
        duration: number,
        from: {
            city: { name: string };
            datetime: number;
            railway_station_name: string
        };
        to: {
            city: { name: string };
            datetime: number;
            duration: number;
            railway_station_name: string
        };
        train: {
            name: string;
            _id: number,
        };
        price_info: {
            fourth: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            },
            third: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            },
            second: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            },
            first: {
                price: number,
                top_price: number,
                bottom_price: number,
                side_price: number,
            }
        },
        have_air_conditioning: boolean,
        have_first_class: boolean,
        is_express: boolean,
        have_wifi: boolean,
        have_third_class: boolean,
        have_second_class: boolean,
        have_fourth_class: boolean,
    };
    available_seats_info: {
        fourth: number,
        third: number,
        second: number,
        first: number
    }
}

interface TimeAndDirectionProps {
    startNamesPlace: string;
    endNamesPlace: string;
    imgArrow: string;
    times: number[];
    allTime: number;
    startNamesStation: string;
    endNamesStation: string;
}

interface TypeAndPriceProps {
    type: string;
    numberPlaces: number;
    priceDep: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
    };
    prices: {
        price: number,
        top_price: number,
        bottom_price: number,
        side_price: number,
    };
}

interface TypesAndPricesProps {
    availableSeats: {
        fourth: number,
        third: number,
        second: number,
        first: number
    },
    priceDep: {
        fourth: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        },
        third: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        },
        second: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        },
        first: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        }
    },
    prices: {
        fourth: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        },
        third: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        },
        second: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        },
        first: {
            price: number,
            top_price: number,
            bottom_price: number,
            side_price: number,
        }
    }
}

interface Seat {
    index: number;
    available: boolean;
}

interface Coach {
    _id: string;
    available_seats: number;
    bottom_price: number;
    class_type: string;
    have_air_conditioning: boolean;
    is_linens_included: boolean;
    linens_price: number;
    name: string;
    price: number;
    side_price: number;
    top_price: number;
    train: string;
    wifi_price: number;
}

interface CurrentCarriage {
    coach?: Coach;
    seats?: Seat[];
    have_wifi?: boolean
}

interface CurrentTypeInfo {
    id: number;
    img: string;
    imgActive: string;
    name: string;
    nameRus: string;
}

interface TypeOfTrainCarriage {
    coach?: Coach;
    seats?: Seat[];
    id?: number | undefined,
    imgActive?: string | undefined,
    img?: string | undefined,
    typeName?: string | undefined,
    name?: string | undefined,
    currentTypeInfo?: number | undefined,
    nameRus?: string | undefined,
    directions?: {
        [key in string]: {
            currentCarriageList: CurrentCarriage[]
        }
    },
}

interface BoardingPassangesProps {
    currentCarriage: CurrentCarriage[]
    currentTypeInfo: CurrentTypeInfo[];
    typeOfTrainCarriage: { currentCarriage: TypeOfTrainCarriage };
}

interface PriceInfoFrom {
    classPlace: string,
    optionsPrice: [],
    placesPrice: [],
    allPrice: number
}

interface PriceInfoTo {
    classPlace: string,
    optionsPrice: [],
    placesPrice: [],
    allPrice: number
}

interface PriceInfo {
    directions: {passengersAgeAndNumber: {adults: number, children: number, baby: number, all: number}}
    classPlace: string;
    optionsPrice: {name: string, price: number}[];
    placesPrice: number[];
    allPrice: number;
}

type Direction = 'from' | 'to';

interface PricesPayload {
    direction?: Direction;
    directionTrain: 'departure' | 'arrival'
    classPlace?: string;
    option?: optionObj;
    place?: {index: number, price?: number};
    ageNumber?: number,
    ageName?: 'adults' | 'children' | 'baby',
    directionTrain: string
}

interface PlacesPrice {
    index: number,
    price?: number
}

interface OptionPrice {
    name: string
}

interface PriceInfoFrom {
    classPlace?: string;
    optionsPrice: OptionPrice[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PriceInfoTo {
    classPlace?: string;
    optionsPrice: OptionPrice[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PriceInfo {
    from: PriceInfoFrom;
    to: PriceInfoTo;
}

interface PricesState {
    prices: PriceInfo
}

interface TypeOfTrainCarriageState {
    typeOfTrainCarriage: {
        [key in string]: {
            [key in string]: {
                typeOfTrainCarriageList: TypeOfTrainCarriage[]
            }
        }
    },
    currentTypeInfo: {
        [key in string]: {
            [key in string]: {
                currentTypeInfoList: TypeOfTrainCarriage[]
            }
        }
    },
    currentCarriage: {
        [key in string]: {
            [key in string]: {
                currentCarriageList: TypeOfTrainCarriage[]
            }
        }
    };
}

interface AddTypeOfTrainCarriagePayload {
    typeOfTrainCarriage: TypeOfTrainCarriage[];
    currentTypeInfo: TypeOfTrainCarriage;
    direction: string
}

interface AddCurrentCarriagePayload {
    currentCarriage: TypeOfTrainCarriage;
    direction: string
}

interface RemoveCurrentCarriagePayload {
    direction: string
}

interface OptionObj {
    name?: string,
    srcActive: string,
    src: string,
    available: booleang,
    price: number | null | undefined,
    includes: boolean
}

interface SelectedTrain {
    departure: {
        duration: number,
        from: {
            datetime: number,
            city: {
                name: string
            },
            railway_station_name: string
        },
        to: {
            datetime: number,
            city: {
                name: string
            },
            railway_station_name: string
        }
        train: {
            name: string
        }
    },
    arrival: {
        duration: number,
        from: {
            datetime: number,
            city: {
                name: string
            },
            railway_station_name: string
        },
        to: {
            datetime: number,
            city: {
                name: string
            },
            railway_station_name: string
        }
        train: {
            name: string
        }
    }
}

interface TypesOfTrainCarriageState {
    typesOfTrainCarriage: {
        arrival: TypeOfTrainCarriage[],
        departure: TypeOfTrainCarriage[],
    },
    loading: boolean,
    error: string,
    id?: number | undefined,
    imgActive?: string | undefined,
    img?: string | undefined,
    name?: string | undefined,
    nameRus?: string | undefined,
}

interface FetchTypesOfTrainCarriageParams {
    id: number
}

interface ApiRequests {
    type: string,
    payload: {
        city?: string,
        url?: string | undefined,
        to?: string,
        from?: string,
        date?: {from?: string | Dayjs | undefined, to?: string | Dayjs | undefined}[],
        id?: number
    },
    url?: string,
    type: string
}

interface ApiCreateRequest {
    url?: string,
    method: string,
}