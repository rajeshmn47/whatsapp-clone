import "../styles/globals.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import wrapper from "../store";
import { loadUser, logout } from "../actions/userAction";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  useEffect(() => {
    console.log(user, "raveena");
    if (user && user.username) {
      console.log("crazystaag");
    }
  }, [user]);
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp, { debug: true });
