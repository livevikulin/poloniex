import { createSlice } from "@reduxjs/toolkit";
import tickersService from "../services/tickers.services";
import { initialState } from "./state";

const tickerSlice = createSlice({
    name: "ticker",
    initialState,
    reducers: {
        updateQuotes(state, action) {
            return {
                ...state,
                quotes: action.payload
            }
        },
        updateErrors(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        updateModals(state, action) {
            return {
                ...state,
                modal: action.payload
            }
        },
        updateLoading(state, action) {
            return {
                ...state,
                isLoading: action.payload
            }
        }
    }
});

const { actions, reducer: tickerReducer } = tickerSlice;
const { updateQuotes, updateErrors, updateModals, updateLoading } = actions;

export const getTickers: any = () => async (dispatch: any, getState: any) => {
    try {
        const data = await tickersService.fetch();
        dispatch(updateQuotes(data));
        dispatch(updateLoading(false));
        dispatch(updateErrors(null));
    } catch (error: any) {
        dispatch(updateErrors(error.message));
    }
}

export const showModal = () => (dispatch: any, getState: any) => {
    dispatch(updateModals(true));
}

export const hideModal = () => (dispatch: any, getState: any) => {
    dispatch(updateModals(false));
}

export default tickerReducer;
