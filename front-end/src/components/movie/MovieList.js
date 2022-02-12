import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movieList, setMovieList, titlu }) {
  console.log(movieList)
  return (
    <Box>
      <Flex wrap={"wrap"}>
        {movieList.map((a) => {
          if (a.titlu.includes(titlu))
            return <MovieCard
              movie={a}
              key={a.id}
              setMovieList={setMovieList}
            />;
        })}
      </Flex>
    </Box>
  );
}

export default MovieList;
