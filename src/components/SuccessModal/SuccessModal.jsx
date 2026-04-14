function SuccessModal({ isOpen, closeModal, handleSwitchToLogin }) {
  return (
    <div className={`modal modal_type_success ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Registration successfully completed!</h2>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
        ></button>

        <button
          type="button"
          className="modal__register-btn"
          onClick={handleSwitchToLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
