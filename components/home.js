import { Grid } from "@mui/material";
import WhatsappIcon from "./icon";
import UserIcon from "./usericon.jsx";
import GroupsIcon from "@mui/icons-material/Groups";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MoreHoriz } from "@mui/icons-material";
import styled from "@emotion/styled";
import ReactEmoji from "react-emoji";
import InputContainer from "./inputfield";
import Profile from "./profile";
import ChatInput from "./chatinput";
import { getDisplayDate, getSamedayorNot } from "../utils/dateformat,js";
import Chats from "./chats";
import { URL } from "../constants/userConstants";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import axios from "axios";
import io from "socket.io-client";
import Status from "./status";
import { addnewm } from "../actions/userAction";
import { sameDayorNot } from "../utils/dateformat,js";

const Container = styled.div`
  background-color: #f0f2f5;
  width: 100%;
  height: 100vh;
`;

const Messages = styled.div`
  margin-top: 100px;
  padding: 0 20px;
  margin-bottom: 160px;
  .own {
    background-color: #d9fdd3;
    box-shadow: 0 1px 0.5px rgba(var(--shadow-rgb), 0.13);
    margin-left: auto !important;
    max-width: 55%;
  }
`;
const Message = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px 10px;
  margin: 35px 0;
  max-width: 190px;
  margin-right: auo;
  max-width: 55%;
  position: relative;
`;

const MessageDate = styled.div`
  background-color: #ffffff;
  color: #54656f;
  font-size: 12px;
  padding: 10px 10px;
  border-radius: 5px;
  max-width: 100px;
  text-align: center;
  margin: 0 auto;
  text-transform: uppercase;
`;

const Tim = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 12px;
  color: #667781;
  display: flex;
  align-items: center;
`;
const TopBar = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  z-index: 1000;
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
  z-index: 10;
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
  z-index: 100;
`;
export default function Home() {
  const dispatch = useDispatch();
  const socket = io.connect("http://localhost:7000");
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [showProfile, setShowProfile] = useState(false);
  const [conversation, setConversation] = useState();
  const [conversations, setConversations] = useState();
  const [showUsers, setShowUsers] = useState(false);
  const [message, setMessage] = useState();
  const scrollit = useRef();
  const [messages, setMessages] = useState([]);
  const [newm, setNewm] = useState();
  const [typed, setTyped] = useState();
  const [onlineStatus, setOnlineStatus] = useState();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [status, setStatus] = useState(false);
  const [lastPong, setLastPong] = useState(null);
  const headers = {
    Accept: "application/json",
  };
  const [html, setHtml] = useState(`${(<h1>i am html</h1>)}`);
  const router = useRouter();
  const { user, isAuthenticated, loading, error, token } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    async function getusers() {
      try {
        const data = await axios.get(`${URL}/auth/users`);

        setUsers([...data.data.message]);
      } catch {
        console.log(error);
      }
    }
    getusers();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setTyped(null);
    }, 1000);
  }, [typed]);
  useEffect(() => {
    async function getconversations() {
      try {
        if (user?.id) {
          const data = await axios.get(
            `${URL}/conversation/getconversations/${user?.id}`,
            {
              headers: {
                ...headers,
                "Content-Type": "application/json",
                servertoken: token,
              },
            }
          );

          setConversations([...data.data.user]);
        }
      } catch {
        console.log(error);
      }
    }
    getconversations();
  }, [user, token]);
  useEffect(() => {
    async function getchat() {
      if (currentChat?.id && token) {
        console.log(token, "token");
        const data = await axios(
          `${URL}/conversation/getconversation/${currentChat.id}/${user.id}`,
          {
            method: "get",
            headers: {
              ...headers,
              "Content-Type": "application/json",
              servertoken: token,
            },
          }
        );
        console.log(data, "cong");
        setConversation(data.data.user);
        const dat = await axios.get(
          `http://localhost:4000/onlinestatus/${currentChat.id}`
        );
        console.log(dat, "onlinestatus");
        setOnlineStatus(dat?.data[0]?.userid == currentChat.id);
      }
    }
    getchat();
  }, [currentChat, token,user]);
  useEffect(() => {
    async function getchat() {
      if (conversation?.members && user?.id && token) {
        const data = await axios(
          `${URL}/conversation/getmessages/${conversation.members}/${user.id}`,
          {
            method: "get",
            headers: {
              ...headers,
              "Content-Type": "application/json",
              servertoken: token,
            },
          }
        );
        console.log(data, "cameravovo");
        setMessages([...data.data.messages]);
      }
    }
    getchat();
  }, [conversation, user, token]);

  useEffect(() => {
    if (newm > 0) {
      console.log(newm);
      dispatch(addnewm(newm));
    }
  }, [newm]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("ponged", () => {
      setLastPong(new Date().toISOString());
    });
    socket.on("new message", async (data) => {
      console.log(data, "newmessa");
      let url = "./notifications.mp3";
      let audio = new Audio(url);
      audio.play();
      setMessages((messages) => [...messages,data.message]);
      if (newm) {
        setNewm(newm + 1);
      } else {
        setNewm(1);
      }
      try {
        if (user?.id) {
          const data = await axios.get(
            `${URL}/conversation/getconversations/${user?.id}`
          );
          console.log(data.data, "conversations");
          setConversations([...data.data.user]);
        }
      } catch {
        console.log(error);
      }
    });

    socket.on("typing", (data) => {
      console.log(data, "typing");
      setTyped(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
      setIsConnected(true);

      socket.emit("add user", {
        userid: user?.id,
      });
    });
  }, [user]);

  const sendPing = () => {
    socket.emit("ping");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(message, conversation, "conversation");
    const data = await axios(`${URL}/conversation/savemessage`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        servertoken: token,
      },
      data: {
        conversationid: `${conversation.members}`,
        message: message,
        senderid: user.id,
      },
    });
    console.log(data.data, "dat");
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
    console.log(messages, "mui");
    setMessage("");
    scrollit.current?.scrollIntoView({
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

  const handleChange = (e, r) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      userid: user.id,
      recieverid: r,
    });
  };
  return (
    <Container>
      {status ? (
        <Status setStatus={setStatus} />
      ) : (
        <Grid container style={{ width: "100%", height: "100%" }}>
          <Grid item md={4.5} lg={4.5} sm={4.5}>
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
                            objectFit: "cover",
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
                          onClick={() => setShowUsers(true)}
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
                  {showUsers ? (
                    <Chats
                      showusers
                      users={users}
                      conversations={conversations}
                      currentChat={currentChat}
                      setCurrentChat={setCurrentChat}
                    />
                  ) : (
                    <Chats
                      users={users}
                      conversations={conversations}
                      currentChat={currentChat}
                      setCurrentChat={setCurrentChat}
                    />
                  )}
                  <BottomBar></BottomBar>
                </>
              )}
            </SideBar>
          </Grid>
          <RightBar item md={7.5} sm={7.5} lg={7.5} style={{ float: "right" }}>
            {currentChat && (
              <>
                <div style={{ position: "relative", maxWidth: "100%" }}>
                  <ChatTopBar>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`${URL}${currentChat?.profilephoto}`}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        {currentChat.name}
                        {typed?.userid == currentChat.id ? (
                          <p>typing</p>
                        ) : (
                          currentChat?.last_seen &&
                          (onlineStatus ? (
                            <p style={{ fontSize: "12px" }}>online</p>
                          ) : (
                            <p>
                              {moment(currentChat.last_seen).format("hh:mm")}
                            </p>
                          ))
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
                  {messages.map((m, index) => (
                    <>
                      {!(
                        index > 0 &&
                        sameDayorNot(
                          messages[index - 1].created_at,
                          messages[index].created_at
                        )
                      ) && (
                        <MessageDate>
                          {getDisplayDate(m.created_at)}
                        </MessageDate>
                      )}
                      <Message
                        className={m.senderid == user.id && "own"}
                        ref={scrollit}
                      >
                        {ReactEmoji.emojify(m.message)}
                        <Tim>
                          {moment(m.created_at).format("HH:mm")}
                          {m.senderid == user?.id && m.is_seen ? (
                            <img
                              src="./seen.svg"
                              alt=""
                              style={{ marginLeft: "5px" }}
                            />
                          ) : (
                            m.senderid == user?.id && (
                              <img
                                src="./sent.svg"
                                alt=""
                                style={{ marginLeft: "5px" }}
                              />
                            )
                          )}
                        </Tim>
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
                        <ChatInput
                          message={message}
                          setMessage={setMessage}
                          handleChange={handleChange}
                          c={currentChat}
                        />
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
