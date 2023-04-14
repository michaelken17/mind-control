import * as React from "react";

import { Button, Container } from "@mui/material";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

import styles from "styles/Quiz.module.css";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});

export default function DailyHealthCheck() {
  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.2 }}
        style={{marginTop:20}}
      >
        <Container component="main" maxWidth="md" sx={{}}>
          <img
            src="/image/DailyHealthCheck.png"
            style={{
              width: "100%",
            }}
          ></img>

          <motion.div style={{ textAlign: "center", padding: 20 }}>
            <motion.button
              className={styles.buttonDaily}
              whileHover={{ scale: 1.1 }}
              style={{
                borderRadius: 10,
                padding: 20,
                marginTop: 30,
                fontSize: 20,
                border: "0px ",
              }}
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 300,
                damping: 20,
                bounce: 1,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href="/">Take Your Daily Health Check</Link>
            </motion.button>
          </motion.div>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}
