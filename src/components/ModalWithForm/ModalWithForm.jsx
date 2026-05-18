import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  title,
  name,
  buttonText,
  secondButtonText,
  closeModal,
  isOpen,
  handleSubmit,
  children,
  isLoading,
  loadingText = "Logging In...",
  handleSwitch,
  isValid,
}) {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, closeModal]);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onClick={closeModal}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <form
          onSubmit={handleSubmit}
          name={name}
          className="modal__form"
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`modal__submit ${isValid ? "modal__submit_active" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? loadingText : buttonText}
          </button>
          <p className="modal__switch">
            or{" "}
            <button
              type="button"
              className="modal__register-btn"
              onClick={handleSwitch}
            >
              {secondButtonText}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
