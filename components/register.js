import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  border: 1px solid #cccccc;
`;

const SubmitBtn = styled.input`
  background-color: #d9fdd3;
  padding: 10px 15px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
  color: #000000;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Signup = () => {
  const dispatch = useDispatch();
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
    console.log("ok");
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
                type="text"
                className="inputs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <SubmitBtn type="submit" className="submitbutton" value="Sign up" />
          </form>
        </div>
      </SignUp>
    </>
  );
};
export default Signup;
