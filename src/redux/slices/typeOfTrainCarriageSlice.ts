import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction
} from "@reduxjs/toolkit";

const initialState: TypeOfTrainCarriageState = {
    typeOfTrainCarriage: {
        directions: {
            departure: {
                typeOfTrainCarriageList: []
            },
            arrival: {
                typeOfTrainCarriageList: []
            }
        }
    },
    currentTypeInfo: {
        directions: {
            departure: {
                currentTypeInfoList: []
            },
            arrival: {
                currentTypeInfoList: []
            }
        }
    },
    currentCarriage: {
        directions: {
            departure: {
                currentCarriageList: []
            },
            arrival: {
                currentCarriageList: []
            }
        }
    },
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const typeOfTrainCarriageSlice = createSliceWithThunk({
    name: "typeOfTrainCarriageSlice",
    initialState,
    selectors: {
        typeOfTrainCarriageState: (state) => state
    },
    reducers: (create) => ({
        addTypeOfTrainCarriage: create.reducer((state, action: PayloadAction<AddTypeOfTrainCarriagePayload>) => {
            state.typeOfTrainCarriage.directions[action.payload.direction].typeOfTrainCarriageList = [];
            state.currentTypeInfo.directions[action.payload.direction].currentTypeInfoList = [];
            if (state.currentTypeInfo) state.typeOfTrainCarriage.directions[action.payload.direction].typeOfTrainCarriageList = [...action.payload.typeOfTrainCarriage];
            if (state.currentTypeInfo) state.currentTypeInfo.directions[action.payload.direction].currentTypeInfoList = [action.payload.currentTypeInfo];
        }),
        addCurrentCarriage: create.reducer((state, action: PayloadAction<AddCurrentCarriagePayload>) => {
            if (state.currentTypeInfo) state.currentCarriage.directions[action.payload.direction].currentCarriageList = [];
            state.currentCarriage.directions[action.payload.direction].currentCarriageList = [action.payload.currentCarriage];
        }),
        removeCurrentCarriage: create.reducer((state, action: PayloadAction<RemoveCurrentCarriagePayload>) => {
            state.currentCarriage.directions[action.payload.direction].currentCarriageList = [];
        }),
        resetTypeOfTrainCarriageSlice: create.reducer((state) => {
            state.typeOfTrainCarriage = {
                directions: {
                    departure: {
                        typeOfTrainCarriageList: []
                    },
                    arrival: {
                        typeOfTrainCarriageList: []
                    }
                }
            };
            state.currentTypeInfo = {
                directions: {
                    departure: {
                        currentTypeInfoList: []
                    },
                    arrival: {
                        currentTypeInfoList: []
                    }
                }
            };
            state.currentCarriage = {
                directions: {
                    departure: {
                        currentCarriageList: []
                    },
                    arrival: {
                        currentCarriageList: []
                    }
                }
            };
        })
    }),
});

export const { resetTypeOfTrainCarriageSlice, addTypeOfTrainCarriage, addCurrentCarriage, removeCurrentCarriage } = typeOfTrainCarriageSlice.actions;
export default typeOfTrainCarriageSlice.reducer;