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
import Profile from "./profile";
import ChatInput from "./chatinput";
import Chats from "./chats";
import { URL } from "../constants/userConstants";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import Status from "./status";

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
const Message = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px 10px;
  margin: 35px 0;
  max-width: 190px;
  margin-left: auto;
  max-width: 55%;
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
  const socket = io.connect("http://localhost:4000");
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [conversation, setConversation] = useState();
  const [message, setMessage] = useState();
  const scrollit = useRef();
  const [messages, setMessages] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [status, setStatus] = useState(false);
  const [lastPong, setLastPong] = useState(null);
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
        const dat = await axios.get(
          `http://localhost:4000/onlinestatus/${currentChat.id}`
        );
        console.log(dat, "onlinestatus");
        setOnlineStatus(dat?.data[0]?.userid == currentChat.id);
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

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
      setIsConnected(true);

      socket.emit("add user", {
        userid: user.id,
      });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("ponged", () => {
      setLastPong(new Date().toISOString());
    });
    socket.on("new message", (data) => {
      console.log(data, "newmessa");
      let url = "./notifications.mp3";
      let audio = new Audio(url);
      audio.play();
      setMessages([...messages, { ...data.message }]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [user]);

  const sendPing = () => {
    socket.emit("ping");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message, conversation, "conversation");
    const data = await axios.post(`${URL}/conversation/savemessage`, {
      conversationid: `${conversation.members}`,
      message: message,
      senderid: user.id,
    });
    console.log(data.data.messages, "dat");
    let recieverid =
      data.data.messages.conversationid.split("+")[0] == user.id
        ? data.data.messages.conversationid.split("+")[1]
        : data.data.messages.conversationid.split("+")[0];
    socket.emit("new message", {
      message: message,
      recieverid: recieverid,
      senderid: user.id,
      conversationid: conversation.members,
    });
    setMessages([...messages, data.data.messages]);
    setMessage("");
    scrollit.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onlinestatus = async () => {
    const data = await axios.get(
      `http://localhost:8000/onlinestatus/${currentChat.id}`
    );
    console.log(data, "onlinestatus");
    setOnlineStatus(data?.data[0]?.userid == currentChat.id);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };
  return (
    <Container>
      {status ? (
        <Status />
      ) : (
        <Grid container style={{ width: "100%", height: "100%" }}>
          <Grid item md={4.5} lg={4.5}>
            <SideBar>
              {showProfile ? (
                <Profile
                  showProfile={showProfile}
                  setShowProfile={setShowProfile}
                />
              ) : (
                <>
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
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          onClick={() => handleProfileClick()}
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
                        <img
                          src="./group.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <img
                          src="./status.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                          onClick={() => setStatus(true)}
                        />
                        <img
                          src="./chat.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <img
                          src="./more.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
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
                </>
              )}
            </SideBar>
          </Grid>
          <RightBar item md={7.5} lg={7.5} style={{ float: "right" }}>
            {currentChat && (
              <>
                <div style={{ position: "relative", maxWidth: "100%" }}>
                  <ChatTopBar>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={`${URL}${currentChat?.profilephoto}`}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover"
                        }}
                      />
                      <div>
                        {currentChat.name}
                        {onlineStatus && (
                          <p style={{ fontSize: "12px" }}>online</p>
                        )}
                      </div>
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
                      <Message
                        className={m.senderid == user.id && "own"}
                        ref={scrollit}
                      >
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
                        <ChatInput message={message} setMessage={setMessage} />
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
      )}
    </Container>
  );
}
