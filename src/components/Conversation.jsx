import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = "https://fahrradmarket.cyclic.app";
const API_URL2 = "http://localhost:5005"
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`${API_URL2}/users?userId=` + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <span className="conversationName">{user?.name[0].toUpperCase() + user?.name.slice(1)}</span>
    </div>
  );
}