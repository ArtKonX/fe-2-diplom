import {
    buildCreateSlice,
    asyncThunkCreator,
    PayloadAction
} from "@reduxjs/toolkit";

const initialState = {
    selectedTrain: [],
} as {selectedTrain: TrainCardProps[]}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const selectedTrainSlice = createSliceWithThunk({
    name: "selectedTrain",
    initialState,
    selectors: {
        selectTrainState: (state) => state
    },
    reducers: (create) => ({
        addSelectTrain: create.reducer((state, action: PayloadAction<{selectedTrain: TrainCardProps}>) => {

            state.selectedTrain.push(action.payload.selectedTrain)
        }),

        resetSelectTrain: create.reducer((state) => {
            state.selectedTrain = []
        }),
    }),
});

export const { addSelectTrain, resetSelectTrain } = selectedTrainSlice.actions;
export default selectedTrainSlice.reducer;