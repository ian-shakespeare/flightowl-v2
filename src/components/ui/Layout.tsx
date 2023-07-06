import { JSX } from "solid-js";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => (
  <>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
