import Providers from "@/components/Providers";
import "@/styles/globals.css";
import { NavBar } from "./NavBar";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SizeMe } from "react-sizeme";
import PageImageCover from "./PageImageCover";

export default function App({ Component, pageProps }) {
    const [isLanding, setIsLanding] = useState(false);
    const router = useRouter();
    const covers = {
        "/contact": {
            src: "/contact.jpg",
            title: "CONTACT US",
            sub: "We want to hear from you.",
        },
        "/mission": {
            src: "/mission.jpg",
            title: "MISSION STATEMENT",
            sub: "We want to hear from you.",
        },
        "/fleet": {
            src: "/fleet.jpg",
            title: "OUR FLEET",
            sub: "We want to hear from you.",
        },
        "/team": {
            src: "/team.jpg",
            title: "OUR TEAM",
            sub: "We want to hear from you.",
        },
    };

    return (
        <Providers>
            <SizeMe>
                {({ size }) => (
                    <>
                        <NavBar size={size} />
                        {/* {router.pathname !== "/" && <Box h={"64px"} />} */}
                        {Object.keys(covers).includes(router.pathname) && (
                            <PageImageCover {...covers[[router.pathname]]} />
                        )}
                        {router.pathname !== "/" ? (
                            <Box px={"10%"} py={"16px"} h={"100vh"}>
                                <Component {...pageProps} />
                            </Box>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </>
                )}
            </SizeMe>
        </Providers>
    );
}
