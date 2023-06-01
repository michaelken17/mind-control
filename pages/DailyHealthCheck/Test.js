import { Montserrat } from "next/font/google";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
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
import {
  montserrat,
  glacial,
  cooperHewitt,
  montserratExtraBold,
  montserratBold,
  montserratLight,
} from "../../public/fonts";
import { depressionSeverity } from "../ShortFormConversionTable";
import { rekomendasiDepression } from "../RekomendasiKegiatan";
import CircleIcon from "@mui/icons-material/Circle";
import ErrorIcon from "@mui/icons-material/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceAngry,
  faFaceGrinBeam,
  faFaceMeh,
  faFaceSmile,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
// import { bannerCheckboxStylesHook } from '@mui-treasury/styles/checkbox/banner';
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

const emosiArr = [
  {
    perasaan: "Buruk",
    emosi: ["Marah", "Gelisah", "Stres", "Cemas", "Takut", "Khawatir"],
  },
  {
    perasaan: "Kurang",
    emosi: ["Kecewa", "Sedih", "Lelah", "Jijik", "Bosan", "Pesimis"],
  },
  {
    perasaan: "Biasa",
    emosi: ["Bosan", "Datar", "Santai", "Puas", "Bingung"],
  },
  {
    perasaan: "Lumayan",
    emosi: [
      "Termotivasi",
      "Bahagia",
      "Gembira",
      "Bangga",
      "Optimis",
      "Bersemangat",
    ],
  },
  {
    perasaan: "Baik",
    emosi: ["Rileks", "Penuh Kasih", "Tenang", "Damai", "Bersyukur", "Puas"],
  },
];

export default function DHCTest() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [perasaan, setPerasaan] = useState(0);
  const [emosi, setEmosi] = useState("");
  const [checked, setChecked] = React.useState([0]);

  const handleChange = (event, perasaan) => {
    setPerasaan(perasaan - 1);
    console.log(perasaan);
  };
  const handleEmosi = (event, emosi) => {
    setEmosi(emosi);
  };
  const depressionSolutions = useSelector(
    (x) => x.persistedReducer.app.depressionSolutions
  );
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  useEffect(() => {
    setIsLoaded(true);
    console.log(emosiArr.map((x) => x.emosi));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{}}>
        {isLoaded && (
          <Box
            sx={{
              padding: "10px",
              fontSize: "20px",
            }}
          >
            <Typography
              className={cooperHewitt.className}
              sx={{
                textAlign: "center",
                color: "#393939",
                fontSize: {
                  lg: "50px",
                  md: "40px",
                  sm: "30px",
                  xs: "30px",
                },
              }}
            >
              PEMERIKSAAN KESEHATAN MENTAL HARIAN
            </Typography>

            {/* Mood Checker */}
            <Typography
              sx={{ fontSize: { xs: "15px", xl: "19px" }, mt: "20px" }}
              className={montserratExtraBold.className}
            >
              Bagaimana perasaan Anda hari ini?
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "13px", xl: "15px" } }}
              className={montserratLight.className}
            >
              Dalam skala 1 sampai 5, bagaimana perasaan saat ini?
            </Typography>

            {/* Mood picker */}
            <Grid container spacing={1} columns={16}>
              <Grid item lg={8} md={8} sm={8}>
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
                  }}
                  className={montserrat.className}
                >
                  <ToggleButtonGroup
                    onChange={handleChange}
                    value={(perasaan + 1).toString()}
                    exclusive
                    sx={{}}
                  >
                    <ToggleButton
                      className={montserrat.className}
                      value="1"
                      sx={{
                        textTransform: "none",
                        color: "black",
                        px: "30px",
                      }}
                    >
                      <Grid>
                        <FontAwesomeIcon
                          icon={faFaceAngry}
                          style={{ fontSize: "40px", color: "#EB5353" }}
                        />
                        <Typography>Buruk</Typography>
                      </Grid>
                    </ToggleButton>

                    <ToggleButton
                      className={montserrat.className}
                      sx={{
                        textTransform: "none",
                        color: "black",
                        px: "30px",
                      }}
                      value="2"
                    >
                      <Grid>
                        <FontAwesomeIcon
                          icon={faFaceFrown}
                          style={{ fontSize: "40px", color: "#ffa700" }}
                        />
                        <Typography>Kurang</Typography>
                      </Grid>
                    </ToggleButton>

                    <ToggleButton
                      className={montserrat.className}
                      sx={{
                        textTransform: "none",
                        color: "black",
                        px: "30px",
                      }}
                      value="3"
                    >
                      <Grid>
                        <FontAwesomeIcon
                          icon={faFaceMeh}
                          style={{ fontSize: "40px", color: "#fff400" }}
                        />
                        <Typography>Biasa</Typography>
                      </Grid>
                    </ToggleButton>

                    <ToggleButton
                      className={montserrat.className}
                      sx={{
                        textTransform: "none",
                        color: "black",
                        px: "20px",
                      }}
                      value="4"
                    >
                      <Grid>
                        <FontAwesomeIcon
                          icon={faFaceSmile}
                          style={{ fontSize: "40px", color: "#b0cdff" }}
                        />
                        <Typography>Lumayan</Typography>
                      </Grid>
                    </ToggleButton>

                    <ToggleButton
                      className={montserrat.className}
                      sx={{
                        textTransform: "none",
                        color: "black",
                        px: "30px",
                      }}
                      value="5"
                    >
                      <Grid>
                        <FontAwesomeIcon
                          icon={faFaceGrinBeam}
                          style={{ fontSize: "40px", color: "#59CE8F" }}
                        />
                        <Typography>Baik</Typography>
                      </Grid>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Typography>
              </Grid>
            </Grid>

            {/* Emosi Picker */}
            <Typography
              sx={{
                mt: "30px",
                mb: "10px",
                fontSize: { xs: "15px", xl: "19px" },
              }}
              className={montserratExtraBold.className}
            >
              Apa emosi yang anda rasakan?
            </Typography>

            <Box>
              <ToggleButtonGroup
                size="medium"
                value={emosi}
                exclusive
                onChange={handleEmosi}
              >
                {emosiArr[perasaan].emosi.map((value, index) => {
                  return (
                    <ToggleButton
                      sx={{
                        textTransform: "none",
                        px: { xs: "6px", xl: "17px" },
                        fontSize: { xs: "13px", xl: "14px" },
                      }}
                      value={value}
                      className={montserratBold.className}
                    >
                      {value}
                    </ToggleButton>
                  );
                })}
              </ToggleButtonGroup>
            </Box>

            {/* Jurnal */}
            <Typography
              sx={{
                fontSize: { xs: "15px", xl: "19px" },
                mt: "20px",
                mb: "10px",
              }}
              className={montserratExtraBold.className}
            >
              Apakah anda ingin bercerita?
            </Typography>

            <Grid>
              <Grid item>
                <TextField
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    color: "purple",
                    width: { xs: "100%", xl: "50%", sm: "80%", md: "70%" },
                  }}
                  label={
                    <Typography
                      sx={{ fontSize: { xs: "13px", xl: "15px" } }}
                      className={montserratLight.className}
                    >
                      Tulislah di sini...
                    </Typography>
                  }
                  multiline
                  rows={10}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <Typography
                  sx={{ fontSize: { xs: "15px", xl: "19px" }, mt: "20px" }}
                  className={montserratExtraBold.className}
                >
                  Dari beberapa kegiatan dibawah ini, manakah yang sudah di
                  lakukan?
                </Typography>
                <Typography
                  sx={{ fontSize: { xs: "13px", xl: "15px" } }}
                  className={montserratLight.className}
                >
                  Dalam skala 1 sampai 5, bagaimana perasaan saat ini?
                </Typography>
                <List
                  sx={{
                    width: { xs: "100%", xl: "50%", sm: "80%", md: "70%" },
                    // maxWidth: 360,
                  }}
                >
                  {depressionSolutions.map((value) => {
                    return (
                      <ListItem
                        sx={{
                          width: "100%",
                        }}
                        key={value.solution}
                        // secondaryAction={

                        // }
                        disablePadding
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(value)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              sx={{
                                "&.Mui-checked": {
                                  color: "#FFAACF",
                                },
                              }}
                              checked={checked.indexOf(value) !== -1}
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary={value.solution} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              <Grid item>
                {/* Button submit */}
                <Button
                  sx={{
                    borderRadius: "10px",
                    padding: "10px",
                    paddingLeft: "30px",
                    textTransform: "none",
                    paddingRight: "30px",
                    marginTop: "20px",
                    color: "white",
                    fontSize: "17px",
                    backgroundColor: "#FFAACF",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "#EA8FEA",
                    },
                  }}
                  className={montserrat.className}
                >
                  <Link legacyBehavior href="/">
                    Submit
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}
