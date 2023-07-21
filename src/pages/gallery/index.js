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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

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
        <PhotoGallery photos={photos} />
    );
}

const PhotoGallery = ({ photos }) => {
    const [img, setImg] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const openModal = (src) => {
        setImg(src);
        onOpen();
    };
    return (
        <>
            <LightBoxModal isOpen={isOpen} onClose={onClose} img={img} />
            <SimpleGrid columns={[2, 3, 4, 4]} spacing={2}>
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
    const [loading, setLoading] = useState(true);
    const openImage = () => {
        openModal(src);
    };
    return (
        <Image
            onLoad={() => setLoading(false)}
            onMouseDown={openImage}
            borderRadius={3}
            src={src}
            h={"220px"}
            w={"full"}
            objectFit={"cover"}
            cursor={"pointer"}
            loading={loading}
        />
    );
};
export default index;
