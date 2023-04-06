import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Button } from "@mui/material";
import UserCarde from "./UserCarde";

const Status = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  color: #ffffff;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    margin-right: 6px;
  }
`;

const Raise = styled.div`
  z-index: 100000;
  width: 400px;
  height: auto;
  padding: 10px 15px;
`;

const TopBar = styled.div`
  background-color: #008069;
  padding-right: 20px;
  padding-left: 23px;
  height: 68px;
  display: flex;
  flex: none;
  align-items: center;
  width: 100%;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 18px;
`;

export default function SeenBy({ status }) {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [seenby, setSeenBy] = useState();
  const [seenUsers, setSeenUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getseen() {
      if (status) {
        console.log(status?.seen_by, "seenby");
        let a = status?.seen_by?.split("user").length - 1;
        setSeenBy(a);
        let users = [];
        let seen = status?.seen_by?.split("+");
        console.log(seen, "seen");
        for (let i = 0; i < seen?.length; i++) {
          users.push(seen[i].split("user")[1]);
        }
        setSeenUsers([...users]);
      }
    }
    getseen();
  }, [status]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {user?.id == status?.posted_by && (
        <Status onClick={() => setShow(true)}>
          <img src="./view.svg" alt="" />
          <h3>{seenby && seenby}</h3>
        </Status>
      )}
      <Dialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <TopBar>
          <img
            src="./closewhite.svg"
            alt=""
            onClick={() => setShow(false)}
            style={{ cursor: "pointer" }}
          />
          <h6 style={{ fontSize: "18px", marginLeft: "10px" }}>
            Viewed by {seenUsers?.length}
          </h6>
        </TopBar>
        <Raise>
          <h6>
            {seenUsers.length > 0 && seenUsers.map((s) => <UserCarde i={s} />)}
          </h6>
        </Raise>
      </Dialog>
    </>
  );
}
