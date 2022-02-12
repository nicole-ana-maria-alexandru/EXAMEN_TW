import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

function VideoCard({ crewMember, setCrewMemberList, canEdit }) {
  const onDeleteClick = async () => {
    try {
      const response = await remove(`/crewMember/${crewMember.id}`);
      if (response.status == 200) {
        if (setCrewMemberList) {
          setCrewMemberList((oldVideos) => {
            const newCrewMembers = oldVideos.filter((v) => v.id != crewMember.id);
            return newCrewMembers;
          });
        }
      }
    } catch (error) {
      alert("error");
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="3px"
      borderRadius="lg"
      borderColor="blue.200"
      overflow="hidden"
      marginRight="2em"
      mt={"1em"}
    >
      <Box p="5">
        <Box
          mt="1"
          fontWeight="bold"
          as="h3"
          lineHeight="tight"
          isTruncated
          color="blue.200"
        >
          {crewMember.nume}
        </Box>
        <Box
          mt="2"
          lineHeight="tight"
          isTruncated
          fontWeight="semibold"
        >
          {crewMember.rol}
        </Box>
        {canEdit && (
          <Box>
            <Link to={`/crewMember/edit/${crewMember.id}`}>
              <Button leftIcon={<MdOutlineEdit />} colorScheme="green" marginTop="2em" size={"sm"} mr="1em" border="2px" variant="outline">
              Edit
              </Button>
            </Link>
            <Button leftIcon={<MdDeleteOutline />} colorScheme="red" marginTop="2em" size={"sm"} onClick={onDeleteClick} border="2px" variant="outline">
              Delete
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default VideoCard;
