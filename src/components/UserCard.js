// UserCard.js
import React from "react";

function UserCard({ user, deleteUser, editUser, viewUser }) {
  const { name, age, date, gender, food, hobbies } = user;
  const getAgeColor = () => {
    if (age <= 25) return "green";
    if (age <= 50) return "purple";
    return "orange";
  };
  return (
    <div className="user-card">
      <div className="flex_between">
        <p>{name}</p>
        <div className={`circle ${getAgeColor()}`} />
      </div>
      <div className="p-4">
        <table>
          <tbody>
            <tr>
              <td>AGE:</td>
              <td className="detail">{age}</td>
            </tr>
            <tr>
              <td>DOB:</td>
              <td className="detail">{date}</td>
            </tr>
            <tr>
              <td>GENDER:</td>
              <td className="detail">{gender}</td>
            </tr>
            <tr>
              <td>FOOD:</td>
              <td className="detail">{food}</td>
            </tr>
            <tr>
              <td>HOBBIES:</td>
              <td className="detail">{hobbies}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border_btn">
        <button className="bg_red" onClick={() => deleteUser(user)}>
          DELETE
        </button>
        <button className="bg_green" onClick={() => viewUser(user)}>
          VIEW
        </button>
        <button className="bg_blue" onClick={() => editUser(user)}>
          EDIT
        </button>
      </div>
    </div>
  );
}

export default UserCard;
