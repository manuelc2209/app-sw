import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [val, setVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectivityStatus, setConnectivityStatus] = useState<
    "online" | "offline"
  >(navigator.onLine ? "online" : "offline");
  const [reqs, setReqs] = useState<any[]>([]);

  const submitEv = () => {
    setIsLoading(true);
    const article = { title: val };
    axios
      .post("https://reqres.in/api/articles", article)
      .then((response) => {
        setReqs((prevReqs) => [...prevReqs, response.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const handleOnline = () => {
      setConnectivityStatus("online");
    };
    const handleOffline = () => {
      setConnectivityStatus("offline");
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>{connectivityStatus}</div>
        <div className="wrapper">
          <input
            className="app-input"
            value={val}
            onChange={(ev) => setVal(ev.target.value)}
          />
          <button
            className="btn-submit"
            onClick={() => submitEv()}
            disabled={!val || isLoading}
          >
            Submit
          </button>
        </div>
        {reqs &&
          reqs.map((entry) => (
            <React.Fragment key={entry.createdAt}>
              <div>{entry.id}</div>
              <div>{entry.title}</div>
              <div>{entry.createdAt}</div>
              <br />
            </React.Fragment>
          ))}
      </header>
    </div>
  );
}

export default App;
