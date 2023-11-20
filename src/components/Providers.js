import store from "@/redux/store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";
import { Inter, Nunito_Sans, Roboto } from "next/font/google";
const inter = Inter({ weight: ["800"], subsets: ["latin"] });
const nunito = Nunito_Sans({
    subsets: ["latin"],
    weight: "variable",
});
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});
function Providers({ children }) {
    const theme = extendTheme({
        fonts: {
            logo: inter.style.fontFamily,
            heading: nunito.style.fontFamily,
            body: roboto.style.fontFamily,
        },
    });
    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>{children}</Provider>
        </ChakraProvider>
    );
}

export default Providers;
