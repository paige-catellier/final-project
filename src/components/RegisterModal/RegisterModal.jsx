import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  closeModal,
  handleSubmit,
  handleSwitch,
  isLoading,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const isValid =
    email.includes("@") &&
    /\S+@\S+\.\S+/.test(email) &&
    password.length > 0 &&
    username.length >= 2;

  const handleLocalSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (username.length < 2) {
      newErrors.username = "Username must be longer than 2 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit({ email, password, username });
      onSuccess();
    }
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="signup"
      buttonText="Sign up"
      secondButtonText="Or Sign in"
      closeModal={closeModal}
      isOpen={isOpen}
      handleSubmit={handleLocalSubmit}
      isLoading={isLoading}
      isValid={isValid}
      handleSwitch={handleSwitch}
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        required
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
        required
      />
      {errors.password && <span>{errors.password}</span>}

      <input
        type="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Enter your username"
        required
      />
      {errors.password && <span>{errors.password}</span>}
    </ModalWithForm>
  );
}

export default RegisterModal;
