import Providers from "@/components/Providers";
import "@/styles/globals.css";
import { MikeSmithLogo, NavBar, SocialBar } from "../components/NavBar";
import {
    Box,
    Divider,
    HStack,
    Heading,
    Icon,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SizeMe } from "react-sizeme";
import PageImageCover from "../components/PageImageCover";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";
import store from "@/redux/store";
import { getUserByID } from "@/firebase/firestore_helpers";
import { MdLocationPin } from "react-icons/md";

export default function App({ Component, pageProps }) {
    const [isLanding, setIsLanding] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(user);
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
        return unsub;
    }, []);
    const covers = {
        "/": {
            src: "/mike-cover.jpg",
            // title: "CONTACT US",
            // sub: "Connecting You with the Sky, Get in Touch Today!",
        },
        "/contact": {
            src: "/contact.jpg",
            title: "CONTACT US",
            sub: "Connecting You with the Sky, Get in Touch Today!",
        },
        "/mission": {
            src: "/mission.jpg",
            title: "MISSION STATEMENT",
            sub: "Our Vision, Your Success: Embracing Excellence and Safety in Aviation",
        },
        "/fleet": {
            src: "/fleet.jpg",
            title: "OUR FLEET",
            sub: "Precision in the Air and Ground",
        },
        "/licenses": {
            src: "/licenses.jpg",
            title: "LICENSES & RATINGS",
            sub: "Empowering Your Aviation Aspirations",
        },
        "/learn": {
            src: "/learn.jpg",
            title: "LEARN TO FLY",
            sub: "Take Flight with Confidence",
        },
        "/gallery": {
            src: "/gallery.jpg",
            title: "GALLERY",
            sub: "Our Flight School's Soaring Journey",
        },
    };

    return (
        <Providers>
            <SizeMe>
                {({ size }) => (
                    <VStack
                        h={"100vh"}
                        w={"100vw"}
                        alignItems={"flex-start"}
                        spacing={0}
                    >
                        <NavBar size={size} />
                        {/* {router.pathname !== "/" && <Box h={"64px"} />} */}
                        {Object.keys(covers).includes(router.pathname) && (
                            <PageImageCover {...covers[[router.pathname]]} />
                        )}
                        <Box flex={1} bg={"white"} w={"full"}>
                            <Box
                                px={"10%"}
                                w={"full"}
                                py={"56px"}
                                minH={"80vh"}
                            >
                                <Component {...pageProps} />
                            </Box>
                        </Box>
                        <Footer />
                    </VStack>
                )}
            </SizeMe>
        </Providers>
    );
}

const Footer = () => {
    return (
        <Box w={"full"} bg={"gray.900"} px={"10%"} py={12} pb={6}>
            <HStack alignItems={"start"} justify={"space-between"}>
                <VStack align={"start"} spacing={2}>
                    <Heading size={"sm"} color={"white"}>
                        Mike Smith Aviation
                    </Heading>
                    <Text fontSize={12} color={"white"}>
                        (707) 345-6526
                    </Text>
                    <Text fontSize={12} color={"white"}>
                        team@mikesmithaviation.com
                    </Text>
                </VStack>
                <Box alignItems={"start"}>
                    <HStack w={"160px"}>
                        <Text
                            color={"white"}
                            fontSize={"12px"}
                            fontWeight={"bold"}
                        >
                            Sunday
                        </Text>
                        <Box flex={1} />
                        <Text fontSize={"12px"} color={"white"}>
                            9 AM-6 PM
                        </Text>
                    </HStack>
                    <HStack w={"160px"}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"white"}
                        >
                            Monday
                        </Text>
                        <Box flex={1} />
                        <Text fontSize={"12px"} color={"white"}>
                            9 AM-6 PM
                        </Text>
                    </HStack>
                    <HStack w={"160px"}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"white"}
                        >
                            Tuesday
                        </Text>
                        <Box flex={1} />
                        <Text fontSize={"12px"} color={"white"}>
                            9 AM-6 PM
                        </Text>
                    </HStack>
                    <HStack w={"160px"}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"white"}
                        >
                            Wednesday
                        </Text>
                        <Box flex={1} />
                        <Text fontSize={"12px"} color={"white"}>
                            9 AM-6 PM
                        </Text>
                    </HStack>
                    <HStack w={"160px"}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"white"}
                        >
                            Thursday
                        </Text>
                        <Box flex={1} />
                        <Text fontSize={"12px"} color={"white"}>
                            9 AM-6 PM
                        </Text>
                    </HStack>
                    <HStack w={"160px"}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"white"}
                        >
                            Friday
                        </Text>
                        <Box flex={1} />
                        <Text fontSize={"12px"} color={"white"}>
                            9 AM-6 PM
                        </Text>
                    </HStack>
                    <HStack w={"160px"}>
                        <Text
                            fontWeight={"bold"}
                            fontSize={"12px"}
                            color={"white"}
                        >
                            Saturday
                        </Text>
                        <Box flex={1} />
                        <Text fontSize={"12px"} color={"white"}>
                            9 AM-6 PM
                        </Text>
                    </HStack>
                </Box>
                <HStack>
                    <Icon as={MdLocationPin} color={"white"} boxSize={"24px"} />
                    <VStack alignItems={"start"}>
                        <Text fontSize={12} color={"white"} mb={-2}>
                            Napa County Airport, 2030 Airport Rd
                        </Text>
                        <Text fontSize={12} color={"white"}>
                            Napa, CA 94558
                        </Text>
                    </VStack>
                </HStack>
                <Box />
                <Box />
            </HStack>
            <Divider my={6} size={"lg"} />
            <HStack alignItems={"end"} justify={"space-between"}>
                <HStack spacing={0} alignItems={"end"}>
                    <MikeSmithLogo color={"white"} />
                    <Text color={"white"} fontSize={12}>
                        © 2023 Mike Smith Aviation. All rights reserved.
                    </Text>
                </HStack>
                <HStack spacing={0}>
                    <SocialBar fontColor={"white"} />
                </HStack>
            </HStack>
        </Box>
    );
};
