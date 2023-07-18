import { Box, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";

function PageImageCover({ src, title, sub }) {
    return (
        <Box position={"relative"}>
            <Image
                userSelect={"none"}
                draggable={false}
                w={"100vw !important"}
                h={"100vh"}
                src={src}
                objectFit={"cover"}
                // objectPosition={"top"}
                filter={"brightness(50%)"}
            ></Image>
            <VStack
                bottom={"350px"}
                alignSelf={"center"}
                position={"absolute"}
                spacing={4}
                w={"full"}
            >
                <Heading size={"2xl"} color={"white"}>
                    {title}
                </Heading>
                <Heading color={"white"} size={"md"} fontFamily={"cursive"}>
                    {sub}
                </Heading>
            </VStack>
        </Box>
    );
}

export default PageImageCover;
