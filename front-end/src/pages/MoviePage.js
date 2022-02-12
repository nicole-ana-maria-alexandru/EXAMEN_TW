import {
  Box,
  Button,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieList from "../components/movie/MovieList";
import { MdAdd } from "react-icons/md";

function MoviePage({ movieList, setMovieList }) {
  const [titlu, setTitlu] = useState("");

  return (
    <Box>
      <Box textAlign="center" marginBottom="2em" marginTop={"1em"}>
        <Heading color="blue.400">Movies</Heading>
        <Link to="/movie/add">
          <Button leftIcon={<MdAdd />} colorScheme="blue" marginBottom="1em" marginTop="2em" width="15vw">
            Add Movie
          </Button>
        </Link>
        <Box width="40vw" mx="auto" mt="1em">
          <Input
            placeholder="Search movie by title"
            marginBottom={"1em"}
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
          />
        </Box>
      </Box>

      <MovieList
        movieList={movieList}
        setMovieList={setMovieList}
        titlu={titlu}
      />
    </Box>
  );
}

export default MoviePage;
