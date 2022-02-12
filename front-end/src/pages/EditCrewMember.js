import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patch } from "../utils/useAxios";
import { MdOutlineCheck } from "react-icons/md";


function EditCrewMember({ movieList, setCrewMemberList, crewMemberList }) {
  let { id } = useParams();
  id = parseInt(id);
  const crewMember = crewMemberList.filter((v) => v.id == id)[0];
  const [nume, setNume] = useState(crewMember.nume);
  const [rol, setRol] = useState(crewMember.rol);
  const [movie, setMovie] = useState(crewMember.movieId);

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setMovie(e.target.value);
  };

  async function onEditClick() {
    const crewMember = {
      nume: nume,
      rol: rol,
      movieId: movie,
    };

      try {
        const response = await patch(`/crewMember/${id}`, { ...crewMember });
        if (response.status === 200) {
          setCrewMemberList((value) => {
            let newCrewMembers = crewMemberList.filter((v) => v.id != id);
            newCrewMembers = [...newCrewMembers, response.data.crewMember];
            return newCrewMembers;
          });
          navigate("/crewMembers");
        } else {
          alert("Invalid");
        }
      } catch (error) {
        alert("Invalid");
        console.log(error);
      }

  return (
    <Box textAlign="center" marginBottom="2em" marginTop="1em">
      <Heading color="blue.200">Edit Crew Member</Heading>
      <Box width={"30vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Nume"
          marginBottom={"1em"}
          value={nume}
          isRequired={true}
          onChange={(e) => setNume(e.target.value)}
        />
          <Select placeholder="Selecteaza rolul" marginBottom={"1em"} value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="DIRECTOR">DIRECTOR</option>
          <option value="WRITER">WRITER</option>
          <option value="CAMERAMAN">CAMERAMAN</option>
        </Select>
        <Select
          placeholder="Movie"
          onChange={onChangeSelect}
          defaultValue={movie}
        >
          {movieList.map((f) => (
            <option value={f.id} key={f.id}>
              {f.titlu}
            </option>
          ))}
        </Select>
      </Box>
      <Button rightIcon={<MdOutlineCheck />} colorScheme="blue" marginTop="2em" onClick={onEditClick}>
        SUBMIT
      </Button>
    </Box>
  );
}
}
export default EditCrewMember;
