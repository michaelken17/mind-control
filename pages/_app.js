import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { montserratBold, montserrat, openSans } from "../public/fonts";
import { AnimatePresence } from "framer-motion";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";
import { Typography } from "@mui/material";
import Link from "next/link";
import Breadcrumbs from "nextjs-breadcrumbs";
function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function App({ Component, pageProps, router }) {
  const path = router.pathname;
  // console.log(path);

  // console.log(title);
  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/image/mcwebicon.png" />
        <title>Mindcontrol</title>
      </Head>
      <main className={openSans.className}>
        <Layout>
          <AnimatePresence mode="wait">
            <Breadcrumbs useDefaultStyle rootLabel="Home" />
            <Component key={router.pathname} {...pageProps} />
          </AnimatePresence>
        </Layout>
      </main>
    </Provider>
  );
}
