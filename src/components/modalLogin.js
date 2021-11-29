import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { auth, provider, providerGithub } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

export default function ModalLogin() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName]);

  const handleAuthGoogle = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          // console.log(result);
          setUser(result.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  const handleAuthGithub = () => {
    if (!userName) {
      signInWithPopup(auth, providerGithub)
        .then((result) => {
          // console.log(result);
          setUser(result.user);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <div>
      <Login onClick={handleOpen}>Login</Login>
      <StyledModal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <img src="/images/disney-account.png" alt="disney login"/>
            <Wrap id="transition-modal-description">
              <LoginGoogleBtn onClick={handleAuthGoogle}>
                  <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_28:3796)">
                    <path
                      d="M21.823 9H19.636V11.177H17.459V13.364H19.636V15.541H21.823V13.364H24V11.177H21.823V9Z"

                    />
                    <path
                      d="M7.5 19.5C11.828 19.5 14.703 16.462 14.703 12.174C14.703 11.683 14.652 11.304 14.581 10.926H7.501V13.504H11.758C11.584 14.599 10.469 16.737 7.501 16.737C4.944 16.737 2.856 14.619 2.856 12C2.856 9.381 4.943 7.262 7.501 7.262C8.964 7.262 9.936 7.886 10.489 8.418L12.525 6.464C11.214 5.237 9.526 4.5 7.5 4.5C3.356 4.5 0 7.856 0 12C0 16.144 3.356 19.5 7.5 19.5Z"

                    />
                  </g>
                </svg>
                Goolge
              </LoginGoogleBtn>
              <LoginGithubBtn onClick={handleAuthGithub}>
              <svg
                  className="mr-3 github-login rounded-lg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <rect
                        fill="#fff"
                        className="cls-1"
                        x="2.35"
                        y="3.17"
                        width="19.39"
                        height="17.68"
                      />
                      <path d="M19,0H5A5,5,0,0,0,0,5V19a5,5,0,0,0,5,5H19a5,5,0,0,0,5-5V5A5,5,0,0,0,19,0ZM14.53,19.59c-.4.08-.53-.17-.53-.38V17a1.89,1.89,0,0,0-.55-1.48c1.78-.2,3.65-.88,3.65-3.95a3.07,3.07,0,0,0-.82-2.14,2.88,2.88,0,0,0-.08-2.12s-.67-.22-2.2.82a7.54,7.54,0,0,0-4,0c-1.53-1-2.2-.82-2.2-.82a2.85,2.85,0,0,0-.08,2.11,3.11,3.11,0,0,0-.82,2.15c0,3.07,1.86,3.75,3.64,4A1.73,1.73,0,0,0,10,16.61a1.72,1.72,0,0,1-2.33-.67,1.68,1.68,0,0,0-1.22-.83s-.78,0-.06.49a2.12,2.12,0,0,1,.89,1.17s.46,1.43,2.69.95V19.2c0,.22-.13.46-.53.39a8,8,0,1,1,5.06,0Z" />
                    </g>
                  </g>
                </svg>
                Github
              </LoginGithubBtn>
            </Wrap>
          </Box>
        </Fade>
      </StyledModal>
    </div>
  );
}

const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background: rgba(0,0,0,0.5) url("/images/bg-stars.png") repeat-x
  }
`;

const modalStyle = {
  textAlign: "center",
  borderRadius: "10px",
  color: "#090b13",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f9f9f9",
  border: "1px solid #f9f9f9",
  boxShadow: 24,
  p: 5,
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
`;

const LoginGoogleBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #0072D2;
  padding: 13px 16px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 600;
  border:1px solid #0072D2;
  border-radius: 4px;
  transition: 0.2s all ease 0s;

  &:hover {
    cursor: pointer;
    background-color: #4286F5;
    color: #f9f9f9;
    svg {
      fill: #f9f9f9;
      rect{
          fill:#090b13;
      }
    }

  }
`;
const LoginGithubBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #f9f9f9;
  padding: 13px 16px;
  text-transform: uppercase;
  color: #090b13;
  font-weight: 600;
  border:1px solid #090b13;
  border-radius: 4px;
  transition: 0.2s all ease 0s;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.9);
    color: #f9f9f9;
    svg {
      fill: #f9f9f9;
      rect{
          fill:#090b13;
      }
    }

  }
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: 0.2s all ease 0s;

  &:hover {
    cursor: pointer;
    background-color: #f9f9f9;
    color: rgba(0, 0, 0, 0.6);
  }
`;
