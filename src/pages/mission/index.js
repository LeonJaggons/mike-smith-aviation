import {
    Box,
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
    console.log(isMobile, "MOBILE");
    return (
        <Box my={12}>
            <Stack direction={isMobile ? "column" : "row"} spacing={12}>
                <VStack flex={1}>
                    <Icon
                        as={BiSolidQuoteAltLeft}
                        boxSize={"40px"}
                        color={"gray.400"}
                    />
                    <Text
                        fontFamily={"serif"}
                        textAlign={"center"}
                        lineHeight={2}
                    >
                        Our mission is to always put you first! We go above and
                        beyond your expectations to help you achieve your
                        aviation goals. Mike Smith Aviation fills the need for a
                        customer centric flight school and maintenance facility.
                        General aviation competes with other recreational
                        activities to capture and keep your interest. When you
                        choose to invest in flying it's imperative that you
                        enjoy the experience. Mike Smith Aviation provides a
                        resource rich environment so that your next flight will
                        be safe, comfortable, and fun! Our passion is aviation
                        so we've built a business in which we can share that
                        passion. Your success is our success.
                    </Text>
                    <Icon
                        as={BiSolidQuoteAltRight}
                        boxSize={"40px"}
                        color={"gray.400"}
                    />
                </VStack>
                <Image
                    borderRadius={5}
                    src={"/mission_statement_1.jpg"}
                    w={"full"}
                />
            </Stack>
        </Box>
    );
}

export default index;
