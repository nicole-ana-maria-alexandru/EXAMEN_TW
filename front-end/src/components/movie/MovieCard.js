import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MovieCard({ movie, setMovieList }) {

  const onDeleteClick = async () => {
    try {
      const response = await remove(`/movie/${movie.id}`)
      if(response.status == 200) {
        setMovieList(value => {
          const newMovie = value.filter(f => f.id != movie.id)
          return newMovie
        })
      } 
    } catch (error) {
      alert('error')
    }
  }

  return (
    <Box
      maxW="sm"
      borderWidth="3px"
      borderRadius="lg"
      borderColor="blue.400"
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
          color="blue.400"
        >
          {movie.titlu}
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.700" fontWeight="bold" fontSize="sm">
            {movie.categorie}
          </Box>
        </Box>
        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.700" fontWeight="semibold" fontSize="sm">
            {movie.data_publicarii}
          </Box>
        </Box>
        <Link to={`/movie/edit/${movie.id}`} >
          <Button leftIcon={<MdOutlineEdit />} colorScheme="green" marginTop="2em" size={"sm"} mr="1em" border="2px" variant="outline">
            Edit
          </Button>
        </Link>
        <Button leftIcon={<MdDeleteOutline />} colorScheme="red" marginTop="2em" size={"sm"} onClick={onDeleteClick} border="2px" variant="outline">
          Delete
        </Button>
      </Box>
    </Box>
  );
}

export default MovieCard;
