import {
    Box,
    HStack,
    Icon,
    IconButton,
    Link,
    Text,
    VStack,
    useDisclosure,
    useMediaQuery,
} from "@chakra-ui/react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import {
    MikeSmithLogo,
    MobileNavBar,
    SocialBar,
    SignInButton,
    UserAvatar,
    NavItem,
} from "./NavBar";

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
    const isMobile = useSelector((state) => state.app.isMobile);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const windowHeight = windowSize.current[0];
        const scaledHeight = windowHeight / 4;
        if (router.pathname.split("/").includes("member")) {
            setFontColor("#171923");
            setBg("white");
            setBorderWidth(1);
            setShadow("sm");
        } else {
            setBg(`rgba(255,255,255,${latest / scaledHeight})`);
            setBorderWidth(latest >= scaledHeight ? 1 : 0);
            setShadow(latest <= scaledHeight ? "sm" : 0);
            setFontColor(latest >= scaledHeight ? "#171923" : "white");
            setIsBelowImage(latest >= windowHeight);
            setShadow(latest >= scaledHeight ? "sm" : "none");
        }
    });

    useEffect(() => {
        setBorderWidth(0);
        if (router.pathname.split("/").includes("member")) {
            setFontColor("#171923");
            setBg("white");
            // setFontColor(router.pathname === "/" ? "white" : "black");
        } else {
            setFontColor("white");
            setBg(`rgba(255,255,255,0)`);
        }
    }, [router.pathname]);
    const [isLargerThan800] = useMediaQuery("(min-width: 1000px)");
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HStack
            as={motion.div}
            borderTopColor={"#171923"}
            position={"fixed"}
            w={isMobile && windowSize.current ? windowSize.current[0] : "100%"}
            top={0}
            left={0}
            p={4}
            flexWrap={"nowrap"}
            borderBottomWidth={borderWidth}
            shadow={shadow}
            alignItems={"center"}
            bg={bg}
            px={router.pathname.includes("member") ? "5%" : ["5%", "8%", "10%"]}
            zIndex={999}
        >
            <Box
                display={"flex"}
                flexFlow={"column nowrap"}
                alignItems={"flex-end"}
            >
                <MikeSmithLogo color={fontColor} />
                <Link
                    mt={1}
                    _hover={{ color: "white" }}
                    color={fontColor}
                    fontFamily={"heading"}
                    // fontSize={"16.2px"}
                    fontSize={"14px"}
                    fontWeight={400}
                    href={"tel:7073456526"}
                >
                    (707) 345-6526
                </Link>
            </Box>
            {(isMobile || !isLargerThan800) && (
                <>
                    <Box flex={1} />
                    <IconButton
                        variant={"link"}
                        onClick={onOpen}
                        icon={
                            <Icon
                                as={MdMenu}
                                boxSize={"40px"}
                                color={fontColor}
                            />
                        }
                    />
                    <MobileNavBar isOpen={isOpen} onClose={onClose} />
                </>
            )}
            {!isMobile && isLargerThan800 ? (
                <VStack align={"end"} spacing={4} flex={1}>
                    <HStack spacing={"2px"}>
                        {/* <SocialBar fontColor={fontColor} /> */}
                        {isSignedIn && <UserAvatar />}
                    </HStack>
                    <HStack spacing={12} flex={1}>
                        <>
                            <NavItem color={fontColor} href={"/mission"}>
                                Mission Statement
                            </NavItem>
                            <NavItem
                                color={fontColor}
                                subItems={[
                                    {
                                        label: "Learn to Fly",
                                        href: "/info/learn",
                                    },
                                    {
                                        label: "Our Fleet",
                                        href: "/info/fleet",
                                    },
                                    {
                                        label: "Certificates & Ratings",
                                        href: "/info/licenses",
                                    },
                                    {
                                        label: "Ground School",
                                        disabled: true,
                                        href: "/contact",
                                    },
                                    {
                                        label: "Training Simulator",
                                        disabled: true,
                                        href: "/contact",
                                    },
                                    {
                                        label: "Career Pathways",
                                        disabled: true,
                                        href: "/contact",
                                    },
                                ]}
                            >
                                Flight Training
                            </NavItem>
                            <NavItem color={fontColor} href={"/gallery"}>
                                Gallery
                            </NavItem>
                            <NavItem color={fontColor} href={"/"}>
                                Home
                            </NavItem>
                            <NavItem color={fontColor} href={"/contact"}>
                                Contact Us
                            </NavItem>
                            {/* <SignInButton fontColor={fontColor} /> */}
                        </>
                        {isSignedIn && (
                            <NavItem
                                color={fontColor}
                                subItems={[
                                    user.adminRole >= 4 && {
                                        label: "Leads",
                                        href: "/member/leads",
                                    },
                                    {
                                        label: "Appointments",
                                        href: "/member/appointments",
                                    },
                                    {
                                        label: "Documents",
                                        href: "/member/documents",
                                    },
                                    user.adminRole >= 4 && {
                                        label: "Users",
                                        href: "/member/users",
                                    },
                                ]}
                            >
                                Members
                            </NavItem>
                        )}
                        {/* <NavItem color={fontColor}>Current Students</NavItem> */}
                    </HStack>
                </VStack>
            ) : (
                <></>
            )}
            {/* {false && <MobileNavBar />} */}
        </HStack>
    );
};
