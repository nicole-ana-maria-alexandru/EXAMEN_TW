import {
  Box, Button, Heading,
  Input,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";
import { MdOutlineCheck } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddMovie({ setMovieList }) {
  const [titlu, setTitlu] = useState("");
  const [categorie, setCategorie] = useState("");
  const [dataPublicarii, setDataPublicarii] = useState(new Date());

  const navigate = useNavigate();

  async function onAddClick() {
    const movie = {
      titlu,
      categorie,
      dataPublicarii
    };
    try {
      const response = await post("/movie/", { ...movie });
      if (response.status === 201) {
        setMovieList((value) => [...value, response.data.movie]);
        navigate("/");
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
      <Heading color="blue.400">Add Movie</Heading>
      <Box width={"30vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Introduceti titlul"
          marginBottom={"1em"}
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
        />
        <Select placeholder="Selecteaza categoria" marginBottom={"1em"} onChange={(e) => setCategorie(e.target.value)}>
          <option value="COMEDY">COMEDY</option>
          <option value="DRAMA">DRAMA</option>
          <option value="HORROR">HORROR</option>
        </Select>
        <DatePicker selected={dataPublicarii} onChange={(date) => setDataPublicarii(date)}/>
      </Box>
      <Button rightIcon={<MdOutlineCheck />} colorScheme="blue" marginTop="2em" onClick={onAddClick}>
        SUBMIT
      </Button>
    </Box>
  );
}

export default AddMovie;
