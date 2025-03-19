import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction
} from "@reduxjs/toolkit";

interface PriceInfoDirection {
    classPlace: string;
    optionsPrice: { name: string, price: number }[];
    placesPrice: PlacesPrice[];
    allPrice: number;
}

interface PassengersAgeAndNumber {
    adults?: number,
    children?: number,
    baby?: number,
    all?: number
}

interface PriceInfo {
    directions: {
        ['departure']: {
            direction: PriceInfoDirection;
        },
        ['arrival']: {
            direction: PriceInfoDirection;
        },
        passengersAgeAndNumber: PassengersAgeAndNumber;
    },
    render: boolean
}

const direction: PriceInfoDirection = {
    classPlace: '',
    optionsPrice: [],
    placesPrice: [],
    allPrice: 0
};

const passengersAgeAndNumber: PassengersAgeAndNumber = {
    adults: 2,
    children: 1,
    baby: 0,
    all: 3
}

const initialState: PriceInfo = {
    directions: {
        departure: {
            direction,
        },
        arrival: {
            direction,
        },
        passengersAgeAndNumber
    },
    render: false
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const pricesSlice = createSliceWithThunk({
    name: "prices",
    initialState,
    selectors: {
        priceState: (state) => state
    },
    reducers: (create) => ({

        addPassengersAgeAndNumber: create.reducer((state, action: PayloadAction<PricesPayload>) => {

            const directionStateData = state.directions;

            if (action.payload.ageName) {
                directionStateData.passengersAgeAndNumber[action.payload.ageName] = action.payload.ageNumber;
            }

            directionStateData.passengersAgeAndNumber.all =
                (directionStateData.passengersAgeAndNumber.adults ?? 0) +
                (directionStateData.passengersAgeAndNumber.children ?? 0) +
                (directionStateData.passengersAgeAndNumber.baby ?? 0);

            state.render = !state.render
        }),
        addOption: create.reducer((state, action: PayloadAction<PricesPayload>) => {
            if (action.payload.directionTrain) state.directions[action.payload.directionTrain].direction.optionsPrice.push(action.payload.option);
            if (action?.payload?.option?.price && action.payload.directionTrain) state.directions[action.payload.directionTrain].direction.allPrice += action.payload.option.price;
        }),
        removeOption: create.reducer((state, action: PayloadAction<PricesPayload>) => {
            if (action.payload.directionTrain) state.directions[action.payload.directionTrain].direction.optionsPrice = state.directions[action.payload.directionTrain].direction.optionsPrice.filter(option => option.name !== action.payload.option?.name);
            if (action?.payload?.option?.price && action.payload.directionTrain) state.directions[action.payload.directionTrain].direction.allPrice -= action.payload.option.price;
        }),
        addPlace: create.reducer((state, action: PayloadAction<PricesPayload>) => {
            if (action.payload.directionTrain && action.payload.place) state.directions[action.payload.directionTrain].direction.placesPrice.push(action.payload.place);
            if (action.payload.directionTrain && action.payload.place?.price) state.directions[action.payload.directionTrain].direction.allPrice += action.payload.place.price;
        }),
        removePlace: create.reducer((state, action: PayloadAction<PricesPayload>) => {
            if (action.payload.directionTrain) {
                const direction = state.directions?.[action.payload.directionTrain]?.direction;
                if (direction) {
                    const price = direction.placesPrice.find(place => place.index === action.payload.place?.index)?.price;
                    if (price !== undefined) {
                        direction.placesPrice = direction.placesPrice.filter(place => place.index !== action.payload.place?.index);
                        direction.allPrice -= price;
                    }
                }
            }
        }),
        removeBabyWithoutPlace: create.reducer((state) => {
            if (state.directions?.passengersAgeAndNumber?.baby && state.directions.passengersAgeAndNumber.all) {
                state.directions.passengersAgeAndNumber.baby--;
                state.directions.passengersAgeAndNumber.all--;
            }
        }),
        resetPrice: create.reducer((state) => {
            state.directions.departure.direction.classPlace = '';
            state.directions.departure.direction.optionsPrice = [];
            state.directions.departure.direction.placesPrice = [];
            state.directions.departure.direction.allPrice = 0;

            state.directions.arrival.direction.classPlace = '';
            state.directions.arrival.direction.optionsPrice = [];
            state.directions.arrival.direction.placesPrice = [];
            state.directions.arrival.direction.allPrice = 0;
        })
    }),
});

export const { removeBabyWithoutPlace, addPassengersAgeAndNumber, addOption, removeOption, addPlace, removePlace, resetPrice } = pricesSlice.actions;
export default pricesSlice.reducer;