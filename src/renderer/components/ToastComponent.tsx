import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastComponent() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2200}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover={true}
      pauseOnFocusLoss={false}
    />
  );
}

export default ToastComponent;
