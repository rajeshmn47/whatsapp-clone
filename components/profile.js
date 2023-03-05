import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { RURL } from "../constants/userConstants";
import axios from "axios";
import { loadUser } from "../actions/userAction";

const ChatsContainer = styled.div`
  background-color: #f0f2f5;
  .selected {
    background-color: #f0f2f5;
  }
  .MuiInputBase-root {
    border-bottom: 2px solid red !important;
  }
  .MuiInput-root {
    border-bottom: 2px solid red !important;
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
  max-height: 40px;
  margin-right: 0px;
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

const TopBar = styled.div`
  background-color: #008069;
  padding-right: 20px;
  padding-left: 23px;
  height: 108px;
  display: flex;
  flex: none;
  align-items: center;
  width: 100%;
  color: #ffffff;
  box-sizing: border-box;
`;

const Upload = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div`
  background-color: #fff;
  padding: 20px 30px;
  position: relative;
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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

const config2 = {
  borderRadius: "8px",
  language: "en",
  width: "330px",
  height: "250px",
  objectFit: "contain",
  compressInitial: null,
};

const initialImage = "./person.svg";
// const initialImage: string = '/assets/images/8ptAya.webp';

export default function Profile({ showProfile, setShowProfile }) {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [about, setAbout] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [image, setImage] = useState();
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  useEffect(() => {
    setName(user?.name);
    setAbout(user?.about);
  }, [user]);
  useEffect(() => {
    async function imageupload() {
      if (image) {
        const data = new FormData();
        const fileName = Date.now() + image.name;
        data.append("name", fileName);
        data.append("file", image);
        console.log(data);
        await axios.post(`${RURL}/client/upload`, data);
        const { da } = await axios.post(`${RURL}/auth/editphoto`, {
          id: user?.id,
          profilephoto: `/${fileName}`,
        });
      }
    }
    imageupload();
  }, [image]);
  const handleClick = (a) => {
    setCurrentChat(a);
  };

  const handleEditName = (i) => {
    setEditName(true);
  };

  const handleEditAbout = (i) => {
    setEditAbout(true);
  };

  const handleSaveName = async () => {
    setEditName(false);
    const { data } = await axios.post(`${RURL}/auth/editname`, {
      id: user?.id,
      name: name,
    });
    dispatch(loadUser());
  };
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSaveAbout = async () => {
    setEditAbout(false);
    const { data } = await axios.post(`${RURL}/auth/editabout`, {
      id: user?.id,
      about: about,
    });
    dispatch(loadUser());
  };
  return (
    <ChatsContainer>
      <TopBar>
        <img
          src="./goback.svg"
          alt=""
          onClick={() => setShowProfile(false)}
          style={{ cursor: "pointer" }}
        />
        <h5 style={{ marginLeft: "30px", fontSize: "18px" }}>Profile</h5>
      </TopBar>
      <Upload>
        <Button component="label">
          {image ? (
            <UploadImg src={URL.createObjectURL(image)} alt="" />
          ) : (
            <UploadImg src={`${RURL}${user?.profilephoto}`} alt="" />
          )}
          <input type="file" hidden onChange={(e) => handleImage(e)} />
        </Button>
      </Upload>
      <Name>
        {editName ? (
          <>
            <Title>Your name</Title>
            <form style={{ position: "relative" }}>
              <TextField
                fullWidth
                value={name}
                id="standard-basic"
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
              <Saveimg
                src="./rightmark.svg"
                alt=""
                onClick={() => handleSaveName()}
              />
            </form>
          </>
        ) : (
          <>
            <Title>Your name</Title>

            <Description>{user?.name}</Description>
            <Edit src="./edit.svg" alt="" onClick={() => handleEditName()} />
          </>
        )}
      </Name>
      <Data>
        This is not your username or pin. This name will be visible to your
        WhatsApp contacts
      </Data>
      <Name>
        {editAbout ? (
          <>
            <Title>About</Title>

            <form style={{ position: "relative" }}>
              <TextField
                fullWidth
                value={about}
                id="standard-basic"
                variant="standard"
                onChange={(e) => setAbout(e.target.value)}
              />
              <Saveimg
                src="./rightmark.svg"
                alt=""
                onClick={() => handleSaveAbout()}
              />
            </form>
          </>
        ) : (
          <>
            <Title>About</Title>
            <Description>{user?.about}</Description>
            <Edit src="./edit.svg" alt="" onClick={() => handleEditAbout()} />
          </>
        )}
      </Name>
    </ChatsContainer>
  );
}
