import { Box, Flex, Button, Center} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AddMovie from "./pages/AddMovie";
import AddCrewMember from "./pages/AddCrewMember";
import EditMovie from "./pages/EditMovie";
import EditCrewMember from "./pages/EditCrewMember";
import Home from "./pages/Home";
import CrewMemberPage from "./pages/CrewMemberPage";
import MoviePage from "./pages/MoviePage";
import { get } from "./utils/useAxios";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [crewMemberList, setCrewMemberList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/movie/");
        if (response.status === 200) {
          setMovieList(response.data.movies);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/crewMember/");
        if (response.status === 200) {
          setCrewMemberList(response.data.crew_members);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <Box marginX={"1em"}>
      <Router>
        <Center>
          <Flex align="center" marginBottom="1em">
            <Box marginRight={"0.5em"}>
                <Link to="/">
                  <Button color="blue.600" fontWeight="bold" variant="ghost">
                    Home
                  </Button>
                </Link>
              </Box>
              <Box marginRight={"0.5em"}>
                <Link to="/movies">
                  <Button color="blue.400" fontWeight="bold" variant="ghost">
                  Movies
                  </Button>
                </Link>
              </Box>
              <Box marginRight={"0.5em"}>
                <Link to="/crewMembers">
                  <Button color="blue.200" fontWeight="bold" variant="ghost">
                    Crew Members
                  </Button>
                </Link>
              </Box>
          </Flex>
        </Center>

        <Routes>
          <Route
            path="/crewMember/add/"
            element={<AddCrewMember movieList={movieList} setCrewMemberList={setCrewMemberList} />}
          />
          <Route
            path="/crewMember/edit/:id"
            element={<EditCrewMember movieList={movieList} setCrewMemberList={setCrewMemberList} crewMemberList={crewMemberList}/>}
          />
          <Route
            path="/movie/add/"
            element={<AddMovie setMovieList={setMovieList} />}
          />
          <Route
            path="/movie/edit/:id"
            element={
              <EditMovie
                movieList={movieList}
                setMovieList={setMovieList}
                canEdit={false}
              />
            }
          />
          <Route
            path="/crewMembers"
            element={
              <CrewMemberPage crewMemberList={crewMemberList} setCrewMemberList={setCrewMemberList} canEdit={true} />
            }
          />
          <Route
            path="/movies"
            element={
              <MoviePage movieList={movieList} setMovieList={setMovieList} />
            }
          />
          <Route
            path="/"
            element={
              <Home/>
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
