// App.js
import React, { useState, useEffect } from "react";
import "./App.scss";
import UserCard from "./components/UserCard";
import { UilUserCircle } from "@iconscout/react-unicons";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [access, setAccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const generateUniqueId = () => {
    // Generate a unique ID using a timestamp (you can use a library like uuid for better uniqueness)
    return new Date().getTime();
  };

  const addUser = (user) => {
    const newUser = { ...user, id: generateUniqueId() };
    setUsers([...users, newUser]);
  };

  const deleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setSelectedUser(null);
  };

  const editUser = (userToEdit) => {
    setSelectedUser(userToEdit);
  };

  const viewUser = (userToView) => {
    setSelectedUser(userToView);
    setAccess(!access);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();

    if (!selectedUser) {
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? selectedUser : user
    );

    setUsers(updatedUsers);

    setSelectedUser(null);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Calculate the index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="App">
      <div className="main_header">
        <p>USER'S INVENTORY</p>
        <p>
          <UilUserCircle />
        </p>
      </div>
      <UserForm addUser={addUser} />
      {currentUsers.length > 0 ? (
        <div className="user-cards">
          {currentUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              deleteUser={() => deleteUser(user.id)}
              editUser={() => editUser(user)}
              viewUser={() => viewUser(user)}
            />
          ))}
        </div>
      ) : (
        <h1 className="heading">Please Add User's...</h1>
      )}
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`page-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      {/* View Popup */}
      {selectedUser && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>USER DETAILS</h2>
            <div className="p-4">
              <table>
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{selectedUser.name}</td>
                  </tr>
                  <tr>
                    <td>Age:</td>
                    <td>{selectedUser.age}</td>
                  </tr>
                  <tr>
                    <td>DOB:</td>
                    <td>{selectedUser.date}</td>
                  </tr>
                  <tr>
                    <td>Gender:</td>
                    <td>{selectedUser.gender}</td>
                  </tr>
                  <tr>
                    <td>Food:</td>
                    <td>{selectedUser.food}</td>
                  </tr>
                  <tr>
                    <td>Hobbies:</td>
                    <td>{selectedUser.hobbies}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Edit Popup */}
      {selectedUser && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>EDIT USER</h2>
            <form onSubmit={handleEdit}>
              <div className="form_main">
                <div className="flex-col">
                  <label htmlFor="name">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedUser.name}
                    onChange={handleEditChange}
                    disabled={access}
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="age">AGE</label>
                  <input
                    type="number"
                    name="age"
                    value={selectedUser.age}
                    onChange={handleEditChange}
                    disabled={access}
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="date">DOB</label>
                  <input
                    type="date"
                    name="date"
                    value={selectedUser.date}
                    onChange={handleEditChange}
                    disabled={access}
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="gender">GENDER</label>
                  <div className="flex-row">
                    <input
                      type="radio"
                      id="edit-male"
                      name="gender"
                      value="male"
                      checked={selectedUser.gender === "male"}
                      onChange={handleEditChange}
                      disabled={access}
                    />
                    <label htmlFor="edit-male">MALE</label>
                    <input
                      type="radio"
                      id="edit-female"
                      name="gender"
                      value="female"
                      checked={selectedUser.gender === "female"}
                      onChange={handleEditChange}
                      disabled={access}
                    />
                    <label htmlFor="edit-female">FEMALE</label>
                  </div>
                </div>
                <div className="flex-col">
                  <label htmlFor="food">FAVOURITE FOOD</label>
                  <select
                    name="food"
                    id="food"
                    value={selectedUser.food}
                    onChange={handleEditChange}
                    disabled={access}
                  >
                    <option value="burger">Burger</option>
                    <option value="pizza">Pizza</option>
                    <option value="pasta">Pasta</option>
                  </select>
                </div>
                <div className="flex-col">
                  <label htmlFor="hobbies">HOBBIES</label>
                  <textarea
                    id="hobbies"
                    name="hobbies"
                    className="border"
                    rows="4"
                    cols="50"
                    value={selectedUser.hobbies}
                    onChange={handleEditChange}
                    disabled={access}
                  ></textarea>
                </div>
              </div>
              <div className="flex_property">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => {
                    closePopup();
                    setSelectedUser(null);
                  }}
                >
                  {!access ? "CANCEL" : "CLOSE"}
                </button>
                {!access && (
                  <button type="submit" className="add">
                    SUBMIT
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
