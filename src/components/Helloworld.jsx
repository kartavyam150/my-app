import { useNavigate } from "react-router-dom";
// import styles from "./HelloWorld.module.css";
import "./Helloworld.module.css";
import { useState } from "react";
import Sidebar from "./Sidebar";

const HelloWorld = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const hello = () => {
    setCount('kartavya');
  };

  const shoot = () => {
    alert(count);
  };

  return (
    <div className={styles.container}>
      {/* Toggle button fixed at top-left */}
      {/* <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className={styles.toggleButton}
        aria-label="Toggle Sidebar"
      >
        {showSidebar ? "✖" : "☰"}
      </button> */}
      {/* {showSidebar && <Sidebar />} */}
      <div
        className={styles.content}
      >
        <h1 className={styles.title}>Hello,{count}!</h1>
        <div>
          <button onClick={hello}>Say Hi!</button>
        </div>
        <button onClick={() => shoot(count)}>Take the shot!</button>
      </div>
    </div>
  );
};
export default HelloWorld;
