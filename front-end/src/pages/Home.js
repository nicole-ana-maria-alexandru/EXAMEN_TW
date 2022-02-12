import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCheck } from "react-icons/md";

function Home() {
  return (
    <Box>
      <Box textAlign="center" marginBottom="4em" marginTop="1em" color="blue.600">
        <Heading>Home</Heading>
      </Box>
      <Center>
      <Stack direction='row' spacing={10} align='center'>
        <Link to="/movies">
          <Button rightIcon={<MdOutlineCheck />} colorScheme="blue" marginBottom="1em">
            See Movies
          </Button>
        </Link>

        <Link to="/crewMembers">
          <Button rightIcon={<MdOutlineCheck />} colorScheme="blue" marginBottom="1em">
            See Crew Members
          </Button>
        </Link>
      </Stack>
      </Center>
    </Box>
  );
}

export default Home;
