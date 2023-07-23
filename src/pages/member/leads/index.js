import { streamLeads, updateLeadStatus } from "@/firebase/leads_helpers";
import {
    Box,
    Button,
    HStack,
    Heading,
    VStack,
    Icon,
    IconButton,
    Table,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Link,
    Input,
    PopoverTrigger,
    Popover,
    PopoverContent,
    PopoverBody,
    Text,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdExpand, MdExpandMore, MdMore } from "react-icons/md";
import { useSelector } from "react-redux";

function index() {
    useEffect(() => {
        const unsubLeads = streamLeads();
        return () => {
            unsubLeads();
        };
    }, []);
    return (
        <Box pt={"74px"}>
            <VStack w={"full"} alignItems={"start"} spacing={4}>
                <Heading mb={4}>Leads</Heading>
                <Input placeholder={"Search leads..."} />
                <LeadTable />
            </VStack>
        </Box>
    );
}
const LeadTable = () => {
    const leads = useSelector((state) => state.app.leads);
    return (
        <Box overflowX={"scroll"}>
            <Table overflowX={"scroll"}>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Message</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {leads.map((l) => (
                        <LeadRow lead={l} />
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};
const LeadRow = ({ lead }) => {
    return (
        <Tr>
            <Td>
                <Text fontSize={"sm"}>{lead.name}</Text>
            </Td>
            <Td>
                <Text fontSize={"sm"}>{lead.email}</Text>
            </Td>
            <Td>
                <Link href={`tel:${lead.phone}`} fontSize={"sm"}>
                    {lead.phone}
                </Link>
            </Td>
            <Td>
                <Text fontSize={"sm"}>{lead.message}</Text>
            </Td>
            <Td>
                <LeadStatusTag
                    leadID={lead.leadID}
                    currStatus={lead.leadStatus}
                />
            </Td>

            <Td>
                <HStack>
                    <VStack>
                        <Button size={"sm"} w={"full"}>
                            Contact
                        </Button>
                    </VStack>
                    {/* <IconButton
                        size={"sm"}
                        variant={"link"}
                        icon={<Icon as={MdExpandMore} />}
                    ></IconButton> */}
                </HStack>
            </Td>
        </Tr>
    );
};
const LeadStatusTag = ({ leadID, currStatus }) => {
    const [status, setStatus] = useState(currStatus);
    const statuses = [
        "NEW",
        "CONTACTED",
        "IN PROGRESS",
        "ON HOLD",
        "NO RESPONSE",
        "NOT INTERESTED",
    ];
    const statusColor = {
        NEW: "green",
        CONTACTED: "blue",
        "IN PROGRESS": "teal",
        "ON HOLD": "yellow",
        "NO RESPONSE": "gray",
        "NOT INTERESTED": "red",
    };
    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Tag
                        cursor={"pointer"}
                        size={"lg"}
                        variant={"solid"}
                        colorScheme={statusColor[status]}
                        borderRadius={0}
                        textAlign={"center"}
                        justifyContent={"center"}
                        fontSize={12}
                        fontWeight={"bold"}
                        p={2}
                        w={"full"}
                    >
                        {status}
                    </Tag>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverBody p={0}>
                        <VStack>
                            {statuses.map((s) => (
                                <UpdateStatusButton
                                    setStatus={setStatus}
                                    leadID={leadID}
                                    status={s}
                                />
                            ))}
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    );
};

const UpdateStatusButton = ({ leadID, status, setStatus }) => {
    const handlePress = async () => {
        setStatus(status);
        await updateLeadStatus(leadID, status);
    };
    return (
        <Button
            w={"full"}
            borderRadius={0}
            fontWeight={500}
            size={"sm"}
            variant={"ghost"}
            onClick={handlePress}
            color={"gray.600"}
        >
            {status}
        </Button>
    );
};

export default index;
