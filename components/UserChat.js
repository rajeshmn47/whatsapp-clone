import { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import moment from "moment";
import { RURL } from "../constants/userConstants";
import { useSelector } from "react-redux";
import { getDisplayDate } from "../utils/dateformat.js";

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
  margin-right: 15px;
`;

const Details = styled.div`
  width: 80%;
`;

const Username = styled.h6`
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  color: #111b21;
  white-space: nowrap;
`;

const Message = styled.h6`
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
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
  white-space: nowrap;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 340px;
`;

const New = styled.div`
  background-color: green;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: #1fa855;
`;

export default function UserChat({ i, newm, u }) {
  const [use, setUser] = useState();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    async function getUser() {
      if (i) {
        const data = await axios.get(`${RURL}/auth/getuser/${i}`);
        setUser(data.data.data);
      }
    }
    getUser();
  }, [i]);
  return (
    <>
      {newm ? (
        <Chat>
          <div style={{ width: "" }}>
            <UserImg src={`${RURL}${use?.profilephoto}`} alt="" />
          </div>
          <Details>
            <Bottom>
              <Username>{use?.name}</Username>
              <Time>
                {newm.filter((n) => n.senderid == user?.id).length > 0 &&
                  getDisplayDate(
                    newm.filter((n) => n.senderid == user?.id)[
                      newm.filter((n) => n.senderid == user?.id).length - 1
                    ].created_at,
                    "date"
                  )}
              </Time>
            </Bottom>
            {newm?.length > 0 &&
              newm.filter((n) => n.senderid == user?.id).length > 0 && (
                <Bottom>
                  <Message>
                    {newm[newm.length - 1].senderid == user?.id &&
                    newm[newm.length - 1].is_seen ? (
                      <img src="./seen.svg" alt="" />
                    ) : newm[newm.length - 1].senderid == user?.id ? (
                      <img src="./sent.svg" alt="" />
                    ) : null}
                    {newm[newm.length - 1].message}
                  </Message>
                  {newm.filter(
                    (n) => n.senderid != user?.id && n.is_seen == false
                  ).length > 0 && (
                    <New>
                      {
                        newm.filter(
                          (n) => n.senderid != user?.id && n.is_seen == false
                        ).length
                      }
                    </New>
                  )}
                </Bottom>
              )}
          </Details>
        </Chat>
      ) : (
        <Chat>
          <div style={{ width: "" }}>
            <UserImg src={`${RURL}${use?.profilephoto}`} alt="" />
          </div>
          <Details>
            <Bottom>
              <Username>{u?.name}</Username>
              <Time></Time>
            </Bottom>
          </Details>
        </Chat>
      )}
    </>
  );
}
