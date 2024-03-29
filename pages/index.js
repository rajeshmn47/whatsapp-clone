import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import WhatsappIcon from "../components/icon";
import Home from "../components/home";
import { useSelector } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const navigate = useRouter();
  const { user, isAuthenticated, loading, error, token } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    const servertoken =
      localStorage.getItem("server_token") &&
      localStorage.getItem("server_token");
    if (!servertoken) {
      navigate.push("/login");
    }
  }, []);
  return (
    <>
      <Home />
    </>
  );
}
