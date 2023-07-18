import { documentCategories } from "@/constants";
import {
    Box,
    Button,
    Card,
    Center,
    SimpleGrid,
    HStack,
    Heading,
    Icon,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Select,
    Text,
    Textarea,
    VStack,
    useDisclosure,
    CardBody,
    Spinner,
    useToast,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Divider,
    Collapse,
    Accordion,
    AccordianItem,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Tab,
    Checkbox,
    Alert,
    AlertDescription,
    AlertIcon,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerBody,
    Tag,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaFileUpload, FaHistory, FaPlus, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
    MdClose,
    MdDelete,
    MdDownload,
    MdEdit,
    MdEditNote,
    MdFileCopy,
    MdFilePresent,
    MdImage,
    MdInfoOutline,
    MdIosShare,
    MdMoreVert,
    MdNotes,
    MdSend,
} from "react-icons/md";
import {
    addDocumentDeleteLog,
    addDocumentDownloadLog,
    addDocumentUploadLog,
    deleteDocument,
    getDocumentHistory,
    streamDocuments,
    uploadDocument,
} from "@/firebase/document_helpers";
import axios from "axios";
import { getUserByID } from "@/firebase/firestore_helpers";
import moment from "moment";
function index() {
    const isSignedIn = useSelector((state) => state.app.isSignedIn);
    useEffect(() => {
        const unsubDocuments = streamDocuments();
        return () => {
            unsubDocuments();
        };
    }, []);

    const [isExpired, setIsExpired] = useState(null);
    return isSignedIn ? (
        <Box mt={"58px"}>
            <DocumentAccessExpiration setIsExpired={setIsExpired} />
            <VStack align={"start"} pt={4}>
                <HStack w={"full"} justify={"space-between"}>
                    <Heading size={"lg"}>Documents</Heading>

                    <HStack>
                        <AddNewDocButton />
                        <HistoryButton />
                    </HStack>
                </HStack>

                <Input placeholder={"Search..."} borderRadius={0} />
                <DocumentGallery isExpired={isExpired} />
            </VStack>
        </Box>
    ) : (
        <Heading mt={"80px"}>NOT SIGNED IN</Heading>
    );
}

const DocumentAccessExpiration = ({ setIsExpired }) => {
    const [daysToExpire, setDaysToExpire] = useState();
    const user = useSelector((state) => state.app.user);

    const recalcDaysToExpire = async () => {
        const dbUser = await getUserByID(user.uid);
        const expDate = moment(dbUser.accessExpirationDate.toDate());
        const today = moment();
        const expireDays = expDate.diff(today, "day");
        const expireMinutes = expDate.diff(today, "minute");
        setDaysToExpire(expireDays < 0 ? 0 : expireDays);
        setIsExpired(user.adminRole <= 4 && expireMinutes <= 0);
    };
    useEffect(() => {
        user && recalcDaysToExpire();
    }, [user]);
    return daysToExpire !== null &&
        daysToExpire <= 14 &&
        user.adminRole <= 4 ? (
        <Alert mb={2} status={daysToExpire > 0 ? "info" : "error"}>
            <AlertIcon />
            <AlertDescription>
                {daysToExpire} day{daysToExpire !== 1 ? "s" : ""} of document
                access remaining.
            </AlertDescription>

            <Button
                borderRadius={"0"}
                ml={"auto"}
                size={"sm"}
                colorScheme={daysToExpire > 0 ? "blue" : "red"}
                bg={(daysToExpire > 0 ? "blue" : "red") + ".500"}
            >
                Request extension
            </Button>
        </Alert>
    ) : (
        <></>
    );
};

const AddNewDocButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useSelector((state) => state.app.user);
    return (
        user.adminRole >= 4 && (
            <>
                <Button
                    onClick={onOpen}
                    colorScheme={"black"}
                    size={"sm"}
                    variant={"ghost"}
                    leftIcon={<Icon as={FaPlus} />}
                    borderRadius={0}
                >
                    Add New Document
                </Button>
                <AddDocModal isOpen={isOpen} onClose={onClose} />
            </>
        )
    );
};
const HistoryButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useSelector((state) => state.app.user);
    return (
        user.adminRole >= 4 && (
            <>
                <Button
                    isDisabled={isOpen}
                    onClick={onOpen}
                    colorScheme={"black"}
                    size={"sm"}
                    variant={"ghost"}
                    leftIcon={<Icon as={FaHistory} />}
                    borderRadius={0}
                >
                    History
                </Button>
                <HistoryDrawer isOpen={isOpen} onClose={onClose} />
            </>
        )
    );
};

const HistoryDrawer = ({ isOpen, onClose }) => {
    const [docHist, setDocHist] = useState();
    const loadDocHist = async () => {
        const dh = await getDocumentHistory();
        setDocHist([...dh]);
    };
    useEffect(() => {
        isOpen && loadDocHist();
    }, [isOpen]);
    return (
        <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody p={6}>
                    <Heading mb={2} size={"md"}>
                        History
                    </Heading>
                    {docHist ? (
                        <HistoryList docHist={docHist} />
                    ) : (
                        <Center w={"full"} h={"400px"}>
                            <Spinner />
                        </Center>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};
const HistoryList = ({ docHist }) => {
    return (
        <SimpleGrid columns={4} spacing={4} alignItems={"center"}>
            {docHist?.map((dh) => (
                <DocHist dh={dh} />
            ))}
        </SimpleGrid>
    );
};

const DocHist = ({ dh }) => {
    const activityStyle = {
        DELETE: {
            color: "red",
        },
        UPLOAD: {
            color: "green",
        },
        DOWNLOAD: {
            color: "blue",
        },
    };
    return (
        <>
            <Tag
                justifyContent={"center"}
                colorScheme={activityStyle[dh.activityCode].color}
            >
                {dh.activityCode}
            </Tag>
            <Text fontSize={"12px"}>
                {dh.firstName} {dh.lastName}
            </Text>
            <Text fontSize={"12px"}>{dh.docName}</Text>
            <Text fontSize={"12px"}>
                {moment(dh.createdDate.toDate()).format("M/DD/YY h:mma")}
            </Text>
        </>
    );
};

const AddDocModal = ({ isOpen, onClose }) => {
    const [rawFile, setRawFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.app.user);
    const emptyCustomData = {
        fileName: "",
        fileType: "",
        documentType: "",
        description: "",
        createdBy: user.uid,
    };
    const [customData, setCustomData] = useState(emptyCustomData);
    const [isDisabled, setIsDisabled] = useState(true);

    const updateCustomData = (param, e) =>
        setCustomData({
            ...customData,
            [param]: e?.target ? e.target.value : e,
        });

    const setFileName = (e) => updateCustomData("fileName", e);
    const setFileType = (e) => updateCustomData("fileType", e);
    const setDocumentType = (e) => updateCustomData("documentType", e);
    const setDescription = (e) => updateCustomData("description", e);

    const handleUploadDocument = async () => {
        setLoading(true);
        const dc = await uploadDocument(rawFile, customData);
        setLoading(false);
        await addDocumentUploadLog(dc);
        onClose();
    };

    useEffect(() => {
        if (
            customData.fileName.trim() === "" ||
            customData.description.trim() === "" ||
            customData.documentType === "" ||
            !rawFile
        )
            setIsDisabled(true);
        else {
            setIsDisabled(false);
        }
    }, [rawFile, customData]);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius={0}>
                <ModalBody p={6}>
                    <Heading size={"md"}>Add New Document</Heading>
                    <VStack mt={4} w={"full"} spacing={4}>
                        <DocUpload
                            setRawFile={setRawFile}
                            setFileType={setFileType}
                        />
                        <TextInput label={"Name"} onChange={setFileName} />
                        <TextInput
                            label={"Description"}
                            onChange={setDescription}
                            area
                        />
                        <DocCategorySelect onChange={setDocumentType} />
                        <HStack
                            mt={2}
                            w={"full"}
                            alignItems={"center"}
                            justify={"end"}
                        >
                            <Button
                                onClick={onClose}
                                variant={"ghost"}
                                borderRadius={0}
                                size={"sm"}
                            >
                                Cancel
                            </Button>
                            <Button
                                isDisabled={isDisabled}
                                isLoading={loading}
                                onClick={handleUploadDocument}
                                color={"white"}
                                bg={"black"}
                                colorScheme="blackAlpha"
                                borderRadius={0}
                                leftIcon={<Icon as={FaUpload} />}
                                size={"sm"}
                            >
                                Confirm
                            </Button>
                        </HStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

const DocCategorySelect = ({ onChange }) => {
    return (
        <VStack align={"start"} w={"full"}>
            <Heading size={"xs"}>Category</Heading>
            <Select
                borderRadius={0}
                defaultValue={""}
                onChange={(e) => {
                    onChange(e);
                }}
            >
                {documentCategories.map(({ name }) => (
                    <option value={name}>{name}</option>
                ))}
            </Select>
        </VStack>
    );
};

const DocUpload = ({ setRawFile, setFileType }) => {
    const [file, setFile] = useState(null);
    const [filetype, setFiletype] = useState(null);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const handleFileSelected = (e) => {
        const files = Array.from(e.target.files);
        setFile(files[0]);
        const fileName = files[0].name;
        const fileType = fileName
            .substring(fileName.lastIndexOf(".") + 1)
            .toLowerCase();
        setFiletype(fileType);
        setRawFile(files[0]);
        setFileType(fileType);
    };
    const handleClick = () => {
        inputRef.current?.click();
    };

    useEffect(() => {
        file && setPreview(URL.createObjectURL(file));
    }, [file]);

    return file ? (
        <VStack p={"12px"} w={"full"} bg={"gray.100"} borderRadius={"md"}>
            <HStack w={"full"} justify={"space-between"}>
                <FileTypeIcon filetype={filetype} />
                <HStack>
                    <IconButton
                        p={1}
                        onClick={() => setFile(null)}
                        variant={"link"}
                        color={"black"}
                        icon={<Icon as={MdClose} />}
                    />
                    <IconButton
                        p={1}
                        // onClick={() => setFile(null)}
                        variant={"link"}
                        color={"black"}
                        icon={<Icon as={MdMoreVert} />}
                    />
                </HStack>
            </HStack>
            <HStack w={"full"}>
                <Text noOfLines={1}>{file.name}</Text>
            </HStack>
        </VStack>
    ) : (
        <>
            <Button
                w={"full"}
                h={"70px"}
                onClick={handleClick}
                borderRadius={0}
                leftIcon={<Icon as={FaFileUpload} />}
                borderStyle={"dashed"}
                borderWidth={2}
                color={"gray.600"}
            >
                Upload File...
            </Button>
            <Input
                onChange={handleFileSelected}
                ref={inputRef}
                type={"file"}
                display={"none"}
            />
        </>
    );
};

const FileTypeIcon = ({ filetype }) => {
    const colors = {
        jpeg: "green",
        jpg: "green",
        png: "green",
        pdf: "blue",
        doc: "blue",
        docx: "blue",
    };
    const icons = {
        jpeg: MdImage,
        jpg: MdImage,
        png: MdImage,
        pdf: MdNotes,
        doc: MdNotes,
        docx: MdNotes,
    };
    return (
        <Center
            boxSize={"20px"}
            bg={
                (Object.keys(colors).includes(filetype)
                    ? colors[[filetype]]
                    : "gray") + ".500"
            }
            borderRadius={3}
        >
            <Icon color={"white"} as={icons[[filetype]]} />
        </Center>
    );
};

const TextInput = ({ label, area, onChange }) => {
    return (
        <VStack align={"start"} w={"full"}>
            <Heading size={"xs"}>{label}</Heading>
            {area ? (
                <Textarea borderRadius={0} onChange={onChange} />
            ) : (
                <Input borderRadius={0} onChange={onChange} />
            )}
        </VStack>
    );
};

const DocumentGallery = ({ isExpired }) => {
    const documents = useSelector((state) => state.app.documents);
    console.log(documents);
    return (
        <SimpleGrid columns={[1, 1, 2, 3]} w={"full"} spacing={2}>
            {documents.map((d) => (
                <Document key={d.docID} doc={d} isExpired={isExpired} />
            ))}
        </SimpleGrid>
    );
};

const Document = ({ doc, isCard, isExpired }) => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const handleDownloadFile = async () => {
        setIsLoading(true);
        const res = await axios.get(doc.url, {
            responseType: "blob",
        });
        const url = URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${doc.fileName}.${doc.fileType}`);
        document.body.appendChild(link);
        link.click();
        toast({
            status: "success",
            description: `Successfully downloaded ${doc.fileName}`,
            duration: 2000,
        });
        setIsLoading(false);
        await addDocumentDownloadLog(doc);
    };
    return (
        <Card
            borderRadius={0}
            shaddow={"0"}
            aspectRatio={isCard && 1}
            cursor={"pointer"}
            // as={Link}
            // href={doc.url}
            // target={"_blank"}
        >
            <CardBody>
                <VStack alignItems={"start"} h={"full"}>
                    <HStack w={"full"} justify={"space-between"}>
                        <HStack spacing={4}>
                            <FileTypeIcon filetype={doc.fileType} />
                            {!isLoading ? (
                                <Heading noOfLines={1} size={"xs"}>
                                    {doc.fileName}
                                </Heading>
                            ) : (
                                <Spinner size={"sm"} color={"gray.500"} />
                            )}
                        </HStack>
                        <HStack spacing={"2px"}>
                            <IconButton
                                icon={<Icon as={MdDownload} />}
                                variant={"ghost"}
                                isDisabled={isExpired}
                                onClick={handleDownloadFile}
                            />

                            <DocumentMenu
                                doc={doc}
                                isExpired={isExpired}
                                download={handleDownloadFile}
                            />
                        </HStack>
                    </HStack>
                    {isCard && (
                        <Center
                            borderRadius={5}
                            w={"full"}
                            flex={1}
                            bg={"gray.50"}
                        >
                            <Icon
                                as={MdFilePresent}
                                boxSize={"80px"}
                                color={"gray.400"}
                            />
                        </Center>
                    )}
                </VStack>
            </CardBody>
        </Card>
    );
};

const DocumentMenu = ({ download, doc, isExpired }) => {
    const user = useSelector((state) => state.app.user);
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    variant={"ghost"}
                    onMouseOver={(e) => e.stopPropagation()}
                    icon={<Icon as={MdMoreVert} />}
                    p={2}
                ></IconButton>
            </PopoverTrigger>
            <PopoverContent borderRadius={0} w={"200px"}>
                <PopoverBody p={0} py={1}>
                    <DetailButton doc={doc} />
                    {user.adminRole >= 4 && <Divider my={1} />}
                    <DocumentMenuButton
                        disabled={isExpired}
                        icon={MdDownload}
                        onClick={download}
                    >
                        Download
                    </DocumentMenuButton>
                    {user.adminRole >= 4 && (
                        <>
                            <SendButton doc={doc} />
                            <DocumentMenuButton icon={MdEdit}>
                                Rename
                            </DocumentMenuButton>
                            <DocumentMenuButton icon={MdEditNote}>
                                Edit details
                            </DocumentMenuButton>
                            <Divider my={1} />
                            <DeleteButton doc={doc} />
                        </>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const DeleteButton = ({ doc }) => {
    const [loading, setLoading] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const handleDelete = async () => {
        setLoading(true);

        await deleteDocument(doc);
        setLoading(false);
        onClose();
        await addDocumentDeleteLog(doc);
    };
    return (
        <>
            <DocumentMenuButton icon={MdDelete} onClick={onOpen}>
                Move to trash
            </DocumentMenuButton>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay></ModalOverlay>
                <ModalContent borderRadius={0}>
                    <ModalBody p={6}>
                        <VStack alignItems={"start"}>
                            <Heading size={"md"} mb={2}>
                                Delete {doc.fileName}?
                            </Heading>
                            <Text fontSize={"md"}>
                                Are you sure you want to delete {doc.fileName}?
                                This action is permanent and cannot be undone.
                            </Text>
                            <HStack
                                mt={4}
                                w={"full"}
                                align={"end"}
                                justifyContent={"end"}
                            >
                                <Button
                                    variant={"ghost"}
                                    borderRadius={0}
                                    size={"sm"}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme={"red"}
                                    borderRadius={0}
                                    size={"sm"}
                                    onClick={handleDelete}
                                    isLoading={loading}
                                >
                                    Delete
                                </Button>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const DetailButton = ({ doc }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [createUser, setCreateUser] = useState(null);

    const loadCreateUser = async () => {
        const usr = await getUserByID(doc.createdBy);
        setCreateUser({ ...usr });
    };

    useEffect(() => {
        loadCreateUser();
    }, []);
    return (
        <>
            <DocumentMenuButton icon={MdInfoOutline} onClick={onOpen}>
                Details
            </DocumentMenuButton>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay></ModalOverlay>
                <ModalContent borderRadius={0}>
                    <ModalBody p={6}>
                        <VStack spacing={4} w={"full"} align={"start"}>
                            <HStack>
                                <FileTypeIcon filetype={doc.fileType} />
                                <Heading size={"sm"}>{doc.fileName}</Heading>
                            </HStack>
                            {createUser && (
                                <DetailLine
                                    label={"Created by"}
                                    value={
                                        createUser.firstName +
                                        " " +
                                        createUser.lastName
                                    }
                                />
                            )}
                            <DetailLine
                                label={"Document name"}
                                value={doc.fileName}
                            />
                            <DetailLine
                                label={"Document category"}
                                value={doc.documentType}
                            />
                            <DetailLine
                                label={"File type"}
                                value={doc.fileType}
                            />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const DetailLine = ({ label, value }) => {
    return (
        <VStack spacing={1} w={"full"} align={"start"}>
            <Heading fontSize={"14px"} fontWeight={500}>
                {label}
            </Heading>
            <Text fontSize={"12px"}>{value}</Text>
        </VStack>
    );
};

const SendButton = ({ doc }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [createUser, setCreateUser] = useState(null);

    return (
        <>
            <DocumentMenuButton icon={MdSend} onClick={onOpen}>
                Send
            </DocumentMenuButton>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay></ModalOverlay>
                <ModalContent borderRadius={0}>
                    <ModalBody p={6}>
                        <VStack w={"full"}>
                            <HStack mb={4} w={"full"}>
                                <FileTypeIcon filetype={doc.fileType} />
                                <Heading size={"sm"}>{doc.fileName}</Heading>
                            </HStack>
                            <Tabs isFitted w={"full"}>
                                <TabList>
                                    <Tab>MSA Member</Tab>
                                    <Tab>Other</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel px={0}>
                                        <Select borderRadius={0}></Select>
                                    </TabPanel>
                                    <TabPanel px={0}>
                                        <Input borderRadius={0} />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                            <VStack w={"full"} align={"start"} spacing={1}>
                                <Heading fontWeight={600} size={"xs"}>
                                    Add a comment
                                </Heading>
                                <Textarea
                                    borderRadius={0}
                                    rows={4}
                                    resize={"none"}
                                />
                            </VStack>
                            <Button
                                borderRadius={0}
                                w={"full"}
                                colorScheme="blue"
                            >
                                Send
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const DocumentMenuButton = ({ icon, children, onClick, disabled }) => {
    return (
        <Button
            borderRadius={0}
            isDisabled={disabled}
            w={"full"}
            size={"md"}
            onClick={onClick && onClick}
            justifyContent={"start"}
            variant={"ghost"}
            colorScheme={"gray"}
            p={3}
            leftIcon={icon && <Icon as={icon} mr={2} />}
            fontWeight={500}
            color={"gray.600"}
        >
            {children}
        </Button>
    );
};
export default index;
