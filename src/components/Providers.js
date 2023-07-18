import store from "@/redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";

function Providers({ children }) {
    return (
        <ChakraProvider>
            <Provider store={store}>{children}</Provider>
        </ChakraProvider>
    );
}

export default Providers;
