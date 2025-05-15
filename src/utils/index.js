const showPublicKeyInvalidMessage = ({ vapiError }) => {
  return (
    !!vapiError &&
    vapiError.error.statusCode === 403 &&
    vapiError.error.error === "Forbidden"
  );
};

export default showPublicKeyInvalidMessage;
