import "./ModalWithForm.css";

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
  isValid,
  loadingText = "Logging In...",
  handleSwitch,
}) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={handleSubmit} name={name} className="modal__form">
          {children}
          <button
            type="submit"
            className={`modal__submit modal__submit_${name}`}
            disabled={isLoading || !isValid}
          >
            {isLoading ? loadingText : buttonText}
          </button>
          {secondButtonText && (
            <button
              type="button"
              className="modal__register-btn"
              onClick={handleSwitch}
            >
              {secondButtonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
