import {
    Box,
    Button,
    Center,
    Heading,
    Image,
    Link,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

function PageImageCover({ src, title, sub, isVideo }) {
    const isMobile = useSelector((state) => state.app.isMobile);
    const router = useRouter();
    return (
        <Box
            position={"relative"}
            h={isVideo ? "100vh" : "calc(65vh - 88px)"}
            mt={!isVideo && "88px"}
        >
            {!isVideo ? (
                <Image
                    userSelect={"none"}
                    draggable={false}
                    w={"100%"}
                    h={"100%"}
                    src={src}
                    objectFit={"cover"}
                    filter={"grayscale(.1) brightness(40%)"}
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
                    loop
                    autoPlay={"autoplay"}
                    muted
                    filter={"brightness(40%)"}
                />
            )}
            <Center
                alignSelf={"center"}
                alignItems={"center"}
                position={"absolute"}
                spacing={4}
                top={0}
                left={0}
                w={"full"}
                h={"full"}
                flexDirection={"column"}
                p={6}
            >
                <Heading
                    size={"3xl"}
                    color={"white"}
                    mb={8}
                    letterSpacing={1}
                    fontWeight={900}
                    fontFamily={"heading"}
                    textAlign={"center"}
                    textTransform={"uppercase"}
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
            </Center>
        </Box>
    );
}

export default PageImageCover;
