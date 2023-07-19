import Providers from "@/components/Providers";
import "@/styles/globals.css";
import { NavBar } from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SizeMe } from "react-sizeme";
import PageImageCover from "../components/PageImageCover";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase_init";
import store from "@/redux/store";
import { getUserByID } from "@/firebase/firestore_helpers";

export default function App({ Component, pageProps }) {
    const [isLanding, setIsLanding] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user) {
                getUserByID(user.uid).then((dbUser) => {
                    store.dispatch({
                        type: "SET",
                        attr: "user",
                        payload: { userID: user.uid, ...user, ...dbUser },
                    });
                    store.dispatch({
                        type: "SET",
                        attr: "isSignedIn",
                        payload: true,
                    });
                });
            } else {
                store.dispatch({
                    type: "SET",
                    attr: "user",
                    payload: null,
                });
                store.dispatch({
                    type: "SET",
                    attr: "isSignedIn",
                    payload: false,
                });
                router.push("/");
            }
        });
        return unsub;
    }, []);
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
