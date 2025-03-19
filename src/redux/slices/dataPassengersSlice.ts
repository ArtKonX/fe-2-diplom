import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction
} from "@reduxjs/toolkit";

interface Passangers {
    passangers: Passenger[]
}

interface AddPassengerData {
    index: number,
    passanger: Passenger
}

interface Passenger {
    age?: string | undefined;
    series?: string | undefined;
    number?: string | undefined;
}

const initialState = {
    passangers: []
} as unknown as Passangers

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const dataPassengersSlice = createSliceWithThunk({
    name: "dataPassengers",
    initialState,
    selectors: {
        dataPassengers: (state) => state
    },
    reducers: (create) => ({

        addPassengerData: create.reducer((state, action: PayloadAction<AddPassengerData>) => {

            state.passangers[action.payload.index] = action.payload.passanger
        }),
        resetPassengerData: create.reducer((state) => {

            state.passangers = [];
        })
    }),
});

export const { resetPassengerData, addPassengerData } = dataPassengersSlice.actions;
export default dataPassengersSlice.reducer;