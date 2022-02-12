import {
  Box,
  Button,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Flex,
  Text,
  Center,
  Select
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CrewMemberCard from "../components/crewMember/CrewMemberCard";
import { get, patch } from "../utils/useAxios";
import { MdOutlineCheck, MdArrowBack, MdArrowForward } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function EditMovie({ movieList, setMovieList, canEdit }) {
  let { id } = useParams();
  id = parseInt(id);
  const movie = movieList.filter((f) => f.id == id)[0];
  const [titlu, setTitlu] = useState(movie.titlu);
  const [categorie, setCategorie] = useState(movie.categorie);
  const [dataPublicarii, setDataPublicarii] = useState(new Date(movie.data_publicarii));
  const [crewMembers, setCrewMembers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await get(`/crewMember/byMovie/${movie.id}/${offset}`);
        if (response.status === 200) {
          setCrewMembers(response.data.rows);
          setCount((value) => value + 1);
          setTotalCount(response.data.count);
        }
      } catch (error) {
        alert("error");
      }
    };

    fetchVideos();
  }, []);

  const onNextPageClick = async () => {
    try {
      const response = await get(`/crewMember/byMovie/${movie.id}/${offset + 1}`);
      if (response.status === 200) {
        setOffset((value) => value + 1);
        setCount((value) => value + 1);
        setCrewMembers(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  const onPreviousPageClick = async () => {
    try {
      const response = await get(`/crewMember/byMovie/${movie.id}/${offset - 1}`);
      if (response.status === 200) {
        setOffset((value) => value - 1);
        setCount((value) => value - 1);
        setCrewMembers(response.data.rows);
      }
    } catch (error) {
      alert("error");
    }
  };

  async function onEditClick() {
    try {
      const response = await patch(`/movie/${movie.id}`, {
        titlu,
        categorie,
        dataPublicarii
      });
      if (response.status === 200) {
        setMovieList((value) => {
          let newMovie = movieList.filter((f) => f.id != id);
          newMovie = [...newMovie, response.data.movie];
          return newMovie;
        });
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
      <Heading color="blue.400">Edit Movie</Heading>
      <Text marginTop="1em" fontWeight="bold">{movie.titlu}</Text>
      <Box width={"30vw"} marginX="auto" marginTop="2em">
        <Input
          placeholder="Introduceti titlul"
          marginBottom={"1em"}
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
        />
        <Select placeholder="Selecteaza categoria" marginBottom={"1em"} value={categorie} onChange={(e) => setCategorie(e.target.value)}>
          <option value="COMEDY">COMEDY</option>
          <option value="DRAMA">DRAMA</option>
          <option value="HORROR">HORROR</option>
        </Select>
        <DatePicker selected={dataPublicarii} onChange={(date) => setDataPublicarii(date)}/>
      </Box>
      <Button rightIcon={<MdOutlineCheck />} colorScheme="blue" marginTop="2em" onClick={onEditClick}>
        SUBMIT
      </Button>
      <Box w="100vh" mx="auto" marginTop="2em">
        <Center>
          {crewMembers.map((crewMember) => (
            <Box textAlign={"left"} key={crewMember.id}>
              <CrewMemberCard crewMember={crewMember} canEdit={canEdit} />
            </Box>
          ))}
        </Center>
        {totalCount > 0 && (
          <Box w="20vh" mx="auto" marginTop="2em">
          <Flex justifyContent={"space-between"}>
            <Button
              leftIcon={<MdArrowBack />}
              color="blue.600"
              marginTop="2em"
              onClick={onPreviousPageClick}
              disabled={offset <= 0}
              border="2px"
              variant="outline"
            >
            </Button>
            <Button
              rightIcon={<MdArrowForward />}
              color="blue.600"
              marginTop="2em"
              onClick={onNextPageClick}
              disabled={totalCount <= count}
              border="2px"
              variant="outline"
            >
            </Button>
          </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default EditMovie;
