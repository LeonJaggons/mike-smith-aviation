import { Box, Heading, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

function PageImageCover({ src, title, sub }) {
    const isMobile = useSelector((state) => state.app.isMobile);
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
                    size={isMobile ? "sm" : "md"}
                    fontFamily={"cursive"}
                >
                    {sub}
                </Heading>
            </VStack>
        </Box>
    );
}

export default PageImageCover;
