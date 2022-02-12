import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import CrewMemberCard from "./CrewMemberCard";

function CrewMemberList({ crewMemberList, setCrewMemberList, nume, canEdit }) {
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {crewMemberList.map((a) => {
          if (a.nume.includes(nume))
            return (
              <CrewMemberCard
                key={a.id}
                crewMember={a}
                setCrewMemberList={setCrewMemberList}
                canEdit={canEdit}
              />
            );
        })}
      </Flex>
    </Box>
  );
}

export default CrewMemberList;
