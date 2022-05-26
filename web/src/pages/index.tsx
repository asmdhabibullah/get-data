import MainLayout from "@component/layout";
import Section13 from "@component/home-1/Section13";
import Section11 from "../components/home-1/Section11";
import Section12 from "../components/home-1/Section12";
import Section3 from "../components/home-1/Section3";
import Section5 from "../components/home-1/Section5";
import Section6 from "../components/home-1/Section6";
// import AppLayout from "../components/layout/AppLayout";

const IndexPage = () => {
  return (
    <main>
      <Section3 />
      <Section5 />
      <Section13 />
      <Section6 />
      <Section11 />
      <Section12 />
    </main>
  );
};

IndexPage.layout = MainLayout;

export default IndexPage;
