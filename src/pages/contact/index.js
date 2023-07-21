import {
    Box,
    Button,
    Center,
    HStack,
    Heading,
    Image,
    Input,
    Text,
    Textarea,
    VStack,
    Stack,
} from "@chakra-ui/react";
import React from "react";
import PageImageCover from "../../components/PageImageCover";
import { useSelector } from "react-redux";

function index() {
    const isMobile = useSelector((state) => state.app.isMobile);
    return (
        <Box py={12}>
            <Stack
                alignItems={"start"}
                spacing={8}
                direction={isMobile ? "column" : "row"}
            >
                <ContactForm />
                <Image
                    src={"/contact_1.jpg"}
                    w={isMobile ? "100%" : "50%"}
                    borderRadius={5}
                />
            </Stack>
        </Box>
    );
}

const ContactForm = () => {
    return (
        <Box
            flex={1}
            borderWidth={1}
            p={8}
            shadow={"md"}
            borderColor={"gray.50"}
        >
            <Heading fontWeight={700} size={"lg"} mb={2}>
                Chat with our team
            </Heading>
            <Text color={"gray.400"} mb={6} fontSize={"sm"}>
                Need help with something? Want more information about our
                programs? Get in touch with our team and we'll get back to you
                very soon. Fields marked with an asterisk (*) are required.
            </Text>
            <VStack alignItems={"flex-start"} spacing={8}>
                <HStack w={"full"}>
                    <TextInput label={"First name"} required block />
                    <TextInput label={"Last name"} block />
                </HStack>
                <HStack w={"full"}>
                    <TextInput label={"Email Address"} required />
                    <TextInput label={"Phone Number"} />
                </HStack>
                <TextInput
                    label={"What would you like to discuss?"}
                    required
                    area
                />
                <Button w={"full"}>Send</Button>
            </VStack>
        </Box>
    );
};
const ContactDetails = () => {
    return <Box flex={1} bg={"gray.100"} p={4} height={"500px"}></Box>;
};

const TextInput = ({ label, block, area, required }) => {
    return (
        <VStack
            w={"full"}
            alignItems={"flex-start"}
            flex={block && 1}
            spacing={3}
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
                <Input size={"sm"} borderRadius={0} />
            )}
        </VStack>
    );
};
export default index;
