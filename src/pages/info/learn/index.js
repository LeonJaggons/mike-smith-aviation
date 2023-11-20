import {
    VStack,
    Heading,
    Text,
    Box,
    Divider,
    Button,
    Icon,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";

function index() {
    return (
        <>
            <Head>
                <title>Learn to Fly - Mike Smith Aviation</title>
                <meta
                    name="description"
                    content="Soar to New Heights at Mike Smith Aviation: Learn to Fly with Confidence and Precision | Expert Flight Training in Napa, CA"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box>
                <Box w={"full"}>
                    <Heading>Learn to Fly</Heading>
                    <Divider my={6} />
                </Box>
                <VStack spacing={8} alignItems={"flex-start"}>
                    <Box>
                        <Text>
                            Learning to fly is a transformative experience that
                            offers a unique sense of freedom, adventure, and
                            accomplishment. As you take control of an aircraft,
                            you'll witness breathtaking views from the cockpit
                            and gain a deeper appreciation for the art and
                            science of flying. Becoming a pilot opens up a world
                            of opportunities, from personal travel to exciting
                            career options in the aviation industry.
                        </Text>
                        <Text mt={4}>
                            At Mike Smith Aviation, we are committed to
                            providing the highest standard of flight training to
                            students of all levels, from beginners to seasoned
                            aviation enthusiasts. Our Learn to Fly programs are
                            carefully designed to cater to your specific goals:
                        </Text>
                    </Box>

                    <Box my={8}>
                        <Heading size={"lg"} mb={4}>
                            Discovery Flight
                        </Heading>
                        <Text>
                            For those curious about flying but not yet ready to
                            commit to a full training program, our Discovery
                            Flights offer the perfect introduction to aviation.
                            Accompanied by one of our experienced flight
                            instructors, you'll take the pilot's seat and soar
                            through the skies, getting a taste of what it's like
                            to control an aircraft.
                        </Text>
                        <Button
                            mt={4}
                            variant={"ghost"}
                            colorScheme={"messenger"}
                            fontWeight={700}
                            rightIcon={<Icon as={MdArrowForwardIos} />}
                        >
                            Book a Discovery Flight
                        </Button>
                    </Box>

                    <Box mb={8}>
                        <Heading size={"lg"} mb={4}>
                            Private Pilot Training
                        </Heading>
                        <Text>
                            Our Private Pilot Training is the foundation for all
                            future aviators. During this comprehensive program,
                            you'll learn the fundamentals of flight, aviation
                            regulations, navigation, and flight safety. With
                            dedicated flight lessons and ground instruction,
                            you'll be well-prepared to pass the Private Pilot
                            License (PPL) examination and obtain the freedom to
                            fly solo.
                        </Text>
                        <Text mt={4}>
                            Flight training can start before or after ground
                            school is complete! Working with a Certified Flight
                            Instructor (CFI), you’ll first learn how to control
                            an aircraft by perfecting aerial maneuvers,
                            practicing takeoffs and landings, and simulating
                            abnormal situations. Once you have successfully
                            completed these, you’ll be able to solo, which is
                            where you are able to fly the airplane alone. To
                            complete your training, you’ll also work on
                            navigation techniques, and fly longer flights in
                            order to get a sense of the trips you might take
                            upon receiving your certificate. After honing your
                            skills and perfecting the ground knowledge, you will
                            be able to take an exam with an FAA examiner, who
                            upon successful completion, can issue your private
                            pilot certificate!
                        </Text>
                        <Button
                            mt={4}
                            variant={"ghost"}
                            colorScheme={"messenger"}
                            fontWeight={700}
                            rightIcon={<Icon as={MdArrowForwardIos} />}
                        >
                            Learn More about Private Pilot Training
                        </Button>
                    </Box>

                    <Box>
                        <Heading size={"lg"} mb={4}>
                            Advanced Flight Training
                        </Heading>
                        <Text>
                            A private pilot certificate permits you to take
                            passengers flying for fun in good weather. If you
                            enhance your pilot skills or make a career out of
                            flying, then moving on to higher ratings after you
                            earn your private pilot certificate is the next
                            step.
                        </Text>
                        <Text mt={4}>
                            Meet airline minimums in our Beechcraft Duchess,
                            build your complex time needed for commercial
                            license, or swap your Rotorcraft over to Multi.
                        </Text>
                        <Accordion mt={4} w={"full"} allowToggle>
                            <AccordionItem border={"none"}>
                                <AccordionButton
                                    _expanded={{
                                        bg: "messenger.800",
                                        color: "white",
                                    }}
                                >
                                    <Box
                                        as={"span"}
                                        flex={1}
                                        textAlign={"left"}
                                        fontSize={"24px"}
                                        fontWeight={700}
                                    >
                                        Instrument Rating (IR)
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel
                                    fontSize={"16px"}
                                    lineHeight={1.8}
                                >
                                    If you want to enhance your flying skills
                                    and gain the ability to navigate through
                                    challenging weather conditions, our
                                    Instrument Rating (IR) Course is the next
                                    step. Under the guidance of our expert
                                    instructors, you'll master instrument flying
                                    techniques, precision approaches, and gain
                                    confidence in handling various flight
                                    scenarios solely by reference to
                                    instruments.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem border={"none"}>
                                <AccordionButton
                                    _expanded={{
                                        bg: "messenger.800",
                                        color: "white",
                                    }}
                                >
                                    <Box
                                        as={"span"}
                                        flex={1}
                                        textAlign={"left"}
                                        fontSize={"24px"}
                                        fontWeight={700}
                                    >
                                        Commercial Pilot Training
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel
                                    fontSize={"16px"}
                                    lineHeight={1.8}
                                >
                                    If you want to enhance your flying skills
                                    and gain the ability to navigate through
                                    challenging weather conditions, our
                                    Instrument Rating (IR) Course is the next
                                    step. Under the guidance of our expert
                                    instructors, you'll master instrument flying
                                    techniques, precision approaches, and gain
                                    confidence in handling various flight
                                    scenarios solely by reference to
                                    instruments.
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem border={"none"}>
                                <AccordionButton
                                    _expanded={{
                                        bg: "messenger.800",
                                        color: "white",
                                    }}
                                >
                                    <Box
                                        as={"span"}
                                        flex={1}
                                        textAlign={"left"}
                                        fontSize={"24px"}
                                        fontWeight={700}
                                    >
                                        Flight Instructor Certification (CFI)
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel
                                    fontSize={"16px"}
                                    lineHeight={1.8}
                                >
                                    The Flight Instructor Certification Program
                                    prepares pilots to become Certified Flight
                                    Instructors (CFIs), sharing their passion
                                    for flight and guiding future aviators. Our
                                    CFI program covers effective instructional
                                    techniques, aviation theory, and practical
                                    training to prepare you for a rewarding
                                    career as a flight instructor.
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        <Button
                            mt={4}
                            variant={"ghost"}
                            colorScheme={"messenger"}
                            fontWeight={700}
                            rightIcon={<Icon as={MdArrowForwardIos} />}
                        >
                            Learn More about Advanced Flight Training
                        </Button>
                    </Box>
                </VStack>
            </Box>
        </>
    );
}

export default index;
