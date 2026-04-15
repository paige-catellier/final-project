import { useState, useEffect, use } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  isOpen,
  closeModal,
  handleSubmit,
  handleSwitch,
  isLoading,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit({ email, password });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrors({});
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign in"
      name="signin"
      buttonText="Sign in"
      secondButtonText="Or Sign up"
      closeModal={closeModal}
      isOpen={isOpen}
      handleSubmit={handleLocalSubmit}
      isLoading={isLoading}
      handleSwitch={handleSwitch}
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      {errors.email && <span>{errors.email}</span>}

      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
      />
      {errors.password && <span>{errors.password}</span>}
    </ModalWithForm>
  );
}

export default LoginModal;
