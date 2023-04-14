import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { montserrat, montserratItalic } from "../fonts";

const TitleBox = () => {
  return (
    <Grid xs={0} sm={0} md={6} lg={6} xl={6} minHeight={550}>
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          borderRadius: "0px 30px 30px 0",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
        >
          <h3 class={montserrat.className} style={{ color: "#2f4858", marginBottom:"10px" }}>
            Not until we are lost do we <br /> begin to understand ourselves.
          </h3>
          <a
            class={montserratItalic.className}
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
