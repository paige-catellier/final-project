import { useState } from "react";
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

  const isValid =
    email.includes("@") && /\S+@\S+\.\S+/.test(email) && password.length > 0;

  console.log("isLoading:", isLoading);
  console.log("isValid:", isValid);

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

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit({ email, password });
    }
    console.log("validation running");
    console.log("newErrors:", newErrors);
  };

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
    </ModalWithForm>
  );
}

export default LoginModal;
