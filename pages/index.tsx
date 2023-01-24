import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  
  const [fetchedUsername, setFetchedUsername] = useState("");
  const [fetchedPassword, setFetchedPassword] = useState("");

  const handleSubmit = () => {
    // Encrypt credentials
    secureLocalStorage.setItem("username", username);
    secureLocalStorage.setItem("password", password);
  };

  const handleRetrieve = () => {
    // Retrieve and decrypt credentials
    const decryptedUsername = secureLocalStorage.getItem("username") as string;
    const decryptedPassword = secureLocalStorage.getItem("password") as string;
    setFetchedUsername(decryptedUsername);
    setFetchedPassword(decryptedPassword);
  };

  const handleRemovePassword = () => {
    // Remove credentials
    secureLocalStorage.removeItem("password");
    handleRetrieve();
  };
  const handleClear = () => {
    // Clear credentials
    secureLocalStorage.clear();
    handleRetrieve();
  };

  return (
    <div className="flex flex-col items-center mt-24">
      <div className="flex flex-col gap-1 mb-4 text-sm">
        <label htmlFor="">Username</label>
        <input
          className="p-2 border rounded"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div className="flex flex-col gap-1 mb-4 text-sm">
        <label htmlFor="">Password</label>
        <input
          className="p-2 border rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="flex justify-around gap-2">
        <button
          className="p-2 text-white bg-blue-500 rounded hover:shadow-md hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="p-2 text-white bg-blue-500 rounded hover:shadow-md hover:bg-blue-600"
          onClick={handleRetrieve}
        >
          Retrieve
        </button>
        <button
          className="p-2 text-white bg-blue-500 rounded hover:shadow-md hover:bg-blue-600"
          onClick={handleRemovePassword}
        >
          Remove password
        </button>
        <button
          className="p-2 text-white bg-blue-500 rounded hover:shadow-md hover:bg-blue-600"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div className="flex flex-col items-center mt-4">
        <p className="text-xl">Username: {fetchedUsername}</p>
        <p className="text-xl">Password: {fetchedPassword}</p>
      </div>
    </div>
  );
};

export default Home;
