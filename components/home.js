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
  height: 100vh;
`;

const Messages = styled.div`
  margin-top: 100px;
  padding: 0 20px;
  .own {
    float: right !important;
    background-color: #d9fdd3;
    box-shadow: 0 1px 0.5px rgba(var(--shadow-rgb), 0.13);
  }
`;
const Message = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px 10px;
  margin: 35px 0;
  max-width: 190px;
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

const SideBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 37.5%;
  height: 100%;
`;

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
  const [conversation, setConversation] = useState();
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
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
  useEffect(() => {
    async function getchat() {
      if (currentChat?.id) {
        const data = await axios.get(
          `${URL}/conversation/getconversation/${currentChat.id}/${user.id}`
        );
        console.log(data, "data getting");
        setConversation(data.data.user);
      }
    }
    getchat();
  }, [currentChat]);
  useEffect(() => {
    async function getchat() {
      if (conversation?.members) {
        const data = await axios.get(
          `${URL}/conversation/getmessages/${conversation.members}`
        );
        console.log(data.data.messages, "data obtained");
        setMessages([...data.data.messages]);
      }
    }
    getchat();
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message, conversation, "conversation");
    const data = await axios.post(`${URL}/conversation/savemessage`, {
      conversationid: `${conversation.members}`,
      message: message,
      senderid: user.id,
    });
    console.log(data.data.messages, "data");
    setMessages([...messages, data.data.messages]);
  };
  return (
    <Container>
      <Grid container style={{ width: "100%", height: "100%" }}>
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
              <Messages>
                {messages.map((m) => (
                  <>
                    <Message className={m.senderid == user.id && "own"}>
                      {m.message}
                    </Message>
                  </>
                ))}
              </Messages>
              <div style={{ position: "relative" }}>
                <ChatBottomBar>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="./emoji.svg" alt="" />
                    <img src="./attachments.svg" alt="" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <form onSubmit={handleSubmit}>
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                      />
                      <input type="submit" value="submit" />
                    </form>
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
