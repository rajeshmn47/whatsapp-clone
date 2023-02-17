import styled from "@emotion/styled";

const ChatsContainer = styled.div``;

const ChatC = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  border-bottom: 1px solid #e9edef;
  background-color: #ffffff;
  width: 100%;
`;

const Chat = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 15px;
  background-color: #ffffff;
  justify-content: space-between;
  width: 100%;
`;

const UserImg = styled.img`
  max-height: 40px;
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
  width: 10%;
  font-size: 12px;
  color: #667781;
`;

export default function Chats() {
  return (
    <ChatsContainer>
      <ChatC>
        <Chat>
          <div style={{ width: "10%" }}>
            <UserImg src="./person.svg" alt="" />
          </div>
          <Details>
            <Username>+91 93477 27286</Username>
            <Message>Please send text messages to interact.</Message>
          </Details>
          <Time>19:56</Time>
        </Chat>
      </ChatC>
    </ChatsContainer>
  );
}
