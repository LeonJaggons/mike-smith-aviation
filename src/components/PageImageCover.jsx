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

function PageImageCover({ src, title, sub, isVideo, isFull }) {
    const isMobile = useSelector((state) => state.app.isMobile);
    const router = useRouter();
    return (
        <Box
            position={"relative"}
            w={"100vw"}
            maxW={"100vw"}
            overflowX={"hidden"}
            h={isVideo || isFull ? "100vh" : "60vh"}
            // mt={!isVideo && "88px"}
        >
            {!isVideo ? (
                <Image
                    userSelect={"none"}
                    draggable={false}
                    w={"100%"}
                    h={"100%"}
                    src={src}
                    objectFit={"cover"}
                    objectPosition={
                        src === "cover.jpeg" ? "right bottom" : "unset"
                    }
                    filter={`grayscale(.3) brightness(${
                        isFull ? "50%" : "40%"
                    })`}
                ></Image>
            ) : (
                <Box
                    as={"video"}
                    w={"100vw"}
                    h={"100vh"}
                    src={src}
                    objectFit={"cover"}
                    sx={{
                        aspectRatio: 16 / 9,
                    }}
                    loop
                    autoPlay={"autoplay"}
                    muted
                    filter={"brightness(55%)"}
                />
            )}
            <VStack
                alignSelf={"center"}
                alignItems={["center", "center", "flex-start"]}
                justify={"flex-end"}
                position={"absolute"}
                spacing={4}
                top={0}
                left={0}
                w={"full"}
                h={"full"}
                flexDirection={"column"}
                px={["5%", "8%", "10%"]}
                pb={12}
                textAlign={["center", "center", "start"]}
            >
                <Heading
                    size={isMobile ? "xl" : ["3xl"]}
                    color={"white"}
                    letterSpacing={1}
                    fontWeight={900}
                    fontFamily={"heading"}
                    textAlign={"center"}
                    textTransform={"uppercase"}
                    mb={2}
                >
                    {title}
                </Heading>
                <Heading
                    textAlign={"center"}
                    color={"white"}
                    size={"xs"}
                    fontFamily={"fancy"}
                    mb={0}
                    lineHeight={1.8}
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
