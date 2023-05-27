import * as React from "react";

import {
  Badge,
  Button,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { glacial, montserrat } from "../../public/fonts";
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
              width: "90%",
            }}
          ></img>
          <div style={{ marginTop: "15px" }}>
            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px", lg: "17px" },
                color: "black",
                textAlign: "center",
              }}
              className={montserrat.className}
            >
              Menjaga kesehatan mental Anda hanya dapat tercapai jika Anda
              benar-benar menginginkannya dan mau mengusahakannya.{" "}
              <b>Semuanya dimulai dari inisiatif diri sendiri</b>
            </Typography>
            <List
              sx={{
                marginTop: "20px",
                fontSize: { xs: "16px", md: "18px", lg: "17px" },
                color: "black",
                textAlign: "justify",
                padding: { xs: "16px", md: "0px", lg: "0px" },
              }}
              className={montserrat.className}
            >
              <ListItem sx={{ marginTop: "10px" }}>
                <ListItemText
                  primary="Daily Health Check sebaiknya dilakukan tiap hari selama minimal
                    3 minggu untuk memonitor kesehatan mental diri sendiri. Dengan
                    begitu, kebiasaan positif dapat terbentuk"
                />
              </ListItem>
              <ListItem sx={{ marginTop: "10px" }}>
                <ListItemText
                  primary="Kuesioner berisi pertanyaan mengenai bagaimana hari anda dan
                    perasaan anda selama seharian ini"
                />
              </ListItem>
              <ListItem sx={{ marginTop: "10px" }}>
                <ListItemText
                  primary="Isilah kuesioner di akhir hari (cth: saat sebelum tidur) untuk
                    merefleksikan mengenai hari yang telah anda jalani"
                />
              </ListItem>
            </List>
          </div>
          <motion.div style={{ textAlign: "center", padding: 20 }}>
            <motion.button
              className={styles.buttonDaily}
              whileHover={{ scale: 1.1 }}
              style={{
                borderRadius: 10,
                padding: 20,
                marginTop: 30,
                marginLeft: "20px",
                marginRight: "20px",
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
              <Link href="RekomendasiKegiatan">
                Lihat Rekomendasi Kegiatan Hari Ini
              </Link>
            </motion.button>

            <Badge
              badgeContent={"!"}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "20px",
                  height: "25px",
                  width: "25px",
                  backgroundColor: "#FFA842",
                  marginRight: { xs: "20px" },
                },
              }}
            >
              <button
                style={{
                  borderRadius: 10,
                  padding: 20,
                  marginLeft: "20px",
                  marginRight: "20px",
                  fontSize: 20,
                  border: "0px ",
                  backgroundColor: "#FF4E9B",
                }}
              >
                <Link href="Test">Lakukan Daily Health Check Hari ini!</Link>
              </button>
            </Badge>
          </motion.div>
        </Container>
      </motion.div>
    </ThemeProvider>
  );
}
