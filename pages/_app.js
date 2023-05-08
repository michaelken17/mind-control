import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { montserratBold, montserrat, openSans } from "../public/fonts";
import { AnimatePresence } from "framer-motion";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";

export default function App({ Component, pageProps, router }) {
  const path = router.pathname;
  // console.log(path);
  const title = path.split("/")[1];
  // console.log(title);
  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="image/mcwebicon.png" />
        <title>Mindcontrol</title>
      </Head>
      <main className={openSans.className}>
        <Layout>
          <AnimatePresence mode="wait">
            <Component key={router.pathname} {...pageProps} />
          </AnimatePresence>
        </Layout>
      </main>
    </Provider>
  );
}
