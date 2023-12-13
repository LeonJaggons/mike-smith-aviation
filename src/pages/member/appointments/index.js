import { Box, VStack, HStack, Heading } from "@chakra-ui/react";
import React from "react";

function index() {
    return (
        <Box mt={"54px"}>
            <VStack align={"start"} pt={4}>
                <HStack w={"full"} justify={"space-between"}>
                    <Heading size={"lg"}>Appointments</Heading>
                </HStack>
            </VStack>
        </Box>
    );
}

export default index;
