import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

function Providers({ children }) {
    return <ChakraProvider>{children}</ChakraProvider>;
}

export default Providers;
