import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "./middleware/logger";
import { thunk } from "./middleware/thunk";
import tickerReducer from "./tickers";

const middlewareEnhancer = applyMiddleware(logger, thunk);

function configureStore() {
    return createStore(
        tickerReducer,
        compose(
            middlewareEnhancer,
            // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            // @ts-ignore
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}

export default configureStore;
