import "bootstrap/dist/css/bootstrap.min.css";
import ThemeProvider from "providers/ThemeProvider";

import "../styles/index.scss";
//import "highlight.js/styles/base16/Bright.css";
import "highlight.js/styles/dark.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSun,
  faMoon,
  faBorderAll,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import "react-toggle/style.css";

library.add(faSun, faMoon, faList, faBorderAll);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
