import {
    Box,
    Card,
    CardBody,
    HStack,
    Heading,
    Image,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";

function index() {
    return (
        <Box>
            <SimpleGrid columns={[1, 1, 2, 2]} spacing={2}>
                <AircraftCard aircraft={"c172s"} />
                <AircraftCard aircraft={"c162"} />
                <AircraftCard aircraft={"c150"} />
                <AircraftCard aircraft={"be76"} />
            </SimpleGrid>
        </Box>
    );
}

const AircraftCard = ({ aircraft }) => {
    const imgURL = `/fleet/${aircraft}.jpg`;
    const descriptions = {
        c172s: "The Cessna 172S is a popular single-engine, high-wing aircraft widely used in general aviation. Known for its reliability and ease of handling, it can accommodate up to four passengers and is commonly used for flight training, personal transportation, and recreational flying. Its robust design and steady performance make it a trusted choice among pilots worldwide.",
        be76: "The Beechcraft Duchess is a twin-engine, four-seat light aircraft with a low-wing design. Renowned for its versatility and stable flight characteristics, it is a popular choice for flight training, private owners, and small charter operations. With its spacious cabin and advanced avionics, the Duchess offers a comfortable and reliable platform for various aviation missions.",
        c150: "The Cessna 150 is a two-seat, single-engine aircraft known for its simplicity and economical operation. As a widely-used trainer aircraft, it has introduced countless pilots to the world of aviation. With its sturdy construction and easy-to-handle controls, the Cessna 150 remains a cherished classic in the general aviation community.",
        c162: "The Cessna 162 Skycatcher is a two-seat, high-wing light sport aircraft designed for recreational flying and flight training. Featuring modern composite materials and advanced avionics, the Skycatcher offers an efficient and enjoyable flying experience. With its spacious cockpit and responsive handling, it has gained popularity among pilots seeking an accessible entry into the world of aviation.",
    };
    return (
        <Card>
            <Image h={"300px"} w={"full"} objectFit={"cover"} src={imgURL} />
            <CardBody>
                <Text fontSize={12}>{descriptions[aircraft]}</Text>
            </CardBody>
        </Card>
    );
};
export default index;
