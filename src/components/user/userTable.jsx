import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">UserTable Page</h1>
      <div className="mb-4 space-x-2">
        <button onClick={() => navigate("/")} className="bg-blue-500 text-white px-4 py-2 rounded">Go to Default Page</button>
        <button onClick={() => navigate("/home")} className="bg-green-500 text-white px-4 py-2 rounded">Go to Home</button>
        <button onClick={() => navigate("/userlist")} className="bg-purple-500 text-white px-4 py-2 rounded">Go to UserList</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">Sr. No</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">User Name</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">Address</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">Website</th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">Company</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.username}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.address.city}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.website}</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">{user.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
