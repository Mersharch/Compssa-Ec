import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import Navbar from '../components/Navbar.jsx'
import { ToastContainer } from "react-toastify";


export const metadata = {
  title: "COMPSSA EC",
  description:
    "Online voting platform for the University of Ghana Department of Computer Science",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className= 'bg-white flex flex-col h-screen w-screen '
      >
        {/* sm:bg-blue-400 md:bg-yellow-200 lg:bg-red-400 xl:bg-green-400 */}
        <AuthProvider>
          <Navbar />
          {children}
          <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
        theme="light"
        
/>
        </AuthProvider>
      </body>
    </html>
  );
}
