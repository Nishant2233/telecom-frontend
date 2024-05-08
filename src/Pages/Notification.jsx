import React, { useState } from "react";
import axios from "axios";

const Notification = () => {
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const sendMessage = (event) => {
    event.preventDefault();

    axios
      .post("https://telcom-backend.onrender.com/send-message", { message }) // Send message directly in the request body
      .then((response) => {
        console.log("Message sent successfully:", response);
        setMessageSent(true);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
    setMessageSent(false);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full md:w-1/2 h-[52vh] mt-16 lg:w-1/3 p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={sendMessage}>
          <p className="text-center pb-5">Enter Message</p>
          <div className="mb-4">
            <textarea
              value={message}
              name="message"
              onChange={handleMessageChange}
              className="w-full border rounded p-2"
              rows="10"
              placeholder="Text Here"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit" // Set button type to submit
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </div>
        </form>

        {messageSent && (
          <p className="text-green-600 text-center mt-3">
            Message sent successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default Notification;
