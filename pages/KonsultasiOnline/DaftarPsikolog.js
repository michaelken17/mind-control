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
} from "../../public/fonts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Slide from "@mui/material/Slide";
import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

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

// Daftar Psikolog
export default function DaftarPsikolog({ handleScheduleBtn }) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = useTheme();
  const [datePicked, setdatePicked] = useState(dayjs());
  const [consultantData, setconsultantData] = useState([]);
  const axios = require("axios");

  useEffect(() => {
    axios
      .get("https://localhost:7184/api/Consultant/GetAllConsultantData")
      .then((resp) => {
        setconsultantData(resp.data);
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    console.log(consultantData);
  }, [consultantData]);

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
                    textAlign: "center",
                  }}
                  className={montserratExtraBold.className}
                >
                  Rekomendasi Psikolog
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
                    textAlign: "center",
                    mb: 2,
                  }}
                  className={montserrat.className}
                >
                  Berikut adalah daftar psikolog yang tersedia.
                </Typography>
              </Box>

              {consultantData.map((val) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      marginTop: "30px",
                    }}
                    key={val.consultantID}
                  >
                    <Card
                      sx={{
                        width: { xl: "70%", xs: "100%", md: "80%" },
                        textAlign: "left",
                        borderRadius: "10px",
                      }}
                      raised
                    >
                      <CardHeader
                        sx={{ padding: "20px" }}
                        avatar={
                          <Avatar sx={{ bgcolor: "#FFAACF" }}>
                            <Typography
                              className={montserratExtraBold.className}
                              sx={{ fontSize: "20px" }}
                            >
                              {val.fullName.charAt(0)}
                            </Typography>
                          </Avatar>
                        }
                        action={
                          <Box sx={{ display: "flex" }}>
                            {/* <Typography
                              sx={{ marginRight: "5px" }}
                              className={montserratBold.className}
                            >
                              {val.rating.toFixed(1)}
                            </Typography>
                            <FavoriteIcon sx={{ color: "#FFAACF" }} /> */}
                          </Box>
                        }
                        title={
                          <Typography className={montserratExtraBold.className}>
                            {val.fullName}, {val.gelar}
                          </Typography>
                        }
                        subheader={
                          <Typography
                            className={montserratLight.className}
                            sx={{ fontSize: "14px" }}
                          >
                            {val.pendidikan}
                          </Typography>
                        }
                      />
                      <Divider />
                      <CardContent sx={{ pt: "10px", pb: "0px" }}>
                        <Typography
                          className={montserratBold.className}
                          sx={{ fontSize: "16px", mb: "5px" }}
                        >
                          {val.spesialisasi}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            paddingLeft: "5px",
                            // bgcolor: "rgba(0,0,0,0.5)",
                            width: "130px",
                            borderRadius: "5px",
                            justifyContent: "center",
                          }}
                        >
                          <Grid container columns={8} sx={{ padding: 0 }}>
                            <Grid item xl={1} sx={{ pt: "5px" }}>
                              <WorkHistoryIcon
                                sx={{
                                  fontSize: "22px",
                                  color: "black",
                                }}
                              />
                            </Grid>

                            <Grid item xl={6} sx={{ paddingLeft: "5px" }}>
                              <Typography
                                className={montserratBold.className}
                                sx={{
                                  pt: "6px",
                                  fontSize: "14px",
                                  color: "black",
                                  textAlign: "center",
                                }}
                              >
                                {val.pengalaman}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
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
                        {/* <Link legacyBehavior href="JadwalKonsultasi"> */}
                        <Button
                          sx={{
                            textTransform: "none",
                            color: "white",
                            backgroundColor: "#FFAACF",
                            "&:hover": {
                              color: "white",
                              backgroundColor: "#EA8FEA",
                            },
                          }}
                          onClick={(event) => handleScheduleBtn(val)}
                        >
                          <Typography
                            className={montserratBold.className}
                            sx={{ fontSize: "14px", px: "10px" }}
                          >
                            Jadwalkan
                          </Typography>
                        </Button>
                        {/* </Link> */}
                      </CardActions>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}
