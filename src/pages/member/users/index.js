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
} from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

function index() {
    return (
        <Box mt={"58px"}>
            <VStack align={"start"} pt={4}>
                <HStack w={"full"} justify={"space-between"}>
                    <Heading size={"lg"}>Users</Heading>

                    <HStack>
                        <AddNewUserButton />
                    </HStack>
                </HStack>
            </VStack>
        </Box>
    );

    co;
}

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
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius={0}>
                <ModalBody p={6}>
                    <Heading size={"md"} mb={4}>
                        Add New User
                    </Heading>
                    <VStack spacing={4}>
                        <HStack w={"full"}>
                            <TextInput label={"First Name"} block />
                            <TextInput label={"Last Name"} block />
                        </HStack>
                        <TextInput label={"Email address"} />
                        <TextInput label={"Phone"} />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
const TextInput = ({ label, block, area, required, value }) => {
    return (
        <VStack
            w={"full"}
            alignItems={"flex-start"}
            flex={block && 1}
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
                    size={"sm"}
                    rows={5}
                    resize={"none"}
                    borderRadius={0}
                />
            ) : (
                <Input size={"sm"} borderRadius={0} value={value && value} />
            )}
        </VStack>
    );
};

export default index;
