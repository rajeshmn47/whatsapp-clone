import { useEffect, useState } from "react";
import axios from "axios";
import { RURL } from "../constants/userConstants";

export default function UserCard({ i }) {
  const [user, setUser] = useState();
  useEffect(() => {
    async function getUser() {
      if (i) {
        const data = await axios.get(`${RURL}/auth/getuser/${i}`);
        console.log(data, "getuser");
        setUser(data.data.data);
      }
    }
    getUser();
  }, [i]);
  return <h3 style={{ textTransform: "capitalize" }}>{user?.name}</h3>;
}
