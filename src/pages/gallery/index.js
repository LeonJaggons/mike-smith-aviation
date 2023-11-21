import { getAllPhotos } from "@/firebase/gallery_helper";
import {
    Center,
    SimpleGrid,
    Spinner,
    Image,
    Modal,
    useDisclosure,
    HStack,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    VStack,
    Text,
    Button,
    Icon,
    Input,
    Textarea,
    Divider,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { MdUpload } from "react-icons/md";
import { useSelector } from "react-redux";

function index() {
    const [photos, setPhotos] = useState(null);
    const isSignedIn = useSelector((state) => state.app.isSignedIn);
    const loadAllPhotos = async () => {
        const allPhotos = await getAllPhotos();
        setPhotos([...allPhotos]);
    };
    useEffect(() => {
        loadAllPhotos();
    }, []);
    return (
        <>
            <Head>
                <title>Gallery - Mike Smith Aviation</title>
                <meta
                    name="description"
                    content="Journey through the Skies: Explore our Captivating Gallery at Mike Smith Aviation | Napa, CA Flight School Adventures"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Heading>Gallery</Heading>
            <Divider my={6} />
            {!photos ? (
                <Center h={"full"} w={"full"}>
                    <Spinner />
                </Center>
            ) : (
                <VStack spacing={4}>
                    <Text>
                        Step into the captivating world of aviation through our
                        gallery. Here, you can witness the breathtaking moments
                        captured during our flight training sessions, scenic
                        flights, and thrilling aviation events. Immerse yourself
                        in the beauty of flight and get inspired to embark on
                        your own aerial adventures with Mike Smith Aviation!
                    </Text>
                    {isSignedIn && <UploadPhotoButton />}
                    <PhotoGallery photos={photos} />
                </VStack>
            )}
        </>
    );
}

const UploadPhotoButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button
                w={"full"}
                leftIcon={<Icon as={MdUpload} />}
                onClick={onOpen}
                h={"60px"}
            >
                Upload Photo
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay></ModalOverlay>
                <ModalContent>
                    <ModalBody>
                        <ImageUpload />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

const ImageUpload = () => {
    const inputRef = useRef();
    const [file, setFile] = useState();
    const [fileURL, setFileURL] = useState();
    const [fileType, setFileType] = useState();
    const handleClick = () => {
        inputRef.current && inputRef.current.click();
    };
    const handleFileSelected = (e) => {
        const files = Array.from(e.target.files);
        setFile(files[0]);
        setFileURL(URL.createObjectURL(files[0]));
        const fileName = files[0].name;
        const fileType = fileName
            .substring(fileName.lastIndexOf(".") + 1)
            .toLowerCase();
        setFileType(fileType);
    };
    return (
        <>
            {fileURL ? (
                <VStack w={"full"} py={4} spacing={4}>
                    <Image src={fileURL} w={"full"}></Image>
                    <TextInput label={"Name"} />
                    <TextInput area label={"Description"} />
                    <Button w={"full"} colorScheme={"blue"} borderRadius={0}>
                        Submit for Approval
                    </Button>
                </VStack>
            ) : (
                <Button w={"full"} onClick={handleClick}>
                    Upload an image...
                </Button>
            )}
            <Input
                onChange={handleFileSelected}
                ref={inputRef}
                display={"none"}
                type={"file"}
            />
        </>
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
const PhotoGallery = ({ photos }) => {
    const [img, setImg] = useState(null);
    const isMobile = useSelector((state) => state.app.isMobile);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const openModal = (src) => {
        setImg(src);
        onOpen();
    };
    return (
        <>
            <SimpleGrid columns={isMobile ? 3 : [2, 3, 4, 4]} spacing={2}>
                {photos.map((p, i) => (
                    <GalleryImage key={p} openModal={openModal} src={p} />
                ))}
            </SimpleGrid>
            <LightBoxModal isOpen={isOpen} onClose={onClose} img={img} />
        </>
    );
};

const LightBoxModal = ({ isOpen, onClose, img, photos }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"full"}>
            <ModalOverlay />
            <ModalContent shadow={0}  bg={"transparent"} onClick={onClose}>
                <ModalBody shadow={0} h={"full"} display={"flex"} flexFlow={"column nowrap"} >
                    <Button onClick={onClose}>Close</Button>
                    <HStack w={"full"} flex={1}>
                        <Button onClick={e => e.stopPropagation()}>Prev</Button>

                    <Center flex={1} h={"full"} >

                    <Image
                        onClick={e => e.stopPropagation()}
                        src={img}
                        h={"70vh"}
                        borderRadius={5}
                        objectFit={"cover"}
                    />
                    </Center>
                        <Button
                        onClick={e => e.stopPropagation()}
                        >Next</Button>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

const GalleryImage = ({ src, openModal, index }) => {
    const isMobile = useSelector((state) => state.app.isMobile);
    const [loading, setLoading] = useState(true);
    const openImage = () => {
        openModal(src);
    };
    return (
        <>
            <Image
                onLoad={() => setLoading(false)}
                onMouseDown={openImage}
                aspectRatio={isMobile && 1}
                borderRadius={3}
                src={src}
                h={isMobile ? "full" : "220px"}
                w={"full"}
                objectFit={"cover"}
                cursor={"pointer"}
                loading={loading}
            />
        </>
    );
};
export default index;
