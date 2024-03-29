import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login, logout } from "../actions/userAction";
import styled from "@emotion/styled";

const SignUp = styled.div`
  background-image: url("./whatsapp.png");
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-repeat: repeat;
  background-color: #efeae2;
  height: 100vh;
`;

const Title = styled.h5`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  outline: none;
  width: 220px;
  border: 1px solid #cccccc;
`;

const SubmitBtn = styled.input`
  background-color: #d9fdd3;
  padding: 10px 15px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 250px;
  color: #000000;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Login = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const Route = useRouter();
  useEffect(() => {
    dispatch(logout());
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      Route.push("/");
    }
  }, [dispatch, loading, isAuthenticated, user, error]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const formdata = { username: username, password: password };
    dispatch(login(formdata));
    console.log("o");
  };
  return (
    <>
      <SignUp>
        <div className="signupbox">
          <form className="loginform" onSubmit={(e) => handlesubmit(e)}>
            <div>
              <Title>username</Title>
              <Input
                type="text"
                className="inputs"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Title>password</Title>
              <Input
                type="text"
                className="inputs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <SubmitBtn type="submit" className="submitbutton" value="Log in" />
          </form>
          {error && <h3>wrong password or username</h3>}
          <ul style={{ marginTop: "15px" }}>
            if u dont have account{" "}
            <a
              onClick={() => Route.push("/register")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              register here
            </a>
          </ul>
        </div>
      </SignUp>
    </>
  );
};
export default Login;
