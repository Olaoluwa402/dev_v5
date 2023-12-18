<<<<<<< HEAD
import HomePage from "./pages/home/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <HomePage />
=======
function App() {
  return (
    <div className="App">
      <h1>Expense Tracker APP</h1>
>>>>>>> 77f137e793df3172aed914fd1f6e71ccc258f100
    </div>
  );
}

export default App;
