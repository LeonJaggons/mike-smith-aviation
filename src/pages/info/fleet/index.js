import {
    Box,
    Card,
    CardBody,
    Divider,
    HStack,
    Heading,
    Image,
    SimpleGrid,
    Text,
    VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

function index() {
    return (
        <>
            <Head>
                <title>Our Fleet - Mike Smith Aviation</title>
                <meta
                    name="description"
                    content="Explore Our Top-Notch Aircraft Fleet at Mike Smith Aviation: Your Pathway to Safe and Exciting Flying Adventures in Napa, CA"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box>
                <Heading>Our Fleet</Heading>
                <Divider my={6} />
                <Text>
                    Immerse yourself in a collection of top-of-the-line aircraft
                    designed to elevate your flying experience. From sleek and
                    nimble trainers to powerful cross-country cruisers, our
                    diverse selection caters to every aspiring aviator's needs.
                    Take the reins of these high-performance machines and embark
                    on unforgettable skybound journeys under the guidance of our
                    seasoned instructors. Experience the freedom of flight with
                    confidence and style - only at Mike Smith Aviation
                </Text>
                <Divider my={8} />
                <SimpleGrid columns={[1, 1, 2, 3]} spacing={4}>
                    <AircraftCard aircraft={"c172s"} />
                    <AircraftCard aircraft={"c162"} />
                    <AircraftCard aircraft={"c150"} />
                    <AircraftCard aircraft={"be76"} />
                </SimpleGrid>
            </Box>
        </>
    );
}

const AircraftCard = ({ aircraft }) => {
    const imgURL = `/fleet/${aircraft}.jpg`;
    const info = {
        c172s: {
            name: "Cessna 172S",
            description:
                "The Cessna 172S is a popular single-engine, high-wing aircraft widely used in general aviation. Known for its reliability and ease of handling, it can accommodate up to four passengers and is commonly used for flight training, personal transportation, and recreational flying.",
        },
        be76: {
            name: "Beechcraft Duchess",
            description:
                "The Beechcraft Duchess is a twin-engine, four-seat light aircraft with a low-wing design. Renowned for its versatility and stable flight characteristics, it is a popular choice for flight training, private owners, and small charter operations.",
        },
        c150: {
            name: "Cessna 150",
            description:
                "The Cessna 150 is a two-seat, single-engine aircraft known for its simplicity and economical operation. As a widely-used trainer aircraft, it has introduced countless pilots to the world of aviation.",
        },
        c162: {
            name: "Cessna 162",
            description:
                "The Cessna 162 Skycatcher is a two-seat, high-wing light sport aircraft designed for recreational flying and flight training. Featuring modern composite materials and advanced avionics, the Skycatcher offers an efficient and enjoyable flying experience.",
        },
    };
    return (
        <Card overflow={"hidden"} _hover={{ shadow: "lg" }}>
            <Image h={"300px"} w={"full"} objectFit={"cover"} src={imgURL} />
            <CardBody display={"flex"} flexDir={"column"}>
                <Heading alignSelf={"center"} size={"md"}>
                    {info[aircraft].name}
                </Heading>
                {/* <Text fontSize={"sm"}>{info[aircraft].description}</Text> */}
            </CardBody>
        </Card>
    );
};
export default index;
