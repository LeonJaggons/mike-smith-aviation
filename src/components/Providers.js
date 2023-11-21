import store from "@/redux/store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { Provider } from "react-redux";
import { Arimo, Nunito_Sans, Roboto, Lora} from "next/font/google";
const arimo = Arimo({ weight:"variable", subsets: ["latin"] });
const nunito = Nunito_Sans({
    subsets: ["latin"],
    weight: "variable",
});
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],
});
const lora = Lora({subsets:["latin"], weight:"variable"})
function Providers({ children }) {
    const theme = extendTheme({
        fonts: {
            logo: arimo.style.fontFamily,
            heading: nunito.style.fontFamily,
            body: roboto.style.fontFamily,
            fancy: lora.style.fontFamily
        },
    });
    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>{children}</Provider>
        </ChakraProvider>
    );
}

export default Providers;
