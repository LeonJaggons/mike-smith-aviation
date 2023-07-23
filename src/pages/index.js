import PageImageCover from "@/components/PageImageCover";
import { Box, Center, Heading, Image, VStack } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Mike Smith Aviation</title>
                <meta
                    name="description"
                    content="Discover the Skies with Mike Smith Aviation: Premier Flight School in Napa, CA | Expert Flight Lessons, Safety Seminars & Aircraft Rentals"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Center
                    h={"100vh"}
                    w={"100vw"}
                    position={"absolute"}
                    left={0}
                    top={0}
                    zIndex={998}
                >
                    <VStack spacing={1} p={8}>
                        <Heading
                            color={"rgba(255,255,255,.55)"}
                            size={"lg"}
                            letterSpacing={"-1px"}
                            textAlign={"center"}
                        >
                            Welcome to
                        </Heading>
                        <Heading
                            size={"4xl"}
                            color={"white"}
                            letterSpacing={"-2px"}
                            fontWeight={"extrabold"}
                            textAlign={"center"}
                        >
                            Mike Smith Aviation
                        </Heading>
                    </VStack>
                </Center>
                {/* <Heading>More content, announcements, events etc...</Heading> */}
            </main>
        </>
    );
}
