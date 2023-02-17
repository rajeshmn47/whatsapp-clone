import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import WhatsappIcon from "../components/icon";
import Home from "../components/home";
import Login from "../components/login";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <Login/>
    </>
  );
}