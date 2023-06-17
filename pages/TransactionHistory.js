import { Montserrat } from "next/font/google";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Typography,
  circularProgressClasses,
  useMediaQuery,
  useTheme,
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
import { forwardRef, useEffect, useState } from "react";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratLight,
  montserratBold,
} from "/public/fonts";
import HistoryIcon from "@mui/icons-material/History";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";
import InfoIcon from "@mui/icons-material/Info";
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

// Transaction History
export default function TransactionHistory() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const login = useSelector((state) => state.persistedReducer.login);
  const theme = useTheme();
  const [transactionHistory, settransactionHistory] = useState([]);
  const [hasHistory, sethasHistory] = useState(false);
  const axios = require("axios");
  const [consultantData, setconsultantData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://localhost:7184/api/Users/GetTransactionHistory?userId=" +
          login.userid
      )
      .then((resp) => {
        setIsLoaded(true);
        console.log(resp.data);
        settransactionHistory(resp.data);
      });
  }, []);

  useEffect(() => {
    if (transactionHistory.length != 0) {
      sethasHistory(true);
    }
    console.log(transactionHistory);
  }, [transactionHistory]);

  const infoButtonHandler = (val) => {
    console.log(val);
    axios
      .get("https://localhost:7184/api/Consultant/GetAllConsultantData")
      .then((resp) => {
        axios
          .get(
            "https://localhost:7184/api/Consultant/GetConsultantData?username=" +
              resp.data
                .filter((x) => x.consultantID === val.consultantID)
                .map((x) => x.username)
          )
          .then((resp) => {
            console.log(resp.data[0]);
            Swal.fire({
              icon: "info",
              html:
                "<ul style='text-align: left'><li> <b>Nama Konsultan: </b>" +
                resp.data[0].fullName +
                " " +
                resp.data[0].gelar +
                "</li>" +
                "<li><b> Spesialisasi: </b>" +
                resp.data[0].spesialisasi +
                "</li>" +
                "<li><b> Pengalaman: </b>" +
                resp.data[0].pengalaman +
                "</li>" +
                "<li> <b>Pendidikan: </b>" +
                resp.data[0].pendidikan +
                "</li>" +
                //   "<li> Tempat prakte: " + resp.data[0].pendidikan +"</li>" +

                "</ul>",
              showDenyButton: false,
              showConfirmButton: false,
              //   confirmButtonText:""
            });
          });
        console.log();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{}}>
        {isLoaded && (
          <motion.div
            style={{
              // padding: "10px",
              borderRadius: 10,
              fontSize: 20,
              height: "100%",
              marginTop: "15px",
              //  border: "1px solid",
              textAlign: "center",
              justifyItems: "center",
              color: "black",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0,
            }}
            exit={{ opacity: 0 }}
          >
            <Box
              sx={{
                background: "white",
                padding: "20px",
                borderRadius: 10,
                // overflow: "auto",
              }}
            >
              {/* Rekomendasi Psikolog */}
              <Box>
                <Typography
                  sx={{
                    fontSize: { xl: "19px", md: "19px", xs: "17px" },
                    color: "black",
                    textAlign: "left",
                  }}
                  className={montserratExtraBold.className}
                >
                  Transaction History
                </Typography>
              </Box>
              {hasHistory == true ? (
                <Box>
                  {transactionHistory.map((val, index) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "left",
                          marginTop: "30px",
                        }}
                        key={val.listPatientID}
                      >
                        <Card
                          sx={{
                            width: { xl: "70%", xs: "100%", md: "80%" },
                            textAlign: "left",
                            borderRadius: "10px",
                          }}
                          raised
                        >
                          <CardContent sx={{ pt: "10px", pb: "0px" }}>
                            <Box sx={{ float: "right", display: "flex" }}>
                              <HistoryIcon
                                sx={{ fontSize: "17px", mt: "1px" }}
                              />
                              <Typography
                                className={montserratBold.className}
                                sx={{ fontSize: "14px", pl: "5px" }}
                              >
                                {dayjs(val.creationDate).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </Typography>
                            </Box>

                            <Typography
                              className={montserratBold.className}
                              sx={{ fontSize: "16px", mb: "5px" }}
                            >
                              Jadwal Pertemuan:{" "}
                              {dayjs(val.tanggalPertemuan).format(
                                "dddd, DD MMM YYYY HH:mm"
                              )}
                            </Typography>
                            <Typography
                              className={montserratBold.className}
                              sx={{ fontSize: "16px", mb: "5px" }}
                            >
                              Tipe Pembayaran: {val.tipePembayaran}
                            </Typography>
                          </CardContent>
                          <CardActions
                            sx={{
                              justifyContent: "space-between",
                              pl: "16px",
                              pt: "0px",
                            }}
                          >
                            <Typography
                              className={montserratExtraBold.className}
                              sx={{ fontSize: "16px" }}
                            >
                              Rp. {val.harga.toLocaleString("id")},00
                            </Typography>

                            <IconButton onClick={() => infoButtonHandler(val)}>
                              <InfoIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <Typography
                  sx={{
                    fontSize: {
                      lg: "20px",
                      md: "17px",
                      sm: "17px",
                      xs: "14px",
                    },
                    color: "black",
                    textAlign: "left",
                    mt: 5,
                  }}
                  className={montserrat.className}
                >
                  Anda tidak memiliki transaksi.
                </Typography>
              )}
            </Box>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}
