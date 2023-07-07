import { JSX } from "solid-js";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Title, Meta } from "@solidjs/meta";

type Props = {
  title: string;
  description: string;
  children: JSX.Element;
};

const Layout = ({ title, description, children }: Props) => (
  <>
    <Title>{title}</Title>
    <Meta name="description" content={description} />
    <NavBar />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
