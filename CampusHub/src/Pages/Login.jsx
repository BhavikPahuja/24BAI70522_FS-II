import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/validation";

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "Bhavik",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    const error = validateLogin(formData.email, formData.password);
    if (error) {
      setErrorMessage(error);
      return;
    }

    setErrorMessage("");

    props.onLogin({
      name: formData.name || "Bhavik",
      email: formData.email,
    });

    navigate("/dashboard");
  }

  return (
    <div>
      <div>
        <h2>CampusHub Login</h2>
        <p>Dummy authentication (no backend)</p>

        <form onSubmit={submitHandler}>
          <label>
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>

          <label>
            Email
            <input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>

          <button type="submit">Login</button>

          {errorMessage ? <p>{errorMessage}</p> : null}
        </form>
      </div>
    </div>
  );
}

export default Login;
