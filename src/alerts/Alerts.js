import Swal from "sweetalert2";

const notifyWithTitle = (title, message) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
};
const notifyError = (error) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: error,
  });
};

export { notifyWithTitle, notifyError };
