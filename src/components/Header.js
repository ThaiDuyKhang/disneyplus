import styled from "styled-components";
import React, { useEffect } from "react";
import { auth} from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";
import ModalLogin from "./modalLogin";

export default function Header({open, onClose}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName]);

  const handleSignout = () => {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => {
          alert(error.message);
        });
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
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="logo" />
      </Logo>
      {!userName ? (
        <ModalLogin/>
      ) : (
        <>
          <NavMenu>
            <NavLink to="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </NavLink>
            <NavLink to="/search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </NavLink>
            <NavLink to="#!">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </NavLink>
            <NavLink to="#!">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </NavLink>
            <NavLink to="#!">
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </NavLink>
            <NavLink to="#!">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </NavLink>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleSignout}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 120px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    width: 100%;
    display: block;
  }
`;
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 50px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 25px;
      min-width: 25px;
      width: 25px;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 16px;
      letter-spacing: 1.42px;
      margin-left: 10px;
      white-space: nowrap;
      position: relative;

      &:before {
        content: "";
        display: block;
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        height: 2px;
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        transform-origin: left;
        transform: scaleX(0);
        transition: all 250ms;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background-color: rgb(19, 19, 19);
  border: 1px solid rgb(151, 151, 151, 0.34);
  border-radius: 4px;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  letter-spacing: 2px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${UserImg} {
    border-radius: 50%;
    width:100%;
    height:100%;\
  }

    &:hover{
      ${DropDown}{
        opacity:1;
        transition-duration: .5s;
        cursor:pointer;
      }
    }

`;
