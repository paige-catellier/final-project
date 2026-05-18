import { useState, useEffect, use } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  closeModal,
  handleLogin,
  handleSwitch,
  isLoading,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    console.log("validation running");

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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleLogin({ email, password });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrors({});
    }
  }, [isOpen]);

  const isValid = /\S+@\S+\.\S+/.test(email) && password.length > 5;

  return (
    <ModalWithForm
      title="Sign in"
      name="signin"
      buttonText="Sign in"
      secondButtonText="Sign up"
      closeModal={closeModal}
      isOpen={isOpen}
      handleSubmit={handleLocalSubmit}
      isLoading={isLoading}
      handleSwitch={handleSwitch}
      isValid={isValid}
    >
      <p className="modal__label">Email</p>
      <input
        className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      {errors.email && <span className="modal__error">{errors.email}</span>}
      <p className="modal__label">Password</p>
      <input
        className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
      />
      {errors.password && (
        <span className="modal__error">{errors.password}</span>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
