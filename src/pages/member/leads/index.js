import {
    Box,
    Button,
    HStack,
    Heading,
    Icon,
    IconButton,
    Table,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React from "react";
import { MdExpand, MdExpandMore, MdMore } from "react-icons/md";

function index() {
    return (
        <Box pt={"74px"}>
            <Heading mb={4}>Leads</Heading>
            <Table>
                <Thead>
                    <Tr>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <LeadRow lead={{}} />
                </Tbody>
            </Table>
        </Box>
    );
}
const LeadRow = ({ lead }) => {
    return (
        <Tr>
            <Td>{lead.firstName}</Td>
            <Td>{lead.lastName}</Td>
            <Td>{lead.email}</Td>
            <Td>
                <Tag size={"lg"} variant={"outline"} colorScheme={"green"}>
                    STATUS
                </Tag>
            </Td>
            <Td>
                <HStack>
                    <Button>Contact</Button>

                    <IconButton
                        size={"md"}
                        variant={"link"}
                        icon={<Icon as={MdExpandMore} />}
                    ></IconButton>
                </HStack>
            </Td>
        </Tr>
    );
};

export default index;
