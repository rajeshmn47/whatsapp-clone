import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { RURL } from "../constants/userConstants";

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

export default function UserCarde({ i }) {
  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
      if (i) {
        const data = await axios.get(`${RURL}/auth/getuser/${i}`);
        console.log(data, "getuser");
        setUser(data.data.data);
      }
    }
    getUser();
  }, [i]);
  return (
    <Chat>
      <div style={{ width: "13%" }}>
        <UserImg src={`${RURL}${user?.profilephoto}`} alt="" />
      </div>
      <Details>
        <Username>{user?.name}</Username>
      </Details>
      <Time>19:56</Time>
    </Chat>
  );
}
