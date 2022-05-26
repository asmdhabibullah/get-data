import CarouselCard1 from "@component/carousel-cards/CarouselCard1";
import Carousel from "@component/carousel/Carousel";
import Head from "next/head";
import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MobileNavigationBar from "../mobile-navigation/MobileNavigationBar";
import Navbar from "../navbar/Navbar";
import Topbar from "../topbar/Topbar";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
    title?: string;
};

const MainLayout: React.FC<Props> = ({
    children,
    title = "BD Library Management",
}) => (
    <StyledAppLayout>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Topbar />
        <Header />
        <Navbar />
        <Carousel
            totalSlides={5}
            visibleSlides={1}
            infinite={true}
            autoPlay={true}
            showDots={true}
            showArrow={false}
            spacing="0px"
        >
            <CarouselCard1 />
            <CarouselCard1 />
            <CarouselCard1 />
            <CarouselCard1 />
            <CarouselCard1 />
        </Carousel>

        {children}
        <MobileNavigationBar />
        <Footer />
    </StyledAppLayout>
);

export default MainLayout;
