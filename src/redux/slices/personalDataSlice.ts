import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction
} from "@reduxjs/toolkit";

interface Passenger {
    phone: string,
    email: string,
    lastName: string,
    name: string,
    patronymic: string,
    cash: boolean,
    online: boolean
}

interface PersonalDataState {
    personalData: Passenger[]
}

interface AddPersonalDataPayload {
    personalData: Passenger
}

const initialState = {
    personalData: [],
} as PersonalDataState

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const personalDataSlice = createSliceWithThunk({
    name: "personalData",
    initialState,
    selectors: {
        dataUser: (state) => state
    },
    reducers: (create) => ({
        addPersonalData: create.reducer((state, action: PayloadAction<AddPersonalDataPayload>) => {
            state.personalData = [action.payload.personalData];
        }),
        resetPersonalData: create.reducer((state) => {
            state.personalData = [];
        }),
    }),
});

export const { resetPersonalData, addPersonalData } = personalDataSlice.actions;
export default personalDataSlice.reducer;