import {
    Box,
    Divider,
    HStack,
    Heading,
    Icon,
    Image,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";
import { useSelector } from "react-redux";

function index() {
    const isMobile = useSelector((state) => state.app.isMobile);
    return (
        <>
            <Head>
                <title>Mission Statement - Mike Smith Aviation</title>
                <meta
                    name="description"
                    content="Empowering Aspiring Aviators at Mike Smith Aviation: Unleashing Passion for Flying through Expert Training & Safety Excellence | Napa, CA Flight School"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box>
                <Stack
                    direction={
                        isMobile
                            ? "column-reverse"
                            : ["column", "column", "column", "row"]
                    }
                    spacing={12}
                >
                    <Box flex={1}>
                        <Text textAlign={"start"}>
                            Our mission is to always put you first! We go above
                            and beyond your expectations to help you achieve
                            your aviation goals. Mike Smith Aviation fills the
                            need for a customer centric flight school and
                            maintenance facility. General aviation competes with
                            other recreational activities to capture and keep
                            your interest.
                        </Text>
                        <Text textAlign={"start"} mt={4}>
                            When you choose to invest in flying it's imperative
                            that you enjoy the experience. Mike Smith Aviation
                            provides a resource rich environment so that your
                            next flight will be safe, comfortable, and fun! Our
                            passion is aviation so we've built a business in
                            which we can share that passion. Your success is our
                            success.
                        </Text>
                        <Box mt={6}>
                            <Text>Mike Smith, Owner</Text>
                            <Text>Mike Smith Aviation </Text>
                        </Box>
                    </Box>
                    <Box w={isMobile ? "full" : ["full", "full", "30%"]}>
                        <Image
                            borderRadius={5}
                            src={"/mission1.jpg"}
                            w={"full"}
                            h={"full"}
                            // flex={!isMobile && 1}

                            mb={2}
                            objectFit={"cover"}
                        />
                        {/* <Image
                            borderRadius={5}
                            src={"/mission2.jpg"}
                            w={"full"}
                            h={"50%"}
                            // flex={!isMobile && 1}

                            objectFit={"cover"}
                        /> */}
                    </Box>
                </Stack>
            </Box>
        </>
    );
}

export default index;
