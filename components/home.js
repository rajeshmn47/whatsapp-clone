import { Grid } from "@mui/material";
import WhatsappIcon from "./icon";
import UserIcon from "./usericon.jsx";
import GroupsIcon from "@mui/icons-material/Groups";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MoreHoriz } from "@mui/icons-material";
import styled from "@emotion/styled";
import InputContainer from "./inputfield";
import Chats from "./chats";

const Container = styled.div`
  background-color: #f0f2f5;
  width: 100%;
`;

const TopBar = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  img {
    margin-right: 16px;
  }
`;

const SideBar = styled.div``;

const BottomBar = styled.div`
  height: 600px;
  background-color: #ffffff;
`;

const RightBar = styled(Grid)`
  background-image: url("./whatsapp.png");
  background-color:#efeae2;
`;
export default function Home() {
  return (
    <Container>
      <Grid container style={{ width: "100%" }}>
        <Grid item md={4.5} lg={4.5}>
          <SideBar>
            <TopBar>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item md={2} lg={2}>
                  <img src="./person.svg" alt="" style={{ width: "40px" }} />
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
                  <img src="./group.svg" alt="" />
                  <img src="./status.svg" alt="" />
                  <img src="./chat.svg" alt="" />
                  <img src="./more.svg" alt="" />
                </Grid>
              </Grid>
            </TopBar>
            <InputContainer />
            <Chats />
            <BottomBar></BottomBar>
          </SideBar>
        </Grid>
        <RightBar item md={7.5} lg={7.5} style={{ float: "right" }}>
          <div
            style={{
              width: "100%",
              float: "right",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WhatsappIcon style={{ float: "right" }} />
        
          </div>
        </RightBar>
      </Grid>
    </Container>
  );
}
