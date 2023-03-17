import { Box, ThemeProvider } from "@mui/material";
import styles from "styles/Quiz.module.css";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{opacity:0}}
      transition={{ duration: 1 }}
    >
      <Box
        className={styles.quizDiv}
        sx={{
          bgcolor: "black",

          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </motion.div>
  );
};

export default MainLayout;
