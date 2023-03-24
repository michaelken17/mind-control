import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { Montserrat } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps, router }) {
  return (
    <Provider store={store}>
      <main className={montserrat.className}>
        <Layout>
          <AnimatePresence mode="wait">
            <Component key={router.pathname} {...pageProps} />
          </AnimatePresence>
        </Layout>
      </main>
    </Provider>
  );
}
