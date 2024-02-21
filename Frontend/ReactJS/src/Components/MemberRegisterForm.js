import { useState } from "react";
import "./MemberReg.css";
import { useNavigate } from "react-router-dom";
import { useSelectedOptions } from "./SelectedOptionsContext/SelectedOptionsContext";
function MemberRegisterForm() {
  const navigate = useNavigate();
  const { login } = useSelectedOptions();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    dlNumber: "",
    passportNo: "",
    adhaarNumber: "",
    city: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Post form data to backend
    fetch("http://localhost:8080/api/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        login(data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("User Already exists!");
      });
  };
  return (
    <div className="containerForm">
      <form className="customerForm" onSubmit={handleSubmit}>
        <br />
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
        />
        <br />
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
        />
        <br />
        <label>Mobile Number</label>
        <input
          type="text"
          placeholder="Mobile Number"
          onChange={handleChange}
          name="mobileNumber"
          value={formData.mobileNumber}
        />

        <br />
        <label>Email Id</label>
        <input
          type="email"
          placeholder="Email Id"
          onChange={handleChange}
          name="emailId"
          value={formData.emailId}
        />

        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={formData.password}
        />

        <br />
        <label>City</label>
        <input
          type="text"
          placeholder="City"
          onChange={handleChange}
          name="city"
          value={formData.city}
        />
        <br />
        <label>Local Driving Lic</label>
        <input
          type="text"
          placeholder="dL Number"
          onChange={handleChange}
          name="dLNumber"
          value={formData.dLNumber}
        />

        <br />

        <label>Passport Number</label>
        <input
          type="text"
          placeholder="Enter Passport Number"
          onChange={handleChange}
          name="passportNo"
          value={formData.passportNo}
        />

        <br />

        <label>Adhaar Number</label>
        <input
          type="text"
          placeholder="Enter Adhaar Number"
          onChange={handleChange}
          name="aadharNo"
          value={formData.aadharNo}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MemberRegisterForm;
