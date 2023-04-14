import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { MoreHoriz } from "@mui/icons-material";
import moment from "moment";
import InputContainer from "./inputfield";
import Profile from "./profile";
import ChatInput from "./chatinput";
import SeenBy from "./seenby";
import Chats from "./chats";
import { RURL } from "../constants/userConstants";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Button, Grid } from "@mui/material";
import Stories from "react-insta-stories";
import UserCard from "./UserCard";

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
  background-color: #2c353b;
  padding: 20px 20px;
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

const UserImge = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 5px;
  border: 1px solid #ffffff;
  padding: 2px;
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

const MyStatus = styled.div`
  display: flex;
  color: #ffffff;
  padding: 25px 0;
  border-bottom: 1px solid rgb(151, 149, 149);
  p {
    color: rgb(151, 149, 149);
    margin-top: 2px;
    font-size: 12px;
  }
`;

const Statuses = styled.div`
  padding: 10px 0;
`;
const Statuse = styled.div`
  display: flex;
  color: #ffffff;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`;

const Name = styled.h3``;

const DateA = styled.p`
  color: rgb(151, 149, 149);
  margin-top: 5px;
  font-size: 12px;
`;

const StoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #111b21;
  position: relative;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;

const BackIcon = styled.img`
  position: absolute;
  left: 20px;
  top: 20px;
  cursor: pointer;
`;

const Upload = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  color: #008069;
  margin-bottom: 14px;
`;

const Description = styled.p``;

const Data = styled.p`
  color: #8696a0;
  font-size: 12px;
  margin-bottom: 28px;
  margin-top: 14px;
  margin-left: 30px;
  margin-right: 30px;
`;

const Edit = styled.img`
  position: absolute;
  left: 90%;
  top: 55%;
  cursor: pointer;
`;

const Saveimg = styled.img`
  cursor: pointer;
  position: absolute;
  top: 0%;
  right: 0;
  width: 25px;
  height: 25px;
  object-fit: cover;
`;

const UploadImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const UploadContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: green;
  position: absolute;
  bottom: -30px;
  right: -130px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Status({ setStatus }) {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [selectedStatus, setSelectedStatus] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [image, setImage] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = ["./person.svg", "./edit.svg", "./more.svg"];
  console.log(selectedStatus, "selected");
  useEffect(() => {
    async function imageupload() {
      if (image) {
        const data = new FormData();
        const fileName = Date.now() + image.name;
        data.append("name", fileName);
        data.append("file", image);
        await axios.post(`${RURL}/client/upload`, data);
        const { da } = await axios.post(`${RURL}/status/savestatus`, {
          postedby: user?.id,
          url: `/${fileName}`,
        });
      }
    }
    imageupload();
  }, [image]);

  useEffect(() => {
    async function getallstatus() {
      console.log("status");
      const data = await axios.get(`${RURL}/status/getstatus/${user?.id}`);
      const dataA = await axios.get(`${RURL}/status/allstatus`);
      setStatuses(dataA.data.data);
      console.log(statuses, "stay");
    }
    getallstatus();
  }, [user]);

  useEffect(() => {
    async function updateSeen() {
      console.log("status");
      if (selectedStatus) {
        const data = await axios.get(
          `${RURL}/status/seenstatus/${selectedStatus.id}/${user?.id}`
        );
        console.log(data, "seenstatus");
      }
    }
    updateSeen();
  }, [selectedStatus]);

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

  const handleSelect = (a) => {
    setSelectedStatus(a);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleClose = () => {
    setSelectedStatus(false);
  };

  return (
    <StatusContainer>
      <Grid container style={{ width: "100%", height: "100%" }}>
        {selectedStatus ? (
          <StoryContainer>
            <Stories
              stories={[`${RURL}${selectedStatus.url}`]}
              width={732}
              height={650}
              currentIndex={currentIndex}
              onStoryEnd={handlestoryend}
            />
            <BackIcon
              src="./backwhite.svg"
              alt=""
              onClick={() => handleClose()}
            />
            <CloseIcon
              src="./closewhite.svg"
              alt=""
              onClick={() => handleClose()}
            />
            <SeenBy status={selectedStatus} />
          </StoryContainer>
        ) : (
          <>
            <Grid item md={4.2} lg={4.2}>
              <SideBar>
                <MyStatus>
                  <Statuses>
                    {statuses.length > 0 &&
                      statuses.map(
                        (s) =>
                          user?.id == s.posted_by && (
                            <Statuse onClick={() => handleSelect(s)}>
                              <UserImge src={`${RURL}${s.url}`} alt="" />
                              <div style={{ margin: "0 15px" }}>
                                <Name>My Status</Name>
                                <DateA>
                                  {moment(s.created_at).format("HH:mm")}
                                </DateA>
                              </div>
                            </Statuse>
                          )
                      )}
                  </Statuses>
                </MyStatus>

                <Statuses>
                  <p style={{ color: "rgb(151, 149, 149)" }}>VIEWED</p>
                  {statuses.length > 0 &&
                    statuses.map(
                      (s) =>
                        user?.id != s.posted_by && (
                          <Statuse onClick={() => handleSelect(s)}>
                            <UserImge src={`${RURL}${s.url}`} alt="" />
                            <div style={{ margin: "0 15px" }}>
                              <Name>
                                <UserCard i={s.posted_by} />
                              </Name>
                              <DateA>
                                {moment(s.created_at).format("HH:mm")}
                              </DateA>
                            </div>
                          </Statuse>
                        )
                    )}
                </Statuses>
                <Upload>
                  <Button component="label">
                    {image ? (
                      <UploadImg src={URL.createObjectURL(image)} alt="" />
                    ) : (
                      <UploadContainer>
                        <UploadImg src="./camera.svg" alt="" />
                      </UploadContainer>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleImage(e)}
                    />
                  </Button>
                </Upload>
              </SideBar>
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
                <CloseIcon
                  src="./closewhite.svg"
                  alt=""
                  onClick={() => setStatus(false)}
                />
              </div>
            </RightBar>
          </>
        )}
      </Grid>
    </StatusContainer>
  );
}
