type State = {
    quotes: any,
    modal: boolean,
    error: any,
    isLoading: boolean
}

export const initialState: State = {
    quotes: null,
    modal: false,
    error: null,
    isLoading: true
};