import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import WhatsappIcon from "../components/icon";
import Videos from "../components/Videos";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const navigate = useRouter();
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
      <Videos />
    </>
  );
}
