import { useState, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  closeModal,
  handleRegister,
  handleSwitch,
  isLoading,
  onSuccess,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const handleLocalSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length <= 5) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (username.length < 2) {
      newErrors.username = "Username must be longer than 2 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleRegister({ email, password, username });
      onSuccess();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setUsername("");
      setErrors({});
    }
  }, [isOpen]);

  const isValid =
    /\S+@\S+\.\S+/.test(email) && password.length > 5 && username.length >= 2;

  return (
    <ModalWithForm
      title="Sign up"
      name="signup"
      buttonText="Sign up"
      secondButtonText="Sign in"
      closeModal={closeModal}
      isOpen={isOpen}
      handleSubmit={handleLocalSubmit}
      isLoading={isLoading}
      handleSwitch={handleSwitch}
      isValid={isValid}
    >
      <input
        className="modal__input"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        required
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}

      <input
        className="modal__input"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
        required
      />
      {errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}

      <input
        className="modal__input"
        type="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Enter your username"
        required
      />
      {errors.username && (
        <span className="modal__error">{errors.username}</span>
      )}
    </ModalWithForm>
  );
}

export default RegisterModal;
