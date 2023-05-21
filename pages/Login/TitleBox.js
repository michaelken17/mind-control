import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { montserrat, montserratItalic } from "../../public/fonts";

const TitleBox = () => {
  return (
    <Grid xs={0} sm={0} md={6} lg={3} xl={5} item={true}>
      <Box
        sx={{
          // boxShadow: `0px 0px 5px white`,
          background: "rgb(255,255,255,0.5)",
          padding: "20px",
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
          height:"65vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "0px 30px 30px 0",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <h3 className={montserrat.className} style={{ color: "#2f4858", marginBottom:"10px" }}>
            Not until we are lost do we <br /> begin to understand ourselves.
          </h3>
          <a
            className={montserratItalic.className}
            style={{ fontSize: "15px", color: "#2f4858" }}
          >
            - Henry David Thoreau
          </a>
        </Box>
      </Box>
    </Grid>
  );
};

export default TitleBox;
