import { createUser } from "@/firebase/auth_helpers";
import { getAllUsers } from "@/firebase/user_helpers";
import {
    Box,
    Heading,
    VStack,
    HStack,
    Button,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Input,
    Textarea,
    Avatar,
    Checkbox,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tag,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FaPlus, FaTextHeight } from "react-icons/fa";
import { MdAdd, MdMoreTime } from "react-icons/md";
const allCharacters = [
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // Uppercase letters
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)), // Lowercase letters
    ...Array.from({ length: 10 }, (_, i) => String.fromCharCode(48 + i)),
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~",
];

function index() {
    return (
        <Box mt={"54px"}>
            <VStack align={"start"} pt={4}>
                <HStack w={"full"} justify={"space-between"}>
                    <Heading size={"lg"}>Users</Heading>

                    <HStack>
                        <AddNewUserButton />
                    </HStack>
                </HStack>
                <UserTable />
            </VStack>
        </Box>
    );
}

const UserTable = () => {
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);
    const loadUsers = async () => {
        setLoading(true);
        const newUsers = await getAllUsers();
        console.log(newUsers);
        setUsers([...newUsers]);
        setLoading(false);
    };
    useEffect(() => {
        loadUsers();
    }, []);
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                    <Th>Admin?</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users?.map((u) => (
                    <Tr>
                        <Td>
                            <Text fontSize={"sm"}>{u.firstName}</Text>
                        </Td>
                        <Td>
                            <Text fontSize={"sm"}>{u.lastName}</Text>
                        </Td>
                        <Td>
                            <Text fontSize={"sm"}>{u.email}</Text>
                        </Td>
                        <Td>
                            <Tag
                                w={"50px"}
                                display={"flex"}
                                justifyContent={"center"}
                                borderRadius={0}
                                fontWeight={500}
                                colorScheme={
                                    u.adminRole >= 4 ? "green" : "gray"
                                }
                                size={"lg"}
                                fontSize={"12px"}
                                variant={"solid"}
                                textTransform={"uppercase"}
                            >
                                {u.adminRole >= 4 ? "Yes" : "No"}
                            </Tag>
                        </Td>
                        <Td>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<Icon as={BiChevronDown} />}
                                    borderRadius={0}
                                    fontSize={"12px"}
                                    fontWeight={700}
                                >
                                    ACTIONS
                                </MenuButton>
                                <MenuList>
                                    <MenuItem icon={<Icon as={MdMoreTime} />}>
                                        Extend Document Access
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

const AddNewUserButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme={"black"}
                size={"sm"}
                variant={"ghost"}
                leftIcon={<Icon as={MdAdd} />}
                borderRadius={0}
            >
                Add New User
            </Button>
            <AddNewUserModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

const AddNewUserModal = ({ isOpen, onClose }) => {
    const emptyUser = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        tempPassword: "",
        isAdmin: false,
    };
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const updateUser = (param, e) =>
        setUser({
            ...user,
            [param]: e.target ? e.target.value : e,
        });
    const setFirstName = (e) => updateUser("firstName", e);
    const setLastName = (e) => updateUser("lastName", e);
    const setEmail = (e) => updateUser("email", e);
    const setPhone = (e) => updateUser("phone", e);
    const setPW = (e) => updateUser("tempPassword", e);
    const setIsAdmin = (e) => updateUser("isAdmin", e);
    const handleSubmit = async () => {
        setLoading(true);
        await createUser(user);
        setLoading(false);
        setUser(emptyUser);
        onClose();
    };
    useEffect(() => {
        console.table(user);
    }, [user]);
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius={0}>
                <ModalBody p={6}>
                    <Tabs minH={"50vh"} isFitted>
                        <TabList>
                            <Tab>New</Tab>
                            {/* <Tab>Import from FSP</Tab> */}
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <VStack spacing={4} py={2} align={"start"}>
                                    <HStack w={"full"}>
                                        <TextInput
                                            onChange={setFirstName}
                                            label={"First Name"}
                                            block
                                        />
                                        <TextInput
                                            onChange={setLastName}
                                            label={"Last Name"}
                                            block
                                        />
                                    </HStack>
                                    <TextInput
                                        onChange={setEmail}
                                        label={"Email address"}
                                    />
                                    <TextInput
                                        onChange={setPhone}
                                        label={"Phone"}
                                    />
                                    <TempPasswordDisplay setPW={setPW} />
                                    <Checkbox
                                        alignSelf={"end"}
                                        onChange={(e) =>
                                            setIsAdmin(e.target.checked)
                                        }
                                    >
                                        Admin?
                                    </Checkbox>
                                </VStack>
                            </TabPanel>
                            <TabPanel>
                                <Heading>FSP</Heading>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Button
                        w={"full"}
                        borderRadius={0}
                        colorScheme="blue"
                        onClick={handleSubmit}
                    >
                        Add
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

const createTempPassword = (n) => {
    const maxIndex = allCharacters.length;
    let pw = "";
    for (let i = 0; i < n; i++) {
        const currI = Math.floor(Math.random() * maxIndex);
        pw += allCharacters[[currI]];
    }
    return pw;
};
const TempPasswordDisplay = ({ setPW }) => {
    const [password, setPassword] = useState();

    const handleChange = () => {
        const newPW = createTempPassword(15);
        setPW(newPW);
        setPassword(newPW);
    };
    useEffect(() => {
        const initPW = createTempPassword(15);
        setPW(initPW);
        setPassword(initPW);
    }, []);
    return (
        <HStack w={"full"} alignItems={"end"}>
            <TextInput flex label={"Temporary Password"} value={password} />
            <Button
                borderRadius={0}
                onClick={handleChange}
                size={"sm"}
                variant={"outline"}
            >
                New Password
            </Button>
        </HStack>
    );
};

const TextInput = ({ label, block, area, required, value, flex, onChange }) => {
    return (
        <VStack
            w={"full"}
            alignItems={"flex-start"}
            flex={(block || flex) && 1}
            spacing={2}
        >
            <HStack align={"center"} spacing={"4px"}>
                <Heading size={"xs"}>{label}</Heading>
                <Heading size={"xs"} color={"red.400"}>
                    {required && "*"}
                </Heading>
            </HStack>
            {area ? (
                <Textarea
                    onChange={onChange}
                    size={"sm"}
                    rows={5}
                    resize={"none"}
                    borderRadius={0}
                />
            ) : (
                <Input
                    size={"sm"}
                    onChange={onChange}
                    borderRadius={0}
                    value={value && value}
                />
            )}
        </VStack>
    );
};
export default index;
