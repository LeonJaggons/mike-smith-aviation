import { getAllPhotos } from "@/firebase/gallery_helper";
import {
    Center,
    SimpleGrid,
    Spinner,
    Image,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Heading,
    VStack,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function index() {
    const [photos, setPhotos] = useState(null);
    const loadAllPhotos = async () => {
        const allPhotos = await getAllPhotos();
        setPhotos([...allPhotos]);
    };
    useEffect(() => {
        loadAllPhotos();
    }, []);
    return !photos ? (
        <Center h={"full"} w={"full"}>
            <Spinner />
        </Center>
    ) : (
        <VStack spacing={4}>
            <Text>
                Step into the captivating world of aviation through our gallery.
                Here, you can witness the breathtaking moments captured during
                our flight training sessions, scenic flights, and thrilling
                aviation events. Immerse yourself in the beauty of flight and
                get inspired to embark on your own aerial adventures with Mike
                Smith Aviation!
            </Text>
            <PhotoGallery photos={photos} />
        </VStack>
    );
}

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
            <LightBoxModal isOpen={isOpen} onClose={onClose} img={img} />
            <SimpleGrid columns={isMobile ? 3 : [2, 3, 4, 4]} spacing={2}>
                {photos.map((p, i) => (
                    <GalleryImage key={p} openModal={openModal} src={p} />
                ))}
            </SimpleGrid>
        </>
    );
};

const LightBoxModal = ({ isOpen, onClose, img }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"4xl"}>
            <ModalOverlay />
            <ModalContent bg={"transparent"} shadow={0}>
                <ModalBody p={0} w={"full"} shadow={0}>
                    <Image
                        src={img}
                        borderRadius={5}
                        minW={"50vw"}
                        maxW={"80vw"}
                        maxH={"80vh"}
                        objectFit={"cover"}
                        h={null}
                    />
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
    );
};
export default index;
