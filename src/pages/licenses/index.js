import { VStack, Heading, Text, Box } from "@chakra-ui/react";
import React from "react";

function index() {
    return (
        <VStack alignItems={"start"} spacing={8}>
            <Heading>Licenses & Ratings</Heading>

            <Text>
                Whether you dream of flying recreationally or pursuing a
                professional career in aviation, our flight school offers
                top-notch training programs to help you achieve your goals.
                Here, you'll find details about the different licenses and
                ratings we offer, along with the requirements and privileges
                associated with each.
            </Text>

            <Box>
                <Heading mb={2} size={"md"}>
                    Private Pilot License (PPL)
                </Heading>
                <Text>
                    The Private Pilot License is the first step for individuals
                    looking to fly for personal or recreational purposes. During
                    the PPL training, students learn the fundamental principles
                    of aviation, including flight maneuvers, navigation, and
                    flight safety. To obtain a Private Pilot License, candidates
                    must complete a minimum number of flight hours, pass a
                    written exam, and demonstrate their flying skills during a
                    practical test. With a PPL, you'll have the freedom to fly
                    aircraft for leisure and non-commercial purposes.
                </Text>
            </Box>

            <Box>
                <Heading mb={2} size={"md"}>
                    Instrument Rating (IR)
                </Heading>

                <Text>
                    The Instrument Rating is an essential addition to a Private
                    Pilot License and enables pilots to fly under Instrument
                    Flight Rules (IFR). This rating teaches pilots to navigate
                    and control the aircraft solely by reference to instruments,
                    allowing safe flying in adverse weather conditions and low
                    visibility. The IR training includes advanced flight
                    planning, instrument approaches, and emergency procedures.
                    Adding an Instrument Rating to your license significantly
                    enhances your flying capabilities and opens doors to more
                    extensive flight opportunities.
                </Text>
            </Box>

            <Box>
                <Heading mb={2} size={"md"}>
                    Commercial Pilot License (CPL)
                </Heading>

                <Text>
                    For those seeking a career as a professional pilot, the
                    Commercial Pilot License is a crucial milestone. With a CPL,
                    pilots can be compensated for their flying services, making
                    it the foundation for various career paths in aviation. The
                    CPL program builds upon the skills acquired during the
                    Private Pilot training and focuses on advanced flight
                    maneuvers, commercial flight operations, and aircraft
                    systems. Candidates must meet flight hour requirements and
                    pass written and practical examinations to obtain this
                    license.
                </Text>
            </Box>

            <Box>
                <Heading mb={2} size={"md"}>
                    Instrument Rating (IR) Certified Flight Instructor (CFI) &
                    Certified Flight Instructor Instrument (CFII)
                </Heading>

                <Text>
                    Becoming a Certified Flight Instructor is an option for
                    pilots who want to share their passion for flying and pass
                    on their knowledge and expertise to aspiring aviators. The
                    CFI and CFII ratings allow you to teach others to fly both
                    under visual flight rules and instrument flight rules. Our
                    flight school provides comprehensive CFI and CFII training,
                    equipping you with the necessary instructional techniques
                    and aviation knowledge to become a successful and
                    safety-conscious flight instructor.
                </Text>
            </Box>

            <Box>
                <Heading mb={2} size={"md"}>
                    Airline Transport Pilot License (ATPL)
                </Heading>

                <Text>
                    The Airline Transport Pilot License is the pinnacle of pilot
                    certifications and is required for individuals aiming to
                    serve as captains or first officers for commercial airlines.
                    The ATPL training covers advanced flight theory, airline
                    operations, crew resource management, and high-level
                    decision-making. To earn an ATPL, candidates must have
                    accumulated a significant number of flight hours, meet
                    specific experience requirements, and pass rigorous written
                    and practical examinations.
                </Text>
            </Box>
            <Box>
                <Heading mb={2} size={"md"}>
                    Additional Ratings and Endorsements
                </Heading>

                <Text>
                    Aside from the main licenses, we offer various additional
                    ratings and endorsements that can expand your flying
                    capabilities. These include multi-engine ratings, seaplane
                    ratings, high-performance endorsements, and more. These
                    specialized qualifications enhance your skills and make you
                    more versatile as a pilot.
                </Text>
            </Box>

            <Text>
                At Mike Smith Aviation, we are committed to providing the
                highest standard of flight training to help you achieve your
                aviation dreams. Our team of experienced and certified flight
                instructors is dedicated to guiding you through your journey in
                a safe, supportive, and professional environment.
            </Text>

            <Text>
                If you have any questions or would like to learn more about our
                licenses and ratings programs, please don't hesitate to contact
                us. Take the first step towards your aviation career with Mike
                Smith Aviation and soar to new heights!
            </Text>
        </VStack>
    );
}

export default index;
