import Navbar from "pages/navbar.js";
import { Box, createTheme, Typography } from "@mui/material";
import { motion } from "framer-motion";
import styles from "styles/Quiz.module.css";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/router";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <Box style={{ width: "" }} className={montserrat.className}>
      { <Navbar />}
      <div
        style={{
          paddingTop: router.pathname == "/login" || router.pathname == "/SignUpPage" ? 0 : 150,
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
