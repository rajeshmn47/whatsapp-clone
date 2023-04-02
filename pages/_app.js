import "../styles/globals.css";
import { wrapper } from "../store";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { Metadata } from "next";
import { useRouter } from "next/router";
import {
  loadToken,
  loadUser,
  logout,
  onlineStatus,
} from "../actions/userAction";
import PageLayout from "../components/PageLayout";

function MyApp({ Component, pageProps, ...rest }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { store, props } = wrapper.useWrappedStore(rest);
  const { user, isAuthenticated, loading, error, message } = useSelector(
    (state) => state.user
  );
  const [status, setStatus] = useState(true);

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
      dispatch(onlineStatus(navigator.onLine));
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadToken());
  }, [dispatch]);
  useEffect(() => {
    console.log(user, "raveena");
  }, [user]);

  return (
    <>
      <Head>
        <title>{message && `(${message})`}whatsapp</title>
        <meta
          name="description"
          content="TimesPro helps you achieve your professional goals and advance your
      career while transforming your life through learning. Read on for more
      information"
        />
      </Head>
      <Provider store={store}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp, { debug: true });
