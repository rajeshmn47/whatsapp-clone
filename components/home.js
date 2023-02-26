import { Grid } from "@mui/material";
import WhatsappIcon from "./icon";
import UserIcon from "./usericon.jsx";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MoreHoriz } from "@mui/icons-material";
import styled from "@emotion/styled";
import InputContainer from "./inputfield";
import Chats from "./chats";
import { URL } from "../constants/userConstants";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  background-color: #f0f2f5;
  width: 100%;
`;

const TopBar = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const SideBar = styled.div``;

const BottomBar = styled.div`
  height: 600px;
  background-color: #ffffff;
`;

const RightBar = styled(Grid)`
  background-image: url("./whatsapp.png");
  background-color: #efeae2;
`;
export default function Home() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [html, setHtml] = useState(`${(<h1>i am html</h1>)}`);
  const router = useRouter();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  console.log(currentChat, "iiiii");
  useEffect(() => {
    async function getusers() {
      try {
        const data = await axios.get(`${URL}/auth/users`);
        console.log(data.data.message, "users");
        setUsers([...data.data.message]);
      } catch {
        console.log(error);
      }
    }
    getusers();
  }, []);
  useEffect(() => {}, []);
  return (
    <Container>
      <Grid container style={{ width: "100%" }}>
        <Grid item md={4.5} lg={4.5}>
          <SideBar>
            <TopBar>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item md={2} lg={2}>
                  <img
                    src={URL + user?.profilephoto}
                    alt=""
                    style={{ width: "40px" }}
                  />
                </Grid>
                <Grid
                  item
                  md={10}
                  lg={10}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <img src="./group.svg" alt="" />
                  <img src="./status.svg" alt="" />
                  <img src="./chat.svg" alt="" />
                  <img src="./more.svg" alt="" />
                </Grid>
              </Grid>
            </TopBar>
            <InputContainer />
            <Chats
              users={users}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
            />
            <BottomBar></BottomBar>
          </SideBar>
        </Grid>
        <RightBar item md={7.5} lg={7.5} style={{ float: "right" }}>
          {currentChat && (
            <>
              <div style={{ position: "relative", maxWidth: "100%" }}>
                <ChatTopBar>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="./person.svg" alt="" style={{ width: "40px" }} />
                    {currentChat.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="./search.svg" alt="" />
                    <img src="./more.svg" alt="" />
                  </div>
                </ChatTopBar>
              </div>
              <div style={{ position: "relative" }}>
                <ChatBottomBar>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="./emoji.svg" alt="" />
                    <img src="./attachments.svg" alt="" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <InputContainer />
                    <img src="./voice.svg" alt="" />
                  </div>
                </ChatBottomBar>
              </div>
            </>
          )}
          <div
            style={{
              width: "100%",
              float: "right",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </RightBar>
      </Grid>
    </Container>
  );
}
