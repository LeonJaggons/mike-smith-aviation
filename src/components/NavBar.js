import { signInUser } from "@/firebase/auth_helpers";
import { auth } from "@/firebase/firebase_init";
import {
    Box,
    Button,
    Center,
    HStack,
    Heading,
    Icon,
    IconButton,
    LinkBox,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    VStack,
    LinkOverlay,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Input,
    Checkbox,
    ModalCloseButton,
    useToast,
    Avatar,
    Tag,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useViewportScroll,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BiHdd, BiSolidPlaneTakeOff } from "react-icons/bi";
import {
    FaEnvelope,
    FaEnvelopeOpenText,
    FaFacebook,
    FaInstagram,
    FaMailBulk,
    FaSignInAlt,
    FaSignOutAlt,
} from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

function getWindowDimensions() {
    if (typeof window === "undefined" || !window) return;
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
export const NavBar = () => {
    const isSignedIn = useSelector((state) => state.app.isSignedIn);
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    // const { width, height } = getWindowDimensions();
    const [shadow, setShadow] = useState("none");
    const [bg, setBg] = useState("rbga(255,255,255, 0)");
    const [isBelowImage, setIsBelowImage] = useState(false);
    const [borderWidth, setBorderWidth] = useState(0);
    const [fontColor, setFontColor] = useState("white");
    const { scrollY } = useScroll();
    const router = useRouter();
    const user = useSelector((state) => state.app.user);
    useMotionValueEvent(scrollY, "change", (latest) => {
        const windowHeight = windowSize.current[0];
        const scaledHeight = windowHeight / 4;
        // if (router.pathname !== "/") setBg("white");
        setBg(`rgba(255,255,255,${latest / scaledHeight})`);
        // if (scaledHeight < latest) {
        //     setBg("white");
        // }
        setBorderWidth(latest >= scaledHeight ? 1 : 0);
        setShadow(latest >= scaledHeight !== "/" ? "sm" : "none");
        setFontColor(latest >= scaledHeight ? "black" : "white");
        setIsBelowImage(latest >= windowHeight);
        setFontColor;
    });

    useEffect(() => {
        // setBorderWidth(router.pathname === "/" ? 0 : 1);
        if (router.pathname.split("/").includes("member")) {
            setFontColor("black");
            // setFontColor(router.pathname === "/" ? "white" : "black");
        } else {
            setFontColor("white");
        }
        windowSize.current = [window.innerWidth, window.innerHeight];
        // if (router.pathname !== "/") setBg("white");
        // else setBg("rgba(0,0,0,0)");
    }, [router.pathname]);

    return (
        <HStack
            as={motion.div}
            position={"fixed"}
            w={"full"}
            spacing={6}
            p={2}
            borderBottomWidth={borderWidth}
            shadow={"sm"}
            align={"center"}
            bg={bg}
            px={"10%"}
            justify={"space-between"}
            zIndex={999}
        >
            {true ? <MikeSmithLogo color={fontColor} /> : <Box />}
            <VStack align={"end"} spacing={4} flex={1}>
                <HStack spacing={"0px"}>
                    <IconButton
                        color={fontColor}
                        variant={"link"}
                        icon={<Icon as={FaFacebook} />}
                        as={Link}
                        href={"https://www.facebook.com/mikesmithaviation/"}
                        target={"_blank"}
                    />
                    <IconButton
                        color={fontColor}
                        variant={"link"}
                        icon={<Icon as={FaInstagram} />}
                        as={Link}
                        href={
                            "https://www.instagram.com/mikesmithaviation/?hl=en"
                        }
                        target={"_blank"}
                    />
                    <IconButton
                        color={fontColor}
                        variant={"link"}
                        icon={<Icon as={FaEnvelope} />}
                        as={Link}
                        href={"/contact"}
                    />
                    <SignInButton fontColor={fontColor} />
                    {isSignedIn && user.adminRole >= 4 ? (
                        <Tag colorScheme={"gray"} fontWeight={700}>
                            Admin
                        </Tag>
                    ) : (
                        isSignedIn && (
                            <Tag colorScheme={"blue"} fontWeight={700}>
                                Member
                            </Tag>
                        )
                    )}
                    {isSignedIn && (
                        <Avatar
                            ml={2}
                            size={"xs"}
                            name={user.firstName + " " + user.lastName}
                            mr={0}
                            fontWeight={"bold"}
                        ></Avatar>
                    )}
                </HStack>
                <HStack spacing={8} flex={1}>
                    {!isSignedIn && (
                        <>
                            <NavItem
                                color={fontColor}
                                subItems={[
                                    {
                                        label: "Mission Statement",
                                        href: "mission",
                                    },
                                    {
                                        label: "Our Fleet",
                                        href: "fleet",
                                    },
                                    {
                                        label: "Our Team",
                                        href: "team",
                                    },
                                    {
                                        label: "Newsletters",
                                        href: "newsletters",
                                    },
                                    {
                                        label: "Careers",
                                        href: "careers",
                                    },
                                    {
                                        label: "Contact Us",
                                        href: "contact",
                                    },
                                    {
                                        label: "KAPC Airport Information",
                                        href: "kapc",
                                    },
                                ]}
                            >
                                About MSA
                            </NavItem>
                            <NavItem
                                color={fontColor}
                                subItems={[
                                    {
                                        label: "Learn to Fly",
                                        href: "contact",
                                    },
                                    {
                                        label: "Certificates & Ratings",
                                        href: "contact",
                                    },
                                    {
                                        label: "Ground School",
                                        href: "contact",
                                    },
                                    {
                                        label: "Training Simulator",
                                        href: "contact",
                                    },
                                    {
                                        label: "Career Pathways",
                                        href: "contact",
                                    },
                                ]}
                            >
                                Flight Training
                            </NavItem>
                            <NavItem color={fontColor}>Gallery</NavItem>
                        </>
                    )}
                    {isSignedIn && (
                        <>
                            <NavItem
                                color={fontColor}
                                href={"/member/appointments"}
                            >
                                Appointments
                            </NavItem>
                            <NavItem
                                color={fontColor}
                                href={"/member/documents"}
                            >
                                Documents
                            </NavItem>
                        </>
                    )}
                    {isSignedIn && user.adminRole >= 4 && (
                        <NavItem color={fontColor} href={"/member/users"}>
                            Users
                        </NavItem>
                    )}
                    {/* <NavItem color={fontColor}>Current Students</NavItem> */}
                </HStack>
            </VStack>
        </HStack>
    );
};

const SignInButton = ({ fontColor }) => {
    const isSignedIn = useSelector((state) => state.app.isSignedIn);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleSignOut = async () => {
        await signOut(auth);
    };
    return (
        <NavItem
            color={fontColor}
            onClick={isSignedIn ? handleSignOut : onOpen}
        >
            <HStack>
                <Icon as={isSignedIn ? MdLogout : MdLogin} />
                {/* <Text>Sign {isSignedIn ? "out" : "in"}</Text> */}
            </HStack>
            <SignInModal isOpen={isOpen} onClose={onClose} />
        </NavItem>
    );
};

const SignInModal = ({ isOpen, onClose }) => {
    const emptyCreds = { email: "", password: "" };
    const [userCreds, setUserCreds] = useState(emptyCreds);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toast = useToast();
    const updateCreds = (param, e) =>
        setUserCreds({ ...userCreds, [param]: e.target.value });
    const setEmail = (e) => updateCreds("email", e);
    const setPassword = (e) => updateCreds("password", e);

    const handleSubmit = async () => {
        setLoading(true);
        const res = await signInUser(userCreds);
        if (res.uid) {
            onClose();
        } else {
            console.table(res);
            setError(res);
            toast({
                title: res.code.split("/")[1].replace("-", " ").toUpperCase(),
                description: "Please try again.",
                status: "error",
                position: "top",
            });
        }
        setLoading(false);
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={0}>
                <ModalCloseButton onClick={onClose} />
                <ModalBody p={8}>
                    <VStack align={"start"} spacing={4}>
                        <Heading>Welcome Back</Heading>
                        <Text mt={-2}>
                            Please enter your details to continue.
                        </Text>
                        <VStack align={"start"} w={"full"}>
                            <Heading size={"xs"}>Email address</Heading>
                            <Input borderRadius={0} onChange={setEmail} />
                        </VStack>
                        <VStack align={"start"} w={"full"}>
                            <Heading size={"xs"}>Password</Heading>
                            <Input
                                type={"password"}
                                borderRadius={0}
                                onChange={setPassword}
                            />
                        </VStack>
                        <HStack
                            justify={"space-between"}
                            w={"full"}
                            mt={-2}
                            mb={2}
                        >
                            <Checkbox>Remember me?</Checkbox>
                            <Button size={"sm"} variant={"link"}>
                                Forgot password?
                            </Button>
                        </HStack>
                        <Button
                            w={"full"}
                            borderRadius={0}
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isLoading={loading}
                        >
                            Continue
                        </Button>
                        <Button
                            mt={-3}
                            w={"full"}
                            variant={"ghost"}
                            borderRadius={0}
                        >
                            Create an account
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
const NavItem = ({ href, subItems, color, children, onClick, ...props }) => {
    return subItems ? (
        <Popover
            trigger={"hover"}
            closeOnBlur={false}
            placement={"bottom-start"}
        >
            <PopoverTrigger>
                <Button
                    cursor={"s-resize"}
                    color={color}
                    // as={Link}
                    fontSize={"sm"}
                    fontWeight={700}
                    colorScheme="whiteAlpha"
                    letterSpacing={"-.5px"}
                    variant={"link"}
                    _pressed={{ color: color }}
                    href={""}
                    style={{ textDecoration: "none" }}
                >
                    {children}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                bg={"white"}
                borderRadius={0}
                borderWidth={".5px"}
                borderColor={"gray.100"}
                w={"180px"}
            >
                <PopoverBody p={0}>
                    {subItems?.map((si) => (
                        <SubNavItem {...si} key={si.label} />
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    ) : (
        <Button
            color={color}
            as={onClick ? Button : Link}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            fontSize={"sm"}
            fontWeight={700}
            letterSpacing={"-.5px"}
            variant={"link"}
            onClick={onClick}
            href={href ? href : ""}
            style={{ textDecoration: "none" }}
        >
            {children}
        </Button>
    );
};
const SubNavItem = ({ label, href }) => {
    return (
        <Button
            fontSize={"12px"}
            as={Link}
            w={"full"}
            color={"gray.700"}
            borderRadius={0}
            _hover={{ color: "black", fontWeight: 600 }}
            variant={"ghost"}
            size={"sm"}
            href={href}
            fontWeight={500}
            justifyContent={"start"}
        >
            {label}
        </Button>
    );
};
const MikeSmithLogo = ({ color }) => {
    return (
        <Link href="/">
            <HStack align={"center"} mr={6}>
                <Center boxSize={"40px"} bg={"black"}>
                    <Icon
                        as={BiSolidPlaneTakeOff}
                        color={"white"}
                        boxSize={"30px"}
                    />
                </Center>
                <VStack spacing={0} alignItems={"start"} justify={"center"}>
                    <Heading
                        fontSize={"30px"}
                        mb={"-10px"}
                        letterSpacing={-1}
                        color={color}
                        fontWeight={"extrabold"}
                    >
                        SMITH
                    </Heading>
                    <Heading
                        color={color}
                        fontSize={"20px"}
                        fontWeight={"extrabold"}
                        letterSpacing={"-.4px"}
                    >
                        AVIATION
                    </Heading>
                </VStack>
            </HStack>
        </Link>
    );
};
