import { Montserrat } from "next/font/google";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Typography,
  circularProgressClasses,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import styles from "styles/Quiz.module.css";
import Link from "next/link";
import { container, item } from "/animation";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {montserrat, glacial, cooperHewitt} from "../../fonts";

const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
  link: {
    fontFamily: montserrat,
  },
});

function borderClassname(severity) {
  switch (severity) {
    case "Tidak ada atau sedikit":
      return styles.resultNone;
    case "Ringan":
      return styles.resultMild;
    case "Sedang":
      return styles.resultModerate;
    case "Berat":
      return styles.resultSevere;
  }
}

const tingkatKeparahanData = [
  {
    severity: "Tidak ada atau sedikit",
    header: "Anda baik-baik saja!",
    text:
      "Berdasarkan hasil screening, saat ini Anda tidak memiliki (atau sangat sedikit) tanda-tanda kecemasan. " +
      "Jaga terus kesehatan mental anda. Untuk mempertahankan kondisi tersebut, ada beberapa hal yang dapat dilakukan:",
    rekomendasiKegiatan: [
      "Sarapan tiap hari",
      "Jangan tidur malem",
      "Banyak makan buah-buahan",
    ],
  },
  {
    severity: "Ringan",
    header: "Anda harus waspada!",
    text:
      "Berdasarkan hasil screening, saat ini Anda mungkin mengalami beberapa tanda kecemasan ringan. " +
      "Jaga terus kesehatan mental anda. Untuk membantu meningkatkan kesehatan mental anda, ada beberapa hal yang dapat dilakukan:",
    rekomendasiKegiatan: [
      "Sarapan tiap hari",
      "Jangan tidur malem",
      "Banyak makan buah-buahan",
    ],
  },
  {
    severity: "Sedang",
    header: "Anda membutuhkan sedikit bantuan!",
    text:
      "Berdasarkan hasil screening, saat ini Anda mungkin mengalami beberapa tanda kecemasan sedang. " +
      "Anda mungkin membutuhkan sedikit bantuan untuk melewati situasi ini. Untuk membantu meningkatkan kesehatan mental anda, ada beberapa hal yang dapat dilakukan:",
    rekomendasiKegiatan: [
      "Sarapan tiap hari",
      "Jangan tidur malem",
      "Banyak makan buah-buahan",
    ],
  },
  {
    severity: "Berat",
    header: "Anda membutuhkan bantuan!",
    text:
      "Berdasarkan hasil screening, saat ini Anda mungkin mengalami beberapa tanda kecemasan yang parah. " +
      "Anda membutuhkan sedikit bantuan untuk melewati situasi ini. Untuk membantu meningkatkan kesehatan mental anda, ada beberapa hal yang dapat dilakukan:",
    rekomendasiKegiatan: [
      "Sarapan tiap hari",
      "Jangan tidur malem",
      "Banyak makan buah-buahan",
    ],
  },
];

export default function Result() {
  const router = useRouter();
  const anxietyQuestions = useSelector(
    (x) => x.persistedReducer.app.anxietyQuestions
  );
  const anxietyAnswer = useSelector(
    (x) => x.persistedReducer.app.anxietyAnswer
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const [x, setX] = useState(3);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{}}>
        {isLoaded && (
          <motion.div
            className={borderClassname(tingkatKeparahanData[x].severity)}
            style={{
              padding: 20,
              borderRadius: 10,
              fontSize: 20,
              height: "100%",
              border: "0px ",
              textAlign: "center",
              justifyItems: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0,
            }}
            exit={{ opacity: 0 }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: 10,
                // overflow: "auto",
              }}
            >
              <div style={{ overflow: "auto" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "black",
                    textAlign: "left",
                  }}
                  className={montserrat.className}
                >
                  <h2>{tingkatKeparahanData[x].header}</h2>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    textAlign: "left",
                    mb: 2,
                  }}
                  className={montserrat.className}
                >
                  Hasil tes menunjukkan tingkat keparahan Anxietas anda adalah{" "}
                  <b>{tingkatKeparahanData[x].severity}</b>.
                </Typography>

                <div
                  width="100%"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      backgroundColor: "",
                      verticalAlign: "top",
                      display: "inline-block",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={
                        tingkatKeparahanData[x].severity == "Tidak ada atau sedikit" 
                          ? "/image/Mental Illness Illustration/happy.jpg"
                          : "/image/Mental Illness Illustration/confused.jpg"
                      }
                      width="70%"
                      style={{ borderRadius: 10 }}
                    />

                    <a
                      href="https://www.freepik.com/author/stories"
                      style={{
                        fontSize: "10px",
                        textAlign: "center",
                        display: "block",
                        paddingBottom: "10px",
                      }}
                    >
                      Image by storyset on Freepik
                    </a>
                  </div>
                </div>

                <Typography
                  sx={{
                    fontSize: "16px",
                    color: "gray",
                    textAlign: "justify",
                  }}
                  className={montserrat.className}
                >
                  {tingkatKeparahanData[x].text}
                </Typography>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}
