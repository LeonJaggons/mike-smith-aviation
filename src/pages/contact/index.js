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
    Divider,
    useMediaQuery,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PageImageCover from "../../components/PageImageCover";
import { useSelector } from "react-redux";
import { addNewLead } from "@/firebase/leads_helpers";
import Head from "next/head";

function index() {
    const isMobile = useSelector((state) => state.app.isMobile);
    const [isLargerThan800] = useMediaQuery("(min-width: 1000px)");
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
                <Heading>Chat with our team</Heading>
                <Divider my={6} />
                <Stack
                    alignItems={"start"}
                    spacing={12}
                    direction={isMobile || !isLargerThan800 ? "column" : "row"}
                    w={"full"}
                >
                    <ContactForm />
                    <VStack h={"full"} flex={3}>
                        <Box flex={1}></Box>
                        <Box w={"full"} borderRadius={5} overflow={0}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3134.5922315448574!2d-122.27431399999999!3d38.2193627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808509062c81bd57%3A0xcc07e858616877c5!2sMike%20Smith%20Aviation%20Napa!5e0!3m2!1sen!2sus!4v1700454240246!5m2!1sen!2sus"
                                width="100%"
                                height={320}
                                style={{ border: 0, borderRadius: 5 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Box>
                    </VStack>
                </Stack>
                {/* <Image
                    src={"/contact_1.jpg"}
                    w={isMobile ? "100%" : "40%"}
                    borderRadius={5}
                /> */}
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
        <Box flex={2}>
            <Text mb={6}>
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
                    variant={"filled"}
                    rows={5}
                    resize={"none"}
                    borderRadius={0}
                    onChange={onChange}
                />
            ) : (
                <Input
                    size={"md"}
                    variant={"filled"}
                    type={type ? type : "text"}
                    borderRadius={0}
                    onChange={onChange}
                />
            )}
        </VStack>
    );
};
export default index;
