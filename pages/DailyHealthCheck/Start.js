import * as React from "react";

import { Button, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {glacial, montserrat} from "../../public/fonts"
import styles from "styles/Quiz.module.css";
import Link from "next/link";

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
        style={{ marginTop: 20 }}
      >
        <Container component="main" maxWidth="md" sx={{}}>
          <img
            src="/image/DailyHealthCheck.png"
            style={{
              width: "100%",
            }}
          ></img>
          <div style={{ marginTop: "15px" }}>
            <Typography
              sx={{ fontSize: "22px", color: "black", textAlign: "center" }}
              className={glacial.className}
            >
              Daily Health Check membantu mengamati kesehatan mental Anda setiap harinya dan memberikan rekomendasi 
              berbagai macam aktivitas yang dapat meningkatkannya
            </Typography>
          </div>
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
