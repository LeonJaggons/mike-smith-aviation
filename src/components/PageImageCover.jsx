import { Box, Button, Heading, Image, Link, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

function PageImageCover({ src, title, sub, isVideo }) {
    const isMobile = useSelector((state) => state.app.isMobile);
    const router = useRouter();
    return (
        <Box position={"relative"}>
            {!isVideo ? (
                <Image
                    userSelect={"none"}
                    draggable={false}
                    w={"100%"}
                    h={"100vh"}
                    src={src}
                    objectFit={"cover"}
                    // objectPosition={"top"}
                    filter={"brightness(40%)"}
                ></Image>
            ) : (
                <Box
                    as={"video"}
                    w={"100%"}
                    h={"100vh"}
                    src={src}
                    objectFit={"cover"}
                    sx={{
                        aspectRatio: 16 / 9,
                    }}
                    autoPlay={"autoplay"}
                    muted
                    filter={"brightness(30%)"}
                />
            )}
            <VStack
                bottom={"300px"}
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
                    mb={2}
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
                    mb={0}
                >
                    {sub}
                </Heading>
                {/* {router.pathname !== "/" && (
                    <Button
                        as={Link}
                        href={"contact"}
                        fontWeight={700}
                        size={"lg"}
                        color={"whiteAlpha.700"}
                        variant={"outline"}
                        borderColor={"whiteAlpha.700"}
                        _hover={{ bg: "whiteAlpha.300" }}
                        zIndex={10000}
                        borderRadius={0}
                    >
                        FIND OUT MORE
                    </Button>
                )} */}
            </VStack>
        </Box>
    );
}

export default PageImageCover;
