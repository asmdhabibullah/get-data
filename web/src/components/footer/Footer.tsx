import AppStore from "@component/AppStore";
// import Image from "@component/Image";
import Image from "next/image"
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { getTheme } from "../../utils/utils";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography, { Paragraph } from "../Typography";

const StyledLink = styled.a`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const Footer: React.FC = () => {
  return (
    <footer>
      <Box bg="#0F3460">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image
                      // mb="1.25rem"
                      src="/logo.jpeg"
                      alt="logo"
                      width={200}
                      height={100}
                    />
                  </a>
                </Link>

                <Paragraph mb="1.25rem" color="gray.500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Auctor libero id et, in gravida. Sit diam duis mauris nulla
                  cursus. Erat et lectus vel ut sollicitudin elit at amet.
                </Paragraph>

                <AppStore />
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  About Us
                </Typography>

                <div>
                  {aboutLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Customer Care
                </Typography>

                <div>
                  {customerCareLinks.map((item, ind) => (
                    <Link href="/" key={ind}>
                      <StyledLink>{item}</StyledLink>
                    </Link>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Contact Us
                </Typography>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14457.734085740985!2d102.7034758!3d25.0532915!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc72039b2e852b982!2sYunnan%20University!5e0!3m2!1sen!2suk!4v1653429426908!5m2!1sen!2suk"
                  width="250"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <Typography py="0.3rem" color="gray.500">
                  2 Cuihu N Rd, Wuhua District, Kunming, Yunnan, China, 650106
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  Email: support@ynu.edu.cn
                </Typography>
                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: +8615608807860
                </Typography>
                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Open: 9:00 AM - 5:00 PM
                </Typography>
                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={item.iconName}
                    >
                      <Box
                        m="5px"
                        size="small"
                        p="10px"
                        bg="rgba(0,0,0,0.2)"
                        borderRadius="50%"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const aboutLinks = [
  "Careers",
  "Books",
  "Terms & Conditions",
  "Privacy Policy",
];

const customerCareLinks = [
  "Help Center",
  "How to Buy",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];

const iconList = [
  { iconName: "facebook", url: "https://www.facebook.com/UILibOfficial" },
  { iconName: "twitter", url: "/" },
  {
    iconName: "youtube",
    url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  },
  { iconName: "google", url: "/" },
  { iconName: "instagram", url: "/" },
];

export default Footer;
