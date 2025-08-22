import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">UserList</h1>
      <div className="mb-6 space-x-2">
        <button onClick={() => navigate("/")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Default Page
        </button>
        <button onClick={() => navigate("/home")} className="bg-green-500 text-white px-4 py-2 rounded">
          Go to Home
        </button>
        <button onClick={() => navigate("/about")} className="bg-purple-500 text-white px-4 py-2 rounded">
          Go to About
        </button>
        <button onClick={() => navigate("/usertable")} className="bg-indigo-500 text-white px-4 py-2 rounded">
          Go to UserTable
        </button>
      </div>
      <div className="bg-white shadow-lg rounded p-4">
        <ol className="list-decimal ml-6 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="text-lg text-gray-800">
              {user.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default UserList;
