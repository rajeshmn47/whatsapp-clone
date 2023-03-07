import styled from "@emotion/styled";
import { URL } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MoreHoriz } from "@mui/icons-material";
import InputContainer from "./inputfield";
import Profile from "./profile";
import ChatInput from "./chatinput";
import Chats from "./chats";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Grid } from "@mui/material";
import Stories from "react-insta-stories";

const Container = styled.div`
  background-color: #f0f2f5;
  width: 100%;
  height: 100vh;
`;

const Messages = styled.div`
  margin-top: 100px;
  padding: 0 20px;
  margin-bottom: 100px;
  .own {
    background-color: #d9fdd3;
    box-shadow: 0 1px 0.5px rgba(var(--shadow-rgb), 0.13);
    margin-right: auto !important;
    max-width: 55%;
  }
`;

const TopBar = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  padding: 0 15px;
  img {
    margin-right: 16px;
  }
`;

const ChatTopBar = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 37.5%;
  width: 62.5%;
  padding: 0 15px;
  background-color: #f0f2f5;
  border-left: 1px solid #8696a0;
  img {
    margin-right: 16px;
  }
`;
const ChatBottomBar = styled.div`
  height: 70px;
  display: flex;
  width: 62.5%;
  left: 37.5%;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  padding: 0 15px;
  background-color: #f0f2f5;
  img {
    margin-right: 16px;
  }
`;

const SideBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 35%;
  height: 100%;
  background-color: #54656f;
`;

const BottomBar = styled.div`
  height: 600px;
  background-color: #ffffff;
`;

const RightBar = styled(Grid)`
  background-color: #111b21;
  height: 100vh;
`;

const StatusContainer = styled.div`
  .selected {
    background-color: #f0f2f5;
  }
`;

const ChatC = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  border-bottom: 1px solid #e9edef;
  background-color: #ffffff;
  width: 100%;
  cursor: pointer;
  :hover {
    background-color: #f0f2f5;
  }
`;

const Chat = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 15px;
  background-color: transparent;
  justify-content: space-between;
  width: 100%;
`;

const UserImg = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
`;

const Details = styled.div`
  width: 80%;
`;

const Username = styled.h6`
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  color: #111b21;
`;

const Message = styled.h6`
  flex-grow: 1;
  overflow: hidden;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #667781;
`;

const Time = styled.p`
  width: 7%;
  font-size: 12px;
  color: #667781;
`;

export default function Status() {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = ["./person.svg", "./edit.svg", "./more.svg"];
  const handleClick = (a) => {
    setCurrentChat(a);
  };
  const handlestoryend = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  return (
    <StatusContainer>
      <Grid container style={{ width: "100%", height: "100%" }}>
        <Grid item md={4.2} lg={4.2}>
          <SideBar></SideBar>
        </Grid>
        <RightBar item md={7.8} lg={7.8} style={{ float: "right" }}>
          <div
            style={{
              width: "100%",
              float: "right",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stories
              stories={stories}
              defaultInterval={1500}
              width={432}
              height={768}
              currentIndex={currentIndex}
              onStoryEnd={handlestoryend}
            />
          </div>
        </RightBar>
      </Grid>
    </StatusContainer>
  );
}
