// // ChatComponent.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// const ChatComponent = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');

//   const sendMessage = async () => {
//     if (!userInput.trim()) return; // Prevent empty messages

//     const userMessage = {
//       role: 'user',
//       parts: [{ text: userInput }]
//     };

//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setUserInput('');

//     try {
//       // Call your backend server instead of Gemini API directly
//       const response = await axios.post(
//         'http://localhost:5000/api/gemini', // Change this if your server runs elsewhere
//         { contents: updatedMessages }
//       );

//       // Defensive check for AI response
//       const aiText =
//         response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//         "Sorry, I couldn't generate a response.";

//       const aiReply = {
//         role: 'model',
//         parts: [{ text: aiText }]
//       };

//       setMessages([...updatedMessages, aiReply]);
//     } catch (err) {
//       console.error(err);
//       const errorReply = {
//         role: 'model',
//         parts: [{ text: "Error: Unable to get response from Gemini API." }]
//       };
//       setMessages([...updatedMessages, errorReply]);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: 'auto' }}>
//       <h2>AI Assistant</h2>
//       <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
//         {messages.map((msg, i) => (
//           <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
//             <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.parts[0].text}
//           </div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={userInput}
//         onChange={e => setUserInput(e.target.value)}
//         placeholder="Ask something..."
//         style={{ width: '80%', padding: 5 }}
//       />
//       <button onClick={sendMessage} style={{ padding: 5 }}>Send</button>
//     </div>
//   );
// };

// export default ChatComponent;

import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty messages

    // Perplexity messages format: { role: 'user'|'assistant', content: '...' }
    const userMessage = {
      role: 'user',
      content: userInput
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setUserInput('');

    try {
      const response = await axios.post(
        'http://localhost:5500/api/perplexity', // Updated endpoint
        { messages: updatedMessages }
      );

      // Extract AI response per Perplexity API docs
      const aiText =
        response.data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";

      const aiReply = {
        role: 'assistant',
        content: aiText
      };

      setMessages([...updatedMessages, aiReply]);
    } catch (err) {
      console.error(err);
      const errorReply = {
        role: 'assistant',
        content: "Error: Unable to get response from Perplexity API."
      };
      setMessages([...updatedMessages, errorReply]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>AI Assistant</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Ask something..."
        style={{ width: '80%', padding: 5 }}
      />
      <button onClick={sendMessage} style={{ padding: 5 }}>Send</button>
    </div>
  );
};

export default ChatComponent;

