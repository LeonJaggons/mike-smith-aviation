import { Box, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";

function PageImageCover({ src, title, sub }) {
    return (
        <Box position={"relative"}>
            <Image
                userSelect={"none"}
                draggable={false}
                w={"100%"}
                h={"100vh"}
                src={src}
                objectFit={"cover"}
                // objectPosition={"top"}
                filter={"brightness(50%)"}
            ></Image>
            <VStack
                bottom={"350px"}
                alignSelf={"center"}
                alignItems={"center"}
                position={"absolute"}
                spacing={4}
                w={"full"}
                p={6}
            >
                <Heading
                    size={"4xl"}
                    color={"white"}
                    mb={6}
                    letterSpacing={-1}
                    fontWeight={"extrabold"}
                    textAlign={"center"}
                >
                    {title}
                </Heading>
                <Heading
                    textAlign={"center"}
                    color={"white"}
                    size={"sm"}
                    fontFamily={"cursive"}
                >
                    {sub}
                </Heading>
            </VStack>
        </Box>
    );
}

export default PageImageCover;
