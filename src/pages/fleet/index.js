import {
    Box,
    Card,
    HStack,
    Heading,
    Image,
    SimpleGrid,
    VStack,
} from "@chakra-ui/react";
import React from "react";

function index() {
    return (
        <Box>
            <SimpleGrid columns={2}>
                <AircraftCard aircraft={"cessna172"} />
            </SimpleGrid>
        </Box>
    );
}

const AircraftCard = ({ aircraft }) => {
    return (
        <VStack>
            <Card>
                <HStack>
                    <Image
                        boxSize={"350px"}
                        objectFit={"cover"}
                        src={`/${aircraft}.jpg`}
                    />
                </HStack>
            </Card>
        </VStack>
    );
};
export default index;
