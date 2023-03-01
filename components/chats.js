import styled from "@emotion/styled";
import { useSelector } from "react-redux";

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

export default function Chats({ users, currentChat, setCurrentChat }) {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const handleClick = (a) => {
    setCurrentChat(a);
  };
  return (
    <ChatsContainer>
      {users.length > 0 &&
        users.map(
          (c, index) =>
            c.id != user?.id && (
              <ChatC
                onClick={() => handleClick(c)}
                className={currentChat?.id == c.id && "selected"}
              >
                <Chat>
                  <div style={{ width: "13%" }}>
                    <UserImg src="./person.svg" alt="" />
                  </div>
                  <Details>
                    <Username>{c.name}</Username>
                    <Message>Please send text messages to interact.</Message>
                  </Details>
                  <Time>19:56</Time>
                </Chat>
              </ChatC>
            )
        )}
    </ChatsContainer>
  );
}
