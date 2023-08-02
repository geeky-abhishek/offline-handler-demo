/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { useOfflineSyncContext } from "offline-sync-handler-test";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [data, setData] = useState([]);
  const [callbackData, setCallbackData] = useState(null);

  const { sendRequest } = useOfflineSyncContext();

  const onSuccess = useCallback((cbd: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setCallbackData(JSON.stringify(cbd));
    setName("");
    setAvatar("");
    alert("Success Callback Triggered");
  }, []);

  const getData = useCallback(() => {
    setCallbackData(null)
    sendRequest({
      url: "https://64c6a0d10a25021fde91d725.mockapi.io/api/users",
      method: "GET",
    }).then((res: any) => {
      console.log({ res });
      setData(res);
    }, []);
  }, [sendRequest]);

  
  const addData = useCallback(() => {
    setCallbackData(null)
    sendRequest({
      url: "https://64c6a0d10a25021fde91d725.mockapi.io/api/users",
      method: "POST",
      data: { name, avatar },
      onSuccess,
    }).then((res: any) => {
      setName("");
      setAvatar("");
      getData();
      console.log({ postResp: res });
    });
  }, [avatar, getData, name, onSuccess, sendRequest]);

  return (
    <>
    {callbackData && callbackData}
      <table border={1} style={{ width: "80vw", marginTop: "50px" }}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>
              <input
                style={{ width: "90%" }}
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />{" "}
            </th>
          </tr>
          <tr>
            <th>Avatar</th>
            <th>
              <input
                style={{ width: "90%" }}
                type="text"
                value={avatar}
                onChange={(ev) => setAvatar(ev.target.value)}
              />{" "}
            </th>
          </tr>
        </tbody>
      </table>

      <button
        style={{ marginBottom: "10px", marginTop: "10px" }}
        onClick={addData}
      >
        Add
      </button>
      <br />
      <button onClick={getData}>Get</button>

      {data?.length > 0 && (
        <table border={1} style={{ width: "80vw", marginTop: "50px" }}>
          <thead>
            <tr>
              <th>*</th>
              <th>Name</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((rec: any) => (
              <tr>
                <td>{rec.id}</td>
                <td>{rec.name}</td>
                <td>{rec.avatar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
