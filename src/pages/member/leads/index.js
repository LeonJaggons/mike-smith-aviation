import {
    softDeleteLead,
    streamLeads,
    updateLeadStatus,
} from "@/firebase/leads_helpers";
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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import {
    MdDelete,
    MdEdit,
    MdEmail,
    MdExpand,
    MdExpandMore,
    MdMore,
    MdMoreHoriz,
    MdPhone,
    MdThumbDown,
} from "react-icons/md";
import { useSelector } from "react-redux";
function index() {
    useEffect(() => {
        const unsubLeads = streamLeads();
        return () => {
            unsubLeads();
        };
    }, []);
    return (
        <Box mt={"54px"}>
            <VStack w={"full"} alignItems={"start"} spacing={4}>
                <Heading>Leads</Heading>
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
            <Table overflowX={"scroll"} w={"full"}>
                <Thead>
                    <Tr>
                        <Th>Age</Th>
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
    const [deleteOpen, setDeleteOpen] = useState(false);
    const openDelete = () => setDeleteOpen(true);
    const closeDelete = () => setDeleteOpen(false);
    const handleDelete = async () => {
        await softDeleteLead(lead.leadID);
    };

    return (
        <Tr>
            <Td>
                <Text fontSize={"sm"}>{lead.leadAge}</Text>
            </Td>
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
                        <MenuItem
                            as={Link}
                            href={`tel:${lead.phone}`}
                            icon={<Icon as={MdPhone} />}
                        >
                            Call
                        </MenuItem>
                        <MenuItem
                            as={Link}
                            href={`mailto:${lead.email}`}
                            icon={<Icon as={MdEmail} />}
                        >
                            Email
                        </MenuItem>
                        <MenuItem
                            icon={<Icon as={MdDelete} />}
                            onClick={handleDelete}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
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
                        fontSize={"12px"}
                        variant={"solid"}
                        colorScheme={statusColor[status]}
                        borderRadius={0}
                        textAlign={"center"}
                        justifyContent={"center"}
                        fontWeight={700}
                        w={"full"}
                        h={"36px"}
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
