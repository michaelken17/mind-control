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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
const tomorrow = dayjs().add(1, "day");
const maxDate = dayjs().add(5, "day");

var timeAvailable = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "19:00",
  "20:00",
];

// Daftar Psikolog
export default function DaftarPsikolog() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  //   const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [datePicked, setdatePicked] = useState(dayjs());
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    console.log(datePicked.format("dddd, DD MMMM"));
  }, [datePicked]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{}}>
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
            <Box
              sx={{
                background: "white",
                padding: "20px",
                borderRadius: 10,
                // overflow: "auto",
              }}
            >
              {/* Rekomendasi Psikolog */}
              <Typography
                sx={{
                  fontSize: { xl: "30px", xs: "25px" },
                  color: "black",
                  textAlign: "left",
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
                  textAlign: "left",
                  mb: 2,
                }}
                className={montserrat.className}
              >
                Berikut adalah daftar psikolog yang tersedia.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "left",
                  marginTop: "30px",
                }}
              >
                <Card
                  sx={{
                    width: { xl: "60%", xs: "100%" },
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
                          J
                        </Typography>
                      </Avatar>
                    }
                    action={
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ marginRight: "5px" }}>5.0</Typography>
                        <FavoriteIcon sx={{ color: "#FFAACF" }} />
                      </Box>
                    }
                    title={
                      <Typography className={montserratExtraBold.className}>
                        Jennie Kim, M.Psi, Psikolog
                      </Typography>
                    }
                    subheader={
                      <Typography
                        className={montserratLight.className}
                        sx={{ fontSize: "14px" }}
                      >
                        Psikolog Klinis
                      </Typography>
                    }
                  />
                  <Divider />
                  <CardContent sx={{ pt: "10px", pb: "0px" }}>
                    <Typography
                      className={montserratBold.className}
                      sx={{ fontSize: "16px", mb: "5px" }}
                    >
                      Gangguan Mood, Depresi, Trauma
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        mb: "5px",
                        bgcolor: "rgba(0,0,0,0.5)",
                        p: "5px",
                        width: "100px",
                        borderRadius: "5px",
                      }}
                    >
                      <WorkHistoryIcon
                        sx={{
                          marginRight: "10px",
                          fontSize: "22px",
                          color: "white",
                        }}
                      />
                      <Typography
                        className={montserratBold.className}
                        sx={{
                          marginTop: "1px",
                          fontSize: "14px",
                          color: "white",
                        }}
                      >
                        5 Tahun
                      </Typography>
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
                      Rp. 50.000,00
                    </Typography>
                    <Link href="JadwalKonsultasi" legacyBehavior>
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
                        onClick={handleClickOpen}
                      >
                        <Typography
                          className={montserratBold.className}
                          sx={{ fontSize: "14px", px: "10px" }}
                        >
                          Jadwalkan
                        </Typography>
                      </Button>
                    </Link>
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
