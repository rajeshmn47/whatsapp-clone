import styled from "@emotion/styled";
import { Grid } from "@mui/material";

const Container = styled.div`
  padding: 10px 10px;
  border-bottom: 1px solid #e9edef;
  background-color: #f0f2f5;
`;

const InputEnclose = styled.div`
  background-color: #ffffff;
  height: 40px;
  border-radius: 5px;
  width: 650px;
`;

const SearchImg = styled.img`
  margin-left: 10px;
`;

const Input = styled.input`
  background-color: #ffffff;
  border: none;
  outline: none;
  margin-left: 30px;
  width: 100%;
`;

export default function InputContainer({ message, setMessage }) {
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
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </InputEnclose>
        </Grid>
      </Grid>
    </Container>
  );
}
