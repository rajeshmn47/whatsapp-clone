import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { register } from "../actions/userAction";

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
  width: 100%;
  color: #000000;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Signup = () => {
  const dispatch = useDispatch();
  const Route = useRouter();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
    }
    if (isAuthenticated) {
    }
  }, [dispatch, loading, isAuthenticated, user, error]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const formdata = { username: username, password: password };
    dispatch(register(formdata));
  };
  return (
    <>
      <SignUp>
        <div className="joinup">
          <h1 className="joint">Join the Whatsapp community</h1>
        </div>
        <div className="signupbox">
          <div
            className="sociallogin google"
            onClick={() => navigate("/googlelogin")}
          >
            <img src="" alt="" style={{ marginRight: "5px" }} />
          </div>
          <form className="signupform" onSubmit={(e) => handlesubmit(e)}>
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
                type="password"
                className="inputs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <SubmitBtn type="submit" className="submitbutton" value="Sign up" />
          </form>
          <ul style={{ marginTop: "15px", textAlign: "center" }}>
            if u have account{" "}
            <a
              onClick={() => Route.push("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              login here
            </a>
          </ul>
        </div>
        {isAuthenticated && <h5>registered successfully</h5>}
      </SignUp>
    </>
  );
};
export default Signup;
