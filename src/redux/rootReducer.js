import appReducer from "./appReducer";

const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    app: appReducer,
});

export default rootReducer;
