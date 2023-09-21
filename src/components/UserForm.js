// UserForm.js
import React, { useState } from "react";
const id = Math.floor(Math.random() * 100000000);
function UserForm({ addUser }) {
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    age: "",
    date: "",
    gender: "male",
    food: "burger",
    hobbies: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Track if the popup is open

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() !== "" && formData.age.trim() !== "") {
      addUser(formData);
      setFormData({
        id: id,
        name: "",
        age: "",
        date: "",
        gender: "male",
        food: "burger",
        hobbies: "",
      });
      setIsPopupOpen(false); // Close the popup after adding a user
    }
  };
  return (
    <div className="user-form">
      <div className="main_btn_header">
        <p>LIST OF USERS</p>
        <button onClick={() => setIsPopupOpen(true)} className="btn_blue">
          ADD USERS
        </button>
      </div>
      {isPopupOpen && ( // Conditionally render the popup form
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setIsPopupOpen(false)}>
              &times;
            </span>
            <h2>ADD USERS</h2>
            <form onSubmit={handleSubmit}>
              <div className="form_main">
                <div className="flex-col">
                  <label htmlFor="name">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="age">AGE</label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="date">DOB</label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-col">
                  <label htmlFor="date">GENDER</label>

                  <div className="flex-row">
                     {" "}
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                    />
                      <label htmlFor="male">MALE</label>
                    <br /> {" "}
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                    />
                      <label htmlFor="female">FEMALE</label>
                    <br />
                  </div>
                </div>
                <div className="flex-col">
                  <label htmlFor="name">FAVOURITE FOOD</label>

                  <select
                    name="food"
                    id="food"
                    value={formData.food}
                    onChange={handleChange}
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
                    value={formData.hobbies}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="flex_property">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setIsPopupOpen(false)}
                >
                  CANCEL
                </button>
                <button type="submit" className="add">
                  ADD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserForm;
