import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { URL } from "../constants/userConstants";
import UserCard from "./UserCard";
import UserCarde from "./UserCarde";
import UserChat from "./UserChat";

const ChatsContainer = styled.div`
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

const New = styled.div`
  background-color: green;
  color: white;
`;

export default function Videos({
  showusers,
  users,
  conversations,
  currentChat,
  setCurrentChat,
}) {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const handleClick = (a) => {
    setCurrentChat(users.find((u) => u.id == a));
  };
  console.log(users, "users");
  return (
    <>
      <h1>videos</h1>
    </>
  );
}
