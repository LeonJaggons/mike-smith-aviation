import Providers from "@/components/Providers";
import { NavBar } from "@/components/NavBar.1";
import { auth } from "@/firebase/firebase_init";
import { getUserByID } from "@/firebase/firestore_helpers";
import store from "@/redux/store";
import "@/styles/globals.css";
import { Link } from "@chakra-ui/next-js";
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
    useMediaQuery,
} from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import { useSelector } from "react-redux";
import { SizeMe } from "react-sizeme";
import { MikeSmithLogo, SocialBar } from "../components/NavBar";
import PageImageCover from "../components/PageImageCover";

export default function App({ Component, pageProps }) {
    const [isLanding, setIsLanding] = useState(false);
    const [windowSize, setWindowSize] = useState([0, 0]);
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserByID(user.uid).then((dbUser) => {
                    store.dispatch({
                        type: "SET",
                        attr: "user",
                        payload: { userID: user.uid, ...user, ...dbUser },
                    });
                    store.dispatch({
                        type: "SET",
                        attr: "isSignedIn",
                        payload: true,
                    });
                });
            } else {
                store.dispatch({
                    type: "SET",
                    attr: "user",
                    payload: null,
                });
                store.dispatch({
                    type: "SET",
                    attr: "isSignedIn",
                    payload: false,
                });
                router.push("/");
            }
        });
        if (window) {
            const newWS = [window.innerWidth, window.innerHeight];
            setWindowSize([...newWS]);
        }
        function detectMob() {
            const toMatch = [
                /Android/i,
                /webOS/i,
                /iPhone/i,
                /iPad/i,
                /iPod/i,
                /BlackBerry/i,
                /Windows Phone/i,
            ];

            return toMatch.some((toMatchItem) => {
                return navigator.userAgent.match(toMatchItem);
            });
        }
        const isMob = detectMob();
        store.dispatch({
            type: "SET",
            attr: "isMobile",
            payload: isMob,
        });
        setIsMobile(isMob);

        return unsub;
    }, []);

    const covers = {
        "/": {
            src: "/cover.jpeg",
            isVideo: false,
            isFull: true,
            // title: "CONTACT US",
            // sub: "Connecting You with the Sky, Get in Touch Today!",
        },
        "/contact": {
            src: "/contact.jpg",
            title: "Contact Us",
            sub: "Connecting You with the Sky, Get in Touch Today!",
        },
        "/mission": {
            src: "/mission.jpg",
            title: "Mission Statement",
            sub: "Our Vision, Your Success: Embracing Excellence and Safety in Aviation",
        },
        "/info/fleet": {
            src: "/fleet.jpg",
            title: "Our Fleet",
            sub: "Precision in the Air and Ground",
        },
        "/info/licenses": {
            src: "/licenses.jpg",
            title: "Licenses & Ratings",
            sub: "Empowering Your Aviation Aspirations",
        },
        "/info/learn": {
            src: "/learn.jpg",
            title: "Learn to Fly",
            sub: "Take Flight with Confidence",
        },
        "/gallery": {
            src: "/gallery.jpg",
            title: "Gallery",
            sub: "Our Flight School's Soaring Journey",
        },
    };

    return (
        <>
            {/* <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head> */}
            <Providers>
                <SizeMe>
                    {({ size }) => (
                        <Box
                            // h={"100vh"}
                            w={isMobile ? windowSize[0] : "100vw"}
                            maxW={isMobile ? windowSize[0] : "100vw"}
                            minW={isMobile ? windowSize[0] : "100vw"}
                            overflowX={"hidden"}
                            bg={"black"}
                        >
                            <NavBar size={size} />
                            {/* {router.pathname !== "/" && <Box h={"64px"} />} */}
                            {Object.keys(covers).includes(router.pathname) && (
                                <PageImageCover
                                    {...covers[[router.pathname]]}
                                />
                            )}
                            {router.pathname !== "/" && router.pathname ? (
                                <Box
                                    flex={1}
                                    px={
                                        router.pathname.includes("member")
                                            ? "5%"
                                            : ["5%", "8%", "10%"]
                                    }
                                    py={
                                        router.pathname.includes("member")
                                            ? "60px"
                                            : "44px"
                                    }
                                    bg={"white"}
                                    w={isMobile ? windowSize[0] : "100%"}
                                    minH={"80vh"}
                                >
                                    <Component {...pageProps} />
                                </Box>
                            ) : (
                                <Component {...pageProps} />
                            )}
                            <Footer />
                        </Box>
                    )}
                </SizeMe>
            </Providers>
        </>
    );
}

const Footer = () => {
    const isMobile = useSelector((state) => state.app.isMobile);
    const [isLargerThan800] = useMediaQuery("(min-width: 1200px)");
    return (
        <Box
            w={"full"}
            bg={"gray.900"}
            px={"10%"}
            py={isMobile ? 4 : 6}
            pb={6}
            borderTopWidth={2}
            borderTopColor={"rgba(0,0,0,.2)"}
        >
            <Stack
                direction={isMobile || !isLargerThan800 ? "column" : "row"}
                alignItems={isMobile || !isLargerThan800 ? "center" : "start"}
                justify={isMobile || !isLargerThan800 ? "center" : "unset"}
                spacing={isMobile || (!isLargerThan800 && 8)}
                w={"full"}
            >
                <ContactDisplay />
                {/* <HoursDisplay /> */}
                <LocationDisplay />
            </Stack>
            <Box mx={-2}>
                <Divider my={4} size={"lg"} borderColor={"whiteAlpha.600"} />
                <HStack
                    alignItems={"center"}
                    justify={"space-between"}
                    w={"full"}
                >
                    <HStack spacing={4} alignItems={"end"}>
                        {/* <MikeSmithLogo color={"white"} /> */}
                        {!isMobile && (
                            <Text color={"white"} fontSize={12}>
                                © 2023 Mike Smith Aviation. All rights reserved.
                            </Text>
                        )}
                    </HStack>
                    <HStack spacing={0}></HStack>
                </HStack>
            </Box>
        </Box>
    );
};

function HoursDisplay() {
    return (
        <Box alignItems={"start"} w={"full"}>
            <HStack w={"160px"}>
                <Text color={"white"} fontSize={"12px"} fontWeight={"bold"}>
                    Sunday
                </Text>
                <Box flex={1} />
                <Text fontSize={"12px"} color={"white"}>
                    9 AM-6 PM
                </Text>
            </HStack>
            <HStack w={"160px"}>
                <Text fontWeight={"bold"} fontSize={"12px"} color={"white"}>
                    Monday
                </Text>
                <Box flex={1} />
                <Text fontSize={"12px"} color={"white"}>
                    9 AM-6 PM
                </Text>
            </HStack>
            <HStack w={"160px"}>
                <Text fontWeight={"bold"} fontSize={"12px"} color={"white"}>
                    Tuesday
                </Text>
                <Box flex={1} />
                <Text fontSize={"12px"} color={"white"}>
                    9 AM-6 PM
                </Text>
            </HStack>
            <HStack w={"160px"}>
                <Text fontWeight={"bold"} fontSize={"12px"} color={"white"}>
                    Wednesday
                </Text>
                <Box flex={1} />
                <Text fontSize={"12px"} color={"white"}>
                    9 AM-6 PM
                </Text>
            </HStack>
            <HStack w={"160px"}>
                <Text fontWeight={"bold"} fontSize={"12px"} color={"white"}>
                    Thursday
                </Text>
                <Box flex={1} />
                <Text fontSize={"12px"} color={"white"}>
                    9 AM-6 PM
                </Text>
            </HStack>
            <HStack w={"160px"}>
                <Text fontWeight={"bold"} fontSize={"12px"} color={"white"}>
                    Friday
                </Text>
                <Box flex={1} />
                <Text fontSize={"12px"} color={"white"}>
                    9 AM-6 PM
                </Text>
            </HStack>
            <HStack w={"160px"}>
                <Text fontWeight={"bold"} fontSize={"12px"} color={"white"}>
                    Saturday
                </Text>
                <Box flex={1} />
                <Text fontSize={"12px"} color={"white"}>
                    9 AM-6 PM
                </Text>
            </HStack>
        </Box>
    );
}

function LocationDisplay() {
    return (
        <VStack alignItems={"center"} flex={1} spacing={3}>
            <HStack justify={"start"} w={"full"} spacing={4}>
                <Icon as={MdPhone} color={"white"} boxSize={"24px"} />
                <Link
                    href={"tel:7073456526"}
                    _hover={{
                        color: "gray.600",
                    }}
                >
                    <Text fontSize={18} color={"white"} fontWeight={800}>
                        (707) 345-6526
                    </Text>
                </Link>
            </HStack>
            <HStack justify={"start"} w={"full"} spacing={4}>
                <Icon as={MdEmail} color={"white"} boxSize={"24px"} />
                <Link
                    href={"mailto:team@mikesmithaviation.com"}
                    _hover={{
                        color: "gray.600",
                    }}
                >
                    <Text fontSize={14} color={"white"} fontWeight={500}>
                        team@mikesmithaviation.com
                    </Text>
                </Link>
            </HStack>
            <Link
                href={"https://goo.gl/maps/cSuiadu43NMjYeBs7"}
                target={"_blank"}
                w={"full"}
            >
                <HStack justify={"start"} w={"full"} spacing={4}>
                    <Icon as={MdLocationPin} color={"white"} boxSize={"24px"} />
                    <Box>
                        <Heading size={"xs"} color={"white"}>
                            Napa County Airport KAPC
                        </Heading>
                        <Text fontSize={12} color={"white"}>
                            Napa County Airport, 2000 Airport Rd
                        </Text>
                        <Text fontSize={12} color={"white"}>
                            Napa, CA 94558
                        </Text>
                    </Box>
                </HStack>
            </Link>
        </VStack>
    );
}

function ContactDisplay({}) {
    return (
        <VStack
            h={"140px"}
            align={"start"}
            spacing={2}
            flex={2}
            // h={"full"}
            justify={"space-between"}
        >
            <MikeSmithLogo color={"white"} />
            <HStack ml={-2}>
                <SocialBar fontColor={"white"} />
            </HStack>
        </VStack>
    );
}

export const AccoladesBar = () => {
    return (
        <HStack h={"90px"}>
            <Image src={"/distinguished_fs.png"} h={"full"} />
            <Image src={"/distinguished_fi.png"} h={"full"} />
            <Image src={"/cessna_logo.png"} h={"full"} />
        </HStack>
    );
};
