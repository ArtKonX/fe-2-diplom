import { configureStore } from "@reduxjs/toolkit";

import selectedTrainSlice from "../slices/selectedTrainSlice";
import typesOfTrainCarriageSlice from "../slices/typesOfTrainCarriageSlice";
import typeOfTrainCarriageSlice from "../slices/typeOfTrainCarriageSlice";
import pricesSlice from "../slices/pricesSlice";
import createSagaMiddleware from "redux-saga";
import fetchTrainsSlice from "../slices/fetchTrainsSlice";
import saga from "../sagas";
import dataPassengersSlice from "../slices/dataPassengersSlice";
import personalDataSlice from "../slices/personalDataSlice";
import dataPassengersOrderSlice from "../slices/dataPassengersOrderSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    fetchTrains: fetchTrainsSlice,
    prices: pricesSlice,
    selectedTrain: selectedTrainSlice,
    typesOfTrainCarriage: typesOfTrainCarriageSlice,
    typeOfTrainCarriage: typeOfTrainCarriageSlice,
    dataPassengers: dataPassengersSlice,
    personalData: personalDataSlice,
    dataPassengersOrder: dataPassengersOrderSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;