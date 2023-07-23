import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Grid, Container, createTheme } from "@mui/material";
import { motion } from "framer-motion";
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratLight,
  montserratBold,
} from "fonts";
import DaftarPsikolog from "./DaftarPsikolog";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { consultantActions } from "@/redux/slices/consultantSlice";
import JadwalKonsultasi from "./JadwalKonsultasi";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Swal from "sweetalert2";
import Pembayaran from "./Pembayaran";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
  typography: {
    fontFamily: montserrat,
  },
  button: {
    fontFamily: montserrat,
  },
});
const steps = [
  "Pilih psikolog yang diinginkan",
  "Jadwalkan konsultasi online",
  "Pembayaran",
];

export default function PemesananKonsultasi() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasBookConsultation, sethasBookConsultation] = useState(false);
  const [open, setOpen] = useState(false);
  const axios = require("axios");
  const dispatch = useDispatch();
  const consultantData = useSelector((x) => x.persistedReducer.consultant);
  const datePicked = useSelector((x) => x.persistedReducer.consultant.date);
  const timePicked = useSelector((x) => x.persistedReducer.consultant.time);
  const login = useSelector((state) => state.persistedReducer.login);

  const handlePesan = () => {
    setOpen(false);
    console.log(datePicked);
    console.log(timePicked);
    if (
      datePicked == null ||
      timePicked == null ||
      timePicked == "" ||
      datePicked == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Mohon pilih tanggal dan waktu!",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: "Konfirmasi tanggal dan waktu!",
        showDenyButton: true,
        html:
          "<b>Tanggal</b> : " +
          datePicked +
          "<br/><b>Waktu</b>  : " +
          timePicked,
        background: "white",
        icon: "warning",
        confirmButtonText: `<h3>Ya, Lanjut ke pembayaran</h3>`,
        confirmButtonColor: "#FFAACF",
        denyButtonColor: "#EA8FEA",
        denyButtonText: `<h3>Cancel</h3>`,
      }).then((result) => {
        if (result.isConfirmed) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    }
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleScheduleBtn = (event, index) => {
    console.log(event);
    dispatch(consultantActions.saveConsultant({}));
    dispatch(consultantActions.saveConsultant(event));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/api/Consultant/CheckIsBookConsultation?UserID=" +
          login.userid
      )
      .then((resp) => {
        sethasBookConsultation(resp.data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      <Container component="main" maxWidth="lg" sx={{ padding: "20px" }}>
        {isLoaded && (
          <motion.div
            style={{
              padding: "0px",
              borderRadius: 10,
              fontSize: 20,
              height: "100%",
              //   border: "10px solid",
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
            {/* Pemesanan Konsultasi Online */}
            <Typography
              sx={{
                fontSize: { xl: "30px", xs: "25px" },
                color: "black",
                textAlign: "left",
              }}
              className={montserratExtraBold.className}
            >
              Pemesanan Konsultasi Online
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  lg: "17px",
                  md: "15px",
                  sm: "15px",
                  xs: "13px",
                },
                color: "black",
                textAlign: "left",
                mb: 2,
              }}
              className={montserrat.className}
            >
              Langkah-langkah untuk memesan konsultasi online bersama psikolog
            </Typography>

            <Box sx={{ width: "100%" }}>
              <Stepper
                activeStep={activeStep}
                sx={{
                  "& .MuiStepIcon-root": {
                    "&.Mui-active ": {
                      color: "#FF8E00",
                    },
                    "&.Mui-completed": {
                      color: "#59CE8F",
                    },
                  },
                }}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>
                        <Typography
                          className={montserrat.className}
                          sx={{
                            fontSize: {
                              xs: "12px",
                              md: "15px",
                              sm: "15px",
                              xl: "15px",
                            },
                          }}
                        >
                          {label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {hasBookConsultation ? (
                <React.Fragment>
                  <Typography
                    sx={{
                      mt: "30px",
                      fontSize: { xl: "17px", md: "16px", xs: "14px" },
                      color: "black",
                      textAlign: "left",
                    }}
                    className={montserratExtraBold.className}
                  >
                    Anda sudah memiliki jadwal konsultasi.
                    <br />
                    Hanya satu bookingan konsultasi diperbolehkan secara
                    bersamaan.
                    <br />
                    Selesaikan konsultasi yang sudah terjadwalkan, lalu kembali
                    ke halaman ini lagi.
                  </Typography>
                  {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
              </Box> */}
                </React.Fragment>
              ) : activeStep === 0 ? (
                <Box>
                  <DaftarPsikolog handleScheduleBtn={handleScheduleBtn} />
                </Box>
              ) : activeStep === 1 ? (
                <Box>
                  <JadwalKonsultasi consultantData={consultantData} />
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={montserrat.className}
                      sx={{ mr: 1, textTransform: "none", color: "black" }}
                    >
                      <ArrowBackIosIcon sx={{ fontSize: "14px" }} /> Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Box sx={{ textAlign: "right", px: "20px" }}>
                      <Button
                        className={montserrat.className}
                        sx={{
                          textTransform: "none",
                          color: "black",
                          // color: "white",
                          bgcolor: "#FFAACF",
                          margin: "10px",
                          px: "15px",
                          // border: "1px solid black",
                          "&:hover": {
                            // color: "#5A5A5A",
                            // backgroundColor: "#EA8FEA",
                            backgroundColor: "rgba(255, 170, 207, 0.4)",
                          },
                          margin: "0 auto",
                        }}
                        onClick={handlePesan}
                        autoFocus
                      >
                        Pesan <ArrowForwardIosIcon sx={{ fontSize: "14px" }} />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Pembayaran consultantData={consultantData} />
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      <ArrowBackIosIcon /> Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {activeStep !== steps.length - 1 && (
                      <Button onClick={handleNext}>Next</Button>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}
