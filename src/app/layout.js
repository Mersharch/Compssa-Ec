import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import Navbar from '../components/Navbar.jsx'
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "COMPSSA EC",
  description:
    "Online voting platform for the University of Ghana Department of Computer Science",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
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
        theme="dark"
        
/>
        </AuthProvider>
      </body>
    </html>
  );
}
