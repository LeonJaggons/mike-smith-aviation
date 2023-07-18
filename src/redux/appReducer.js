const appState = {
    appTitle: "Mike Smith Aviation",
    isSignedIn: false,
    user: null,
    documents: [],
};

const appReducer = (state = appState, action) => {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                [action.attr]: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
export default appReducer;
