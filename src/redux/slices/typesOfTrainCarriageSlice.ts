import {
    buildCreateSlice,
    asyncThunkCreator
} from "@reduxjs/toolkit";
import apiRequests from "../../api/apiRequests";

const initialState = {
    typesOfTrainCarriage: {
        arrival: [],
        departure: [],
    },
    loading: false,
    error: ''
} as TypesOfTrainCarriageState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const typesOfTrainCarriageSlice = createSliceWithThunk({
    name: "typesOfTrainCarriage",
    initialState,
    selectors: {
        typesOfTrainCarriageState: (state) => state
    },
    reducers: (create) => ({
        removeTypesOfTrainCarriage: create.reducer((state) => {
            state.typesOfTrainCarriage = {
                arrival: [],
                departure: []
            };
        }),
        fetchTypesOfTrainCarriageArrival: create.asyncThunk<TypesOfTrainCarriageState[], FetchTypesOfTrainCarriageParams>(
            async (params, { rejectWithValue }) => {
                try {

                    const { id } = params;

                    const response = await apiRequests({
                        type: 'fetchTypesOfTrainCarriage',
                        payload: {
                            url: `${import.meta.env.API_ROOT}/routes`,
                            id: id
                        }
                    });

                    return response;
                } catch (e) {
                    return rejectWithValue(e);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state, action) => {

                    state.typesOfTrainCarriage.arrival = action.payload;
                    state.error = "";
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                },
                settled: (state) => {
                    state.loading = false;
                },
            }
        ),
        fetchTypesOfTrainCarriageDeparture: create.asyncThunk<TypesOfTrainCarriageState[], FetchTypesOfTrainCarriageParams>(
            async (params, { rejectWithValue }) => {
                try {

                    const { id } = params;

                    const response = await apiRequests({
                        type: 'fetchTypesOfTrainCarriage',
                        payload: {
                            url: `${import.meta.env.API_ROOT}/routes`,
                            id: id
                        }
                    });

                    return response;
                } catch (e) {
                    return rejectWithValue(e);
                }
            },
            {
                pending: (state) => {
                    state.loading = true;
                    state.error = "";
                },
                fulfilled: (state, action) => {

                    state.typesOfTrainCarriage.departure = action.payload;
                    state.error = "";
                },
                rejected: (state, action) => {
                    state.error = action.payload as string;
                },
                settled: (state) => {
                    state.loading = false;
                },
            }
        ),
        resetTypesOfTrainCarriage: create.reducer((state) => {
            state.typesOfTrainCarriage = {
                arrival: [],
                departure: [],
            };
            state.loading = false;
            state.error = '';
        }),
    }),
});

export const { resetTypesOfTrainCarriage, removeTypesOfTrainCarriage, fetchTypesOfTrainCarriageDeparture, fetchTypesOfTrainCarriageArrival } = typesOfTrainCarriageSlice.actions;
export default typesOfTrainCarriageSlice.reducer;