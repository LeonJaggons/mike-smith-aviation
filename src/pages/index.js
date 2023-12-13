import { SocialBar } from "@/components/NavBar";
import PageImageCover from "@/components/PageImageCover";
import {
    Box,
    Button,
    Center,
    HStack,
    Heading,
    Icon,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
    MdAirplanemodeActive,
    MdCircle,
    MdFlightTakeoff,
} from "react-icons/md";
import { AccoladesBar } from "./_app";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
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
                <VStack
                    spacing={1}
                    alignItems={["center", "center", "start"]}
                    justify={"center"}
                    h={"100vh"}
                    w={["100vw", "100vw", "65vw"]}
                    position={"absolute"}
                    left={0}
                    top={0}
                    zIndex={998}
                    px={["5%", "8%", "10%"]}
                    textAlign={["center", "center", "start"]}
                >
                    <Heading
                        size={"3xl"}
                        color={"white"}
                        letterSpacing={-1}
                        fontWeight={800}
                        mb={4}
                        fontFamily={"logo"}
                    >
                        Learn to Fly in Napa
                    </Heading>
                    <HStack color={"rgba(255,255,255,.75)"} mb={8}>
                        <Heading
                            fontSize={"28px"}
                            size={"lg"}
                            letterSpacing={"-1px"}
                            textAlign={"center"}
                            fontWeight={700}
                        >
                            Career
                        </Heading>
                        <Icon as={MdCircle} size={"xs"} boxSize={"8px"} />
                        <Heading
                            fontSize={"28px"}
                            size={"lg"}
                            letterSpacing={"-1px"}
                            textAlign={"center"}
                            fontWeight={700}
                        >
                            Enrichment
                        </Heading>
                        <Icon as={MdCircle} size={"xs"} boxSize={"8px"} />
                        <Heading
                            fontSize={"28px"}
                            size={"lg"}
                            letterSpacing={"-1px"}
                            textAlign={"center"}
                            fontWeight={700}
                        >
                            Accelerated
                        </Heading>
                    </HStack>
                    <Text
                        mt={0}
                        mb={8}
                        fontWeight={400}
                        lineHeight={2}
                        color={"rgba(255,255,255,.95)"}
                    >
                        Unleash your potential and take to the skies with Mike
                        Smith Aviation. Join us in Napa, CA, and let your
                        aviation journey take flight. Enroll today and soar to
                        new heights with the best in the business!
                    </Text>
                    {/* <Box my={8}>
                        <AccoladesBar />
                    </Box> */}
                    <Button
                        as={Link}
                        size={"lg"}
                        textTransform={"uppercase"}
                        fontWeight={500}
                        borderRadius={0}
                        bg={"gray.900"}
                        colorScheme={"blackAlpha"}
                        fontSize={15}
                        fontFamily={"logo"}
                        letterSpacing={1}
                        rightIcon={<Icon as={MdAirplanemodeActive} />}
                        href={"/contact"}
                    >
                        Start Your Aviation Journey Today
                    </Button>
                    {/* <HStack color={"white"} mt={4}>
                        <SocialBar fontColor={"white"} />
                    </HStack> */}
                </VStack>
                {/* <Heading>More content, announcements, events etc...</Heading> */}
            </main>
        </>
    );
}
