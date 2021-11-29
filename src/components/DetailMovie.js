import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "./../firebase";
import { getDoc, doc } from "@firebase/firestore";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Backdrop } from "@mui/material";

export default function DetailMovie(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { id } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDoc(doc(db, "movies", id)).then((docSnap) => {
      if (docSnap.exists()) {
        setDetail(docSnap.data());
        // console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  }, [id]);

  console.log("detail", detail);

  return (
    <Container>
      <Background className="detail_background">
        <div className="detail_overlay_bg">
          <span className="overlay-bgimg" />
        </div>
        <img src={detail.backgroundImg} alt={detail.title} />
      </Background>
      <Wrap>
        <ImageTitle>
          <img src={detail.titleImg} alt={detail.title} />
        </ImageTitle>
        <ContentMeta>
          <Controls>
            <Player>
              {/* <img src="/images/play-icon-black.png" alt="" /> */}
              <span>GET DISNEY+</span>
            </Player>
            <Trailer onClick={handleOpen}>
              <img src="/images/play-icon-white.png" alt="" />
              <span>Trailer</span>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box sx={modalStyle}>
                    <WrapTrailer>
                      <iframe
                        src={`https://www.youtube.com/embed/${detail.trailer}?autoplay=1&modestbranding=1&playsinline=1&iv_load_policy=3"`}
                        title={detail.title}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </WrapTrailer>
                  </Box>
                </Fade>
              </Modal>
            </Trailer>
            <AddList>
              <span />
              <span />
            </AddList>
            <GroupWatch>
              <img src="/images/group-icon.png" alt="" />
            </GroupWatch>
          </Controls>
          <SubTitle className="detail_subtitle">{detail.subTitle}</SubTitle>
          <Description className="detail_description">
            {detail.description}
          </Description>
        </ContentMeta>
      </Wrap>
    </Container>
  );
}
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 90px;
  padding: 0 calc(3.5vw + 5px);
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Wrap = styled.div`
  position: fixed;
  background: linear-gradient( 
      180deg, #04071400 0%, #040714ff 105% );
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

const WrapTrailer = styled.div`

  // padding-left: 23px;
  // padding-right: 23px;

  iframe {
    width: 960px;
    height: 518px;
  }

  @media (max-width: 414px) {
    iframe {
      width: 340px;
      height: 185px;
    }
  }

  @media (min-width: 414.1px) and (max-width: 768px) {
    iframe {
      width: 650px;
      height: 340px;
    }
  }
`;

const Background = styled.div`
  left: 0;
  opacity: 0.8;
  position: fixed;
  top: 0;
  z-index: -1;
    
  img {
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    width: 100vw;
    object-fit: cover;
    height: 117vh;
    @media (max-width: 768px) {
      position:initial;
      top:0px;
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  } 

  @media (max-width: 768px) {
    position: relative;
    span {
      position: absolute;
      background: linear-gradient(180deg, #04071400 0%, #0407140A 16%, #04071421 29%, #04071442 41%, #0407146B 51%, #04071494 61%, #040714BD 70%, #040714DE 79%, #040714F5 89%, #040714FF 100%);
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
  }

`;

const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  -webkit-box-pack: start;
  margin: 0 auto;
  height: 26vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  padding: 0 calc(3.5vw + 5px);
  img {
    max-width: 450px;
    min-width: 200px;
    width: 35vw;
  }
  @media (max-width: 768px) {
    height: 90vw;
    // min-height: 100px;
  }
`;
const ContentMeta = styled.div`
  max-width: 874px;
  padding: 0 calc(3.5vw + 5px);
`;

const Controls = styled.div`
  display: flex;
  flex-flow: row nopwrap;
  align-items: center;
  margin: 24px 0;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0 22px 0 0;
  padding: 0 24px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background-color: #0072D2;
  color: #fff;
  font-weight: 600;
  border:none;
  transition: 0.2s all;

  img {
    width: 32px;
  }

 
  &:hover {
    cursor: pointer;
    background-color: #4286F5;
    color: #f9f9f9;
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0 12px;
    font-size: 12px;
    margin: 0 10px 0 0;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(249, 249, 249);
  color: rgb(249, 249, 249);
  &:hover {
    background: rgb(198, 198, 198);
  }
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 1px solid white;
  cursor: pointer;
  transition: 0.2s all;

  span {
    background-color: rgb(249, 249, 249);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:nth-child(2) {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
  &:hover {
    background-color: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    margin-right: 7px;
  }
`;

const GroupWatch = styled(AddList)``;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0;
  color: rgb(249, 249, 249);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
