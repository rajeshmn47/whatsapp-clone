import React, { useEffect, useState } from "react";

export default function App() {
  return <NetworkStatus />;
}
const NetworkStatus = () => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);

  return status ? "Online" : "Offline";
};
