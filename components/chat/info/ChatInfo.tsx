import { ReactElement, useEffect, useState } from "react";
import Axios from "axios";
import Heading from "./Heading";
import type { NextApiRequest, NextApiResponse } from "next";
import getChatInfo from "pages/api/chat/getChatInfo";

function App() {
  const [name, getChatName] = useState("");
  const [desc, getChatDesc] = useState("");
  const [users, getChatUsers] = useState("");
  const [creator, getChatCreator] = useState("");

  //i dont know the url exactly but thats an easy fix (right)
  //this ip should be the chat window its getting info for
  /*
    const getInfo = () => {
        Axios.get("34.175.26.133").then((Response)=> {
            console.log(Response);
            getChatName(Response.data.name)
            getChatDesc(Response.data.description)
            getChatCreator(Response.data.creatorId)
            getChatUsers(Response.data.users)
        })
    }*/

  return;
  <>
    <div>
      <Heading title={name} />
      <Heading title={desc} />
      <Heading title={creator} />
      <ul>
        {users.split(",").map((user) => (
          <Heading title={user} />
        ))}
      </ul>
    </div>
  </>;
}

export default App();
