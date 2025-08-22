import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 class="text-3xl font-bold underline">Home Page</h1>
      <button onClick={() => navigate("/")}>Go to Default Page</button>
      <button onClick={() => navigate("/about")}>Go to About</button>
      <button onClick={() => navigate("/userlist")}>Go to UserList</button>
    </div>
  );
};

export default Home;
