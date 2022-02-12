import { Box, Button, Heading, Input, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";
import { MdOutlineCheck } from "react-icons/md";


function AddCrewMember({ movieList, setCrewMemberList }) {
  const [nume, setNume] = useState("");
  const [rol, setRol] = useState("");
  const [movie, setMovie] = useState();

  const navigate = useNavigate();

  const onChangeSelect = (e) => {
    setMovie(e.target.value);
  };

  async function onAddClick() {
    const crewMember = {
      nume: nume,
      rol: rol,
      movieId: movie,
    };

      try {
        const response = await post("/crewMember/", { ...crewMember });
        if (response.status === 201) {
          setCrewMemberList((value) => [...value, response.data.crew_member]);
          navigate("/crewMembers");
        } else {
          alert("Invalid");
        }
      } catch (error) {
        alert("Invalid");
        console.log(error);
      }
    }
    return (
      <Box textAlign="center" marginBottom="2em" marginTop="1em">
        <Heading color="blue.200">Add Crew Member</Heading>
        <Box width={"30vw"} marginX="auto" marginTop="2em">
          <Input
            placeholder="Nume"
            marginBottom={"1em"}
            value={nume}
            isRequired={true}
            onChange={(e) => setNume(e.target.value)}
          />
          <Select placeholder="Selecteaza rolul" marginBottom={"1em"} onChange={(e) => setRol(e.target.value)}>
          <option value="DIRECTOR">DIRECTOR</option>
          <option value="WRITER">WRITER</option>
          <option value="CAMERAMAN">CAMERAMAN</option>
        </Select>
          <Select
            placeholder="Movie"
            onChange={onChangeSelect}
            isRequired={true}
            defaultValue={movie}
          >
            {movieList.map((f) => (
              <option value={f.id} key={f.id}>
                {f.titlu}
              </option>
            ))}
          </Select>
        </Box>
        <Button rightIcon={<MdOutlineCheck />} colorScheme="blue" marginTop="2em" onClick={onAddClick}>
          SUBMIT
        </Button>
      </Box>
    );
  }

export default AddCrewMember;
