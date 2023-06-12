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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratLight,
  montserratBold,
} from "../../public/fonts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

// Pembayaran
export default function Pembayaran(val) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const [consultantData, setconsultantData] = useState([]);
  const [hasFreeConsultation, sethasFreeConsultation] = useState(false);
  const axios = require("axios");
  const datePicked = useSelector((x) => x.persistedReducer.consultant.date);
  const timePicked = useSelector((x) => x.persistedReducer.consultant.time);
  const dateTime = useSelector((x) => x.persistedReducer.consultant.datetime);
  const [value, setValue] = useState("E-Money");
  const [tipePembayaran, settipePembayaran] = useState("GoPay");
  const consultant = useSelector((x) => x.persistedReducer.consultant);
  const login = useSelector((state) => state.persistedReducer.login);

  useEffect(() => {
    setIsLoaded(true);

    axios
      .get(
        "https://localhost:7184/api/Users/GetData?Username=" + login.username
      )
      .then((resp) => {
        console.log(resp.data);
        if (resp.data[0].freeConsultation > 0) {
          sethasFreeConsultation(true);
        }
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue == "E-Money") settipePembayaran("GoPay");
    else settipePembayaran(newValue);
    console.log("change");
  };

  const handleFinish = (event) => {
    Swal.fire({
      title: "Konfirmasi Pembayaran!",
      icon: "warning",
      showDenyButton: true,
      html:
        "<b>Total pembayaran</b> : " +
        "Rp." +
        val.consultantData.harga.toLocaleString("id") +
        ",00" +
        "<br/><b>Tipe Pembayaran</b>  : " +
        tipePembayaran,
      background: "white",
      confirmButtonText: `<h3>Konfirmasi</h3>`,
      confirmButtonColor: "#FFAACF",
      denyButtonColor: "#EA8FEA",
      denyButtonText: `<h3>Cancel</h3>`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(login);
        console.log(consultant);
        console.log(datePicked);
        console.log(timePicked);
        console.log(dateTime);
        console.log(tipePembayaran)

        if (tipePembayaran == "Konsultasi Gratis") {
          axios
            .put(
              "https://localhost:7184/api/Consultant/UpdateFreeConsultation?UserID=" +
                login.userid +
                "&opr=reset"
            )
            .then((resp) => {
              console.log("KONSULTASI GRATIS");
            });
        }

        axios
          .post("https://localhost:7184/api/Consultant/InsertListPatientData", {
            consultantID: consultant.consultantID,
            userID: login.userid,
            tipePembayaran: tipePembayaran,
            harga: val.consultantData.harga,
            tanggalPertemuan: dateTime,
          })
          .then((resp) => {
            console.log(resp);
          });

        Swal.fire({
          icon: "success",
          title: "Pembayaran berhasil!",
          text: "Kunjungi Transaction History untuk melihat detail transaksi!",
          //   timer: 2000,
          //   timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonText: `<h3>OK</h3>`,
          confirmButtonColor: "#FFAACF",
        }).then(() => {
          router.push("/KonsultasiOnline/ListKonsultasi");
        });
      }
    });
  };

  const handleTipePembayaran = (event) => {
    settipePembayaran(event.target.value);
    console.log(event.target.value);
  };

  // useEffect(() => {
  //   console.log(consultantData);
  // }, [consultantData]);

  useEffect(() => {
    if (hasFreeConsultation == true) {
      setValue("Konsultasi Gratis");
      settipePembayaran("Konsultasi Gratis")
    }
  }, [hasFreeConsultation]);

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
                  Ringkasan Pembayaran
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
                key={val.consultantData.consultantID}
              >
                <Card
                  sx={{
                    width: "70%",
                    textAlign: "left",
                    borderRadius: "10px",
                  }}
                >
                  <CardHeader
                    sx={{ padding: "20px" }}
                    avatar={
                      <Avatar sx={{ bgcolor: "#FFAACF" }}>
                        <Typography
                          className={montserratExtraBold.className}
                          sx={{ fontSize: "20px" }}
                        >
                          {val.consultantData.fullName.charAt(0)}
                        </Typography>
                      </Avatar>
                    }
                    title={
                      <Typography className={montserratExtraBold.className}>
                        {val.consultantData.fullName},{" "}
                        {val.consultantData.gelar}
                      </Typography>
                    }
                    subheader={
                      <Box>
                        <Typography
                          className={montserratBold.className}
                          sx={{ fontSize: "14px" }}
                        >
                          {val.consultantData.spesialisasi}
                        </Typography>
                        <Typography
                          className={montserratBold.className}
                          sx={{ fontSize: "14px", mt: "5px" }}
                        >
                          <Grid container>
                            <Grid>
                              <CalendarMonthIcon />
                            </Grid>
                            <Grid sx={{ mt: "2px", ml: "5px" }}>
                              {datePicked}, {timePicked}
                            </Grid>
                          </Grid>
                        </Typography>
                      </Box>
                    }
                  />
                  <Divider />
                  <CardContent sx={{ pt: "10px", pb: "0px" }}>
                    <Box sx={{ display: "flex" }}>
                      <Typography
                        sx={{
                          fontSize: { xl: "16px", md: "16px", xs: "15px" },
                          color: "black",
                          textAlign: "left",
                        }}
                        className={montserrat.className}
                      >
                        Biaya sesi 1 jam:
                      </Typography>{" "}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Typography
                        className={montserrat.className}
                        sx={{ fontSize: "16px", ml: "10px" }}
                      >
                        Rp. {val.consultantData.harga.toLocaleString("id")},00
                      </Typography>
                    </Box>{" "}
                    <Box sx={{ display: "flex", mt: "10px" }}>
                      <Typography
                        sx={{
                          fontSize: { xl: "16px", md: "16px", xs: "15px" },
                          color: "black",
                          textAlign: "left",
                        }}
                        className={montserratExtraBold.className}
                      >
                        Total pembayaran:
                      </Typography>{" "}
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Typography
                        className={montserratExtraBold.className}
                        sx={{ fontSize: "16px", ml: "10px" }}
                      >
                        Rp. {val.consultantData.harga.toLocaleString("id")},00
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xl: "16px", md: "16px", xs: "15px" },
                        color: "black",
                        textAlign: "left",
                        mt: "50px",
                      }}
                      className={montserrat.className}
                    >
                      Pilih tipe pembayaran:
                    </Typography>
                    <Box sx={{ width: "100%", mt: "10px" }}>
                      <TabContext value={value} scrollButtons="auto">
                        <Box
                          sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                          }}
                        >
                          <TabList
                            TabIndicatorProps={{
                              sx: {
                                backgroundColor: "black",
                              },
                            }}
                            onChange={handleChange}
                            variant="scrollable"
                            allowScrollButtonsMobile={true}
                          >
                            {hasFreeConsultation && (
                              <Tab
                                label="Konsultasi Gratis"
                                value="Konsultasi Gratis"
                                className={montserrat.className}
                                sx={{
                                  textTransform: "none",
                                  "&.Mui-selected": {
                                    color: "black",
                                  },
                                }}
                              />
                            )}
                            <Tab
                              label="E-Money"
                              value="E-Money"
                              className={montserrat.className}
                              sx={{
                                textTransform: "none",
                                "&.Mui-selected": {
                                  color: "black",
                                },
                              }}
                            />
                            <Tab
                              label="Kartu Debit/Kredit"
                              value="Kartu Debit/Kredit"
                              className={montserrat.className}
                              sx={{
                                textTransform: "none",
                                "&.Mui-selected": {
                                  color: "black",
                                },
                              }}
                            />
                          </TabList>
                        </Box>
                        <TabPanel value={"E-Money"}>
                          <Box>
                            <FormControl>
                              <RadioGroup
                                defaultValue="GoPay"
                                name="radio-buttons-group"
                                onChange={handleTipePembayaran}
                              >
                                <FormControlLabel
                                  value="GoPay"
                                  control={<Radio />}
                                  label="GoPay"
                                />
                                <FormControlLabel
                                  value="DANA"
                                  control={<Radio />}
                                  label="DANA"
                                />
                                <FormControlLabel
                                  value="OVO"
                                  control={<Radio />}
                                  label="OVO"
                                />
                              </RadioGroup>
                            </FormControl>
                          </Box>
                        </TabPanel>
                        <TabPanel value={"Kartu Debit/Kredit"}>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: {
                                  lg: "17px",
                                  md: "15px",
                                  sm: "15px",
                                  xs: "13px",
                                },
                                color: "black",
                                textAlign: "center",
                              }}
                              className={montserrat.className}
                            >
                              Kartu Debit/Kredit
                            </Typography>
                          </Box>
                        </TabPanel>
                        {hasFreeConsultation && (
                          <TabPanel value={"Konsultasi Gratis"}>
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: {
                                    lg: "17px",
                                    md: "15px",
                                    sm: "15px",
                                    xs: "13px",
                                  },
                                  color: "black",
                                  textAlign: "center",
                                }}
                                className={montserrat.className}
                              >
                                Konsultasi Gratis
                              </Typography>
                            </Box>
                          </TabPanel>
                        )}
                      </TabContext>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      pl: "16px",
                      pt: "0px",
                    }}
                  >
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      sx={{
                        float: "right",
                        textTransform: "none",
                        color: "black",
                      }}
                      className={montserrat.className}
                      onClick={handleFinish}
                    >
                      Finish
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}
