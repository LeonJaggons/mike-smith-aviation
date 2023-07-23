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
import React, { useEffect, useState } from "react";
import PageImageCover from "../../components/PageImageCover";
import { useSelector } from "react-redux";
import { addNewLead } from "@/firebase/leads_helpers";
import Head from "next/head";

function index() {
    const isMobile = useSelector((state) => state.app.isMobile);
    return (
        <>
            <Head>
                <title>Contact Us - Mike Smith Aviation</title>
                <meta
                    name="description"
                    content="Reach for the Skies - Contact Mike Smith Aviation: Get in Touch for Inquiries, Enrollment & Exciting Flying Opportunities in Napa, CA"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box>
                <Stack
                    alignItems={"start"}
                    spacing={8}
                    direction={isMobile ? "column" : "row"}
                >
                    <ContactForm />
                    {/* <Image
                    src={"/contact_1.jpg"}
                    w={isMobile ? "100%" : "40%"}
                    borderRadius={5}
                /> */}
                </Stack>
            </Box>
        </>
    );
}

const ContactForm = () => {
    const emptyMsg = {
        name: "",
        email: "",
        phone: "",
        message: "",
    };
    const [msg, setMsg] = useState(emptyMsg);

    const updateMsg = (param, e) =>
        setMsg({
            ...msg,
            [param]: e.target ? e.target.value : e,
        });
    const setName = (e) => updateMsg("name", e);
    const setEmail = (e) => updateMsg("email", e);
    const setPhone = (e) => updateMsg("phone", e);
    const setMessage = (e) => updateMsg("message", e);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        await addNewLead(msg);
        setLoading(false);
        setMsg(emptyMsg);
    };
    useEffect(() => {
        console.table(msg);
    }, [msg]);
    return (
        <Box
            flex={1}
            borderWidth={1}
            p={8}
            shadow={"md"}
            borderColor={"gray.100"}
        >
            <Heading fontWeight={700} size={"lg"} mb={2}>
                Chat with our team
            </Heading>
            <Text color={"gray.400"} mb={6} fontSize={"sm"}>
                Need help with something? Want more information about our
                programs? Get in touch with our team and we'll get back to you
                very soon.
            </Text>
            <VStack alignItems={"flex-start"} spacing={8}>
                <TextInput label={"Name"} block onChange={setName} />
                <TextInput label={"Email Address"} onChange={setEmail} />
                <TextInput
                    label={"Phone Number"}
                    type={"number"}
                    onChange={setPhone}
                />
                <TextInput
                    label={"What would you like to discuss?"}
                    area
                    onChange={setMessage}
                />
                <Button onClick={handleSubmit} isLoading={loading} w={"full"}>
                    Send
                </Button>
            </VStack>
        </Box>
    );
};
const ContactDetails = () => {
    return <Box flex={1} bg={"gray.100"} p={4} height={"500px"}></Box>;
};

const TextInput = ({ label, block, area, required, onChange, type }) => {
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
                    onChange={onChange}
                />
            ) : (
                <Input
                    size={"sm"}
                    type={type ? type : "text"}
                    borderRadius={0}
                    onChange={onChange}
                />
            )}
        </VStack>
    );
};
export default index;
