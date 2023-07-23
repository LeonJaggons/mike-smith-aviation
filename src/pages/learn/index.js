import { VStack, Heading, Text, Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

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
            <VStack spacing={8} alignItems={"flex-start"}>
                <Heading>Learn to Fly</Heading>
                <Box>
                    <Text>
                        Learning to fly is a transformative experience that
                        offers a unique sense of freedom, adventure, and
                        accomplishment. As you take control of an aircraft,
                        you'll witness breathtaking views from the cockpit and
                        gain a deeper appreciation for the art and science of
                        flying. Becoming a pilot opens up a world of
                        opportunities, from personal travel to exciting career
                        options in the aviation industry.
                    </Text>
                </Box>

                <Box>
                    <Heading size={"md"}>Our Learn to Fly Programs</Heading>
                    <Text>
                        At Mike Smith Aviation, we are committed to providing
                        the highest standard of flight training to students of
                        all levels, from beginners to seasoned aviation
                        enthusiasts. Our Learn to Fly programs are carefully
                        designed to cater to your specific goals:
                    </Text>
                </Box>

                <Box>
                    <Heading size={"md"}>Discovery Flights:</Heading>
                    <Text>
                        For those curious about flying but not yet ready to
                        commit to a full training program, our Discovery Flights
                        offer the perfect introduction to aviation. Accompanied
                        by one of our experienced flight instructors, you'll
                        take the pilot's seat and soar through the skies,
                        getting a taste of what it's like to control an
                        aircraft.
                    </Text>
                </Box>

                <Box>
                    <Heading size={"md"}>Private Pilot Training:</Heading>
                    <Text>
                        Our Private Pilot Training is the foundation for all
                        future aviators. During this comprehensive program,
                        you'll learn the fundamentals of flight, aviation
                        regulations, navigation, and flight safety. With
                        dedicated flight lessons and ground instruction, you'll
                        be well-prepared to pass the Private Pilot License (PPL)
                        examination and obtain the freedom to fly solo.
                    </Text>
                </Box>

                <Box>
                    <Heading size={"md"}>
                        Instrument Rating (IR) Course:
                    </Heading>
                    <Text>
                        If you want to enhance your flying skills and gain the
                        ability to navigate through challenging weather
                        conditions, our Instrument Rating (IR) Course is the
                        next step. Under the guidance of our expert instructors,
                        you'll master instrument flying techniques, precision
                        approaches, and gain confidence in handling various
                        flight scenarios solely by reference to instruments.
                    </Text>
                </Box>

                <Box>
                    <Heading size={"md"}>Commercial Pilot Training:</Heading>
                    <Text>
                        For those aspiring to make aviation a career, our
                        Commercial Pilot Training program is tailored to equip
                        you with the skills required to fly for hire. This
                        course encompasses advanced flight maneuvers, complex
                        aircraft systems, commercial flight operations, and
                        extensive cross-country flying, paving the way for a
                        Commercial Pilot License (CPL).
                    </Text>
                </Box>

                <Box>
                    <Heading size={"md"}>
                        Flight Instructor Certification (CFI) Program:
                    </Heading>
                    <Text>
                        The Flight Instructor Certification Program prepares
                        pilots to become Certified Flight Instructors (CFIs),
                        sharing their passion for flight and guiding future
                        aviators. Our CFI program covers effective instructional
                        techniques, aviation theory, and practical training to
                        prepare you for a rewarding career as a flight
                        instructor.
                    </Text>
                </Box>
            </VStack>
        </>
    );
}

export default index;
