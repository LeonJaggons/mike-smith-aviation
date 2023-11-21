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
    InputGroup,
    InputLeftAddon,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    Image,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { signOut } from "firebase/auth";

import { useMotionValue, useViewportScroll } from "framer-motion";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiHdd, BiSolidPlaneTakeOff } from "react-icons/bi";
import {
    FaEnvelope,
    FaEnvelopeOpenText,
    FaFacebook,
    FaHamburger,
    FaInstagram,
    FaMailBulk,
    FaSignInAlt,
    FaSignOutAlt,
} from "react-icons/fa";
import {
    MdClose,
    MdLock,
    MdLogin,
    MdLogout,
    MdOutlinePassword,
    MdPassword,
} from "react-icons/md";
import { useSelector } from "react-redux";

function getWindowDimensions() {
    if (typeof window === "undefined" || !window) return;
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
const DesktopNavBar = () => {};
export const MobileNavBar = ({ isOpen, onClose }) => {
    return (
        <Drawer size={"full"} isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={"gray.900"}>
                <DrawerBody>
                    <HStack alignItems={"space-between"} w={"full"} pt={4}>
                        <MobileNavItem>Sign In</MobileNavItem>
                        <Box flex={1} />
                        <IconButton
                            variant={"link"}
                            bg={"transparent"}
                            icon={
                                <Icon
                                    as={MdClose}
                                    color={"white"}
                                    boxSize={"40px"}
                                />
                            }
                            onClick={onClose}
                        >
                            Close
                        </IconButton>
                    </HStack>
                    <VStack w={"full"} alignItems={"flex-end"} mt={4}>
                        <MobileNavItem href={"/mission"} close={onClose}>
                            Mission Statement
                        </MobileNavItem>
                        <MobileNavItem href={"/info/learn"} close={onClose}>
                            Learn to Fly
                        </MobileNavItem>
                        <MobileNavItem href={"/info/fleet"} close={onClose}>
                            Our Fleet
                        </MobileNavItem>
                        <MobileNavItem href={"/info/licenses"} close={onClose}>
                            Licenses & Ratings
                        </MobileNavItem>
                        <MobileNavItem href={"/gallery"} close={onClose}>
                            Gallery
                        </MobileNavItem>
                        <MobileNavItem href={"/contact"} close={onClose}>
                            Contact Us
                        </MobileNavItem>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
const MobileNavItem = ({ children, href, close }) => {
    return (
        <Link href={href ? href : ""} onClick={close}>
            <Heading color={"white"} size={"lg"}>
                {children}
            </Heading>
        </Link>
    );
};
export const SocialBar = ({ fontColor }) => {
    const size = "20px";
    return (
        <>
            <IconButton
                color={fontColor}
                variant={"link"}
                icon={<Icon as={FaFacebook} boxSize={size} />}
                as={Link}
                href={"https://www.facebook.com/mikesmithaviation/"}
                target={"_blank"}
            />
            <IconButton
                color={fontColor}
                variant={"link"}
                icon={<Icon as={FaInstagram} boxSize={size} />}
                as={Link}
                href={"https://www.instagram.com/mikesmithaviation/?hl=en"}
                target={"_blank"}
            />
            <IconButton
                color={fontColor}
                variant={"link"}
                icon={<Icon as={FaEnvelope} />}
                boxSize={size}
                as={Link}
                href={"/contact"}
            />
        </>
    );
};
export const UserAvatar = () => {
    const user = useSelector((state) => state.app.user);
    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    variant={"link"}
                    icon={
                        <Avatar
                            bg={"black"}
                            size={"sm"}
                            name={
                                user.profileImg
                                    ? user.profileImg
                                    : user.firstName + " " + user.lastName
                            }
                            mr={0}
                            fontWeight={"bold"}
                        ></Avatar>
                    }
                />
            </PopoverTrigger>
            <PopoverContent w={"120px"} borderRadius={0}>
                <PopoverBody p={0} py={2}>
                    <ProfileButton />
                    <SecurityButton />
                    <Button
                        fontWeight={500}
                        justifyContent={"start"}
                        size={"sm"}
                        borderRadius={0}
                        w={"full"}
                        variant={"ghost"}
                        onClick={handleSignOut}
                    >
                        Log out
                    </Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
const SecurityButton = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Button
                justifyContent={"start"}
                size={"sm"}
                borderRadius={0}
                w={"full"}
                variant={"ghost"}
                fontWeight={500}
                onClick={onOpen}
            >
                Password
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius={0}>
                    <ModalBody p={0}>
                        <VStack w={"full"} p={6}>
                            <VStack spacing={4} w={"full"}>
                                <Heading size={"md"}>Reset Password</Heading>
                                <TextInput
                                    label={"Old Password"}
                                    editable={true}
                                />

                                <TextInput
                                    label={"New Password"}
                                    editable={true}
                                />
                                <TextInput
                                    label={"Confirm Password"}
                                    editable={true}
                                />
                            </VStack>
                        </VStack>
                        <Box w={"full"} p={2} borderTopWidth={1}>
                            <Button
                                borderRadius={0}
                                w={"full"}
                                colorScheme="blue"
                            >
                                Update Password
                            </Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
const ProfileButton = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <>
            <Button
                justifyContent={"start"}
                size={"sm"}
                borderRadius={0}
                w={"full"}
                variant={"ghost"}
                fontWeight={500}
                onClick={onOpen}
            >
                MSA Profile
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent borderRadius={0}>
                    <ModalBody p={0}>
                        <UserInformation />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const UserInformation = ({ editable }) => {
    const user = useSelector((state) => state.app.user);
    return (
        <VStack h={"68vh"} spacing={0}>
            <Box flex={1} overflowY={"scroll"}>
                <VStack spacing={4} p={6}>
                    <Heading size={"lg"} mb={0}>
                        My Profile
                    </Heading>
                    <IconButton
                        h={"auto"}
                        variant={"link"}
                        icon={
                            <Avatar
                                size={"2xl"}
                                name={user.firstName + " " + user.lastName}
                            />
                        }
                    ></IconButton>
                    <HStack mt={4}>
                        <TextInput
                            editable={editable}
                            label={"First Name"}
                            value={user.firstName}
                        />
                        <TextInput
                            editable={editable}
                            label={"Last Name"}
                            value={user.lastName}
                        />
                    </HStack>
                    <TextInput
                        editable={editable}
                        label={"Email address"}
                        value={user.email}
                    />
                    <TextInput
                        editable={editable}
                        label={"Address line 1"}
                        value={user.address1}
                    />
                    <TextInput
                        editable={editable}
                        label={"Address line 2"}
                        value={user.address2}
                    />

                    <TextInput
                        editable={editable}
                        label={"City"}
                        value={user.city}
                    />

                    <TextInput
                        editable={editable}
                        label={"State"}
                        value={user.city}
                    />
                    <TextInput
                        editable={editable}
                        label={"Date of birth"}
                        value={moment(user.dob.toDate()).format("M/D/YYYY")}
                    />
                    <TextInput
                        editable={editable}
                        label={"Admin?"}
                        value={user.adminRole >= 4 ? "Yes" : "No"}
                    />
                </VStack>
            </Box>
            <Box p={2} w={"full"} borderTopWidth={1}>
                <Button
                    colorScheme={"blue"}
                    borderRadius={0}
                    w={"full"}
                    leftIcon={<Icon as={MdLock} />}
                >
                    Edit Profile
                </Button>
            </Box>
        </VStack>
    );
};

const TextInput = ({ label, value, editable }) => {
    return (
        <VStack w={"full"} alignItems={"start"} spacing={2}>
            <Heading fontSize={"12px"} fontWeight={600}>
                {label}
            </Heading>
            <InputGroup w={"full"} size={"sm"}>
                <InputLeftAddon borderRadius={0}>
                    <Icon as={MdLock} color={"gray.400"} />
                </InputLeftAddon>
                <Input
                    borderRadius={0}
                    isReadOnly={!editable}
                    value={value && value}
                    placeholder="None"
                />
            </InputGroup>
        </VStack>
    );
};
export const SignInButton = ({ fontColor }) => {
    const isSignedIn = useSelector((state) => state.app.isSignedIn);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleSignOut = async () => {
        await signOut(auth);
    };
    return (
        !isSignedIn && (
            <NavItem
                color={fontColor}
                onClick={isSignedIn ? handleSignOut : onOpen}
            >
                <HStack >
                    <Icon
                        as={isSignedIn ? MdLogout : MdLogin}
                        boxSize={"20px"}
                    />
                    <Text color={fontColor}>Sign {isSignedIn ? "out" : "in"}</Text>
                </HStack>
                <SignInModal isOpen={isOpen} onClose={onClose} />
            </NavItem>
        )
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
export const NavItem = ({
    href,
    subItems,
    color,
    children,
    onClick,
    ...props
}) => {
    return subItems && !href ? (
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
                    fontSize={"13px"}
                    fontWeight={700}
                    colorScheme="whiteAlpha"
                    letterSpacing={1}
                    variant={"link"}
                    _pressed={{ color: color }}
                    href={""}
                    style={{
                        textDecoration: "none",
                        textTransform: "uppercase",
                    }}
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
                        <SubNavItem
                            {...si}
                            key={si.label}
                            disabled={si.disabled}
                        />
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    ) : (
        <Button
            color={color}
            as={onClick ? Button : Link}
            bg={"transparent"}
            _hover={{ bg: "transparent", color: "gray.300" }}
            fontSize={"13px"}
            fontWeight={700}
            letterSpacing={1}
            variant={"link"}
            onClick={onClick}
            href={href ? href : ""}
            style={{ textDecoration: "none", textTransform: "uppercase" }}
        >
            {children}
        </Button>
    );
};
const SubNavItem = ({ label, href, disabled }) => {
    return (
        <Button
            fontSize={"13px"}
            as={Link}
            w={"full"}
            color={"gray.700"}
            borderRadius={0}
            _hover={{ color: "black", fontWeight: 600 }}
            variant={"ghost"}
            href={disabled ? "" : href}
            fontWeight={500}
            letterSpacing={1}
            isDisabled={disabled}
            justifyContent={"start"}
        >
            {label}
        </Button>
    );
};
export const MikeSmithLogo = ({ color }) => {
    const isMobile = useSelector((state) => state.app.isMobile);
    const router = useRouter();
    return (
        <Link href="/" display={"inline-flex"}>
            {router.pathname !== "/" ? (
                <Image src={"/Mike Smith.png"} w={"80px"} objectFit={"cover"} />
            ) : (
                <Center
                    mr={2}
                    boxSize={"60px"}
                    bg={isMobile ? "gray.900" : "black"}
                    borderRadius={5}
                >
                    <Icon
                        as={BiSolidPlaneTakeOff}
                        color={"white"}
                        boxSize={"40px"}
                    />
                </Center>
            )}
        </Link>
    );
};
