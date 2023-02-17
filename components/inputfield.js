import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const Container = styled.div`
  padding: 10px 10px;
  border-bottom: 1px solid #e9edef;
  background-color: #ffffff;
`;

const InputEnclose = styled.div`
  background-color: #f0f2f5;
  height: 40px;
  border-radius: 5px;
`;

const SearchImg = styled.img`
  margin-left: 10px;
`;

const Input = styled.input`
  background-color: #f0f2f5;
  border: none;
  outline: none;
  margin-left: 30px;
`;

export default function InputContainer() {
  return (
    <Container>
      <Grid container>
        <Grid
          item
          lg={11}
          md={11}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <InputEnclose style={{ display: "flex", alignItems: "center" }}>
            <SearchImg src="./search.svg" alt="" />
            <Input placeholder="Search or start new chat" />
          </InputEnclose>
        </Grid>
        <Grid
          item
          lg={1}
          md={1}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src="./sort.svg" alt="" style={{ marginLeft: "10px" }} />
        </Grid>
      </Grid>
    </Container>
  );
}
