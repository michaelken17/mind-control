import Navbar from "pages/navbar.js";
import { Box, createTheme, Typography } from "@mui/material";
import { motion } from "framer-motion";
import styles from "styles/Quiz.module.css";
import { montserratBold, montserrat, openSans } from "../public/fonts";
import { useRouter } from "next/router";
import Link from "next/link";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <Box sx={{bgcolor:"white"}} className={openSans.className}>
      { <Navbar />}
      <div
        style={{
          paddingTop: router.pathname == "/Login" || router.pathname == "/Login/SignUpPage" || router.pathname == "/Login/LoginConsultant"|| router.pathname == "/Login/SignUpConsultant"? 0 : 20,
          backgroundColor: "white",
          color: "black",
        }}
      >
        {children}
      </div>
     
    </Box>
  );
};

export default Layout;
