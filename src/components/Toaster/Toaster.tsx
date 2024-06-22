import { ToastContainer } from 'react-toastify';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => (
  <ToastContainer
    closeButton={({ closeToast }) => <div className="flex items-center pointer" onClick={closeToast}></div>}
    className="toaster-container"
  />
);

export default Toaster;
