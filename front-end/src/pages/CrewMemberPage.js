import { Box, Button, Heading, Text, Input, Center } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CrewMemberList from "../components/crewMember/CrewMemberList";
import { MdAdd } from "react-icons/md";

function CrewMemberPage({ crewMemberList, setCrewMemberList, canEdit }) {
  const [nume, setNume] = useState("");

  return (
    <Box>
      <Box textAlign="center" marginBottom="2em" marginTop={"1em"}>
        <Heading color="blue.200">Crew Members</Heading>
        <Link to="/crewMember/add">
          <Button leftIcon={<MdAdd />} colorScheme="blue" marginBottom="1em" marginTop="2em" width="15vw">
            Add Crew Member
          </Button>
        </Link>
        <Box width="40vw" mx="auto" mt="1em">
          <Input
            placeholder="Search crew member by name"
            marginBottom={"1em"}
            value={nume}
            onChange={(e) => setNume(e.target.value)}
          />
        </Box>
      </Box>

      <CrewMemberList
        crewMemberList={crewMemberList}
        setCrewMemberList={setCrewMemberList}
        nume={nume}
        canEdit={canEdit}
      />
    </Box>
  );
}

export default CrewMemberPage;
