import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import db from "./../firebase";
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { collection, onSnapshot } from "@firebase/firestore";

export default function Home(props) {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommend = [];
  let newDisneys = [];
  let originals = [];
  let trendings = [];

  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapshot) => {
      // eslint-disable-next-line array-callback-return
      snapshot.docs.map((doc) => {
        // console.log(recommends);

        switch (doc.data().type) {
          case "recommend":
            recommend = [...recommend, { id: doc.id, ...doc.data() }];
            setMovie();
            break;
          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            setMovie();
            break;
          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            setMovie();
            break;
          case "trending":
            trendings = [...trendings, { id: doc.id, ...doc.data() }];
            setMovie();
            break;
          default:
            break;
        }
      });
    });
    const setMovie = () => {
      dispatch(
        setMovies({
          recommend: recommend,
          newDisney: newDisneys,
          original: originals,
          trending: trendings,
        })
      );
    };
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <NewDisney />
      <Trending />
      <Recommends />
      <Originals />
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 90px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
