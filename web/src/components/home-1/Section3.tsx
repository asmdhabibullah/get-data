import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import useWindowSize from "@hook/useWindowSize";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard6 from "../product-cards/ProductCard6";

const Section3: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(3);
  const width = useWindowSize();

  useEffect(() => {
    if (width < 650) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <CategorySectionCreator
      iconName="categories"
      title="Top Categories"
      seeMoreLink="#"
    >
      <Carousel totalSlides={5} visibleSlides={visibleSlides}>
        {categoryList.map((item, ind) => (
          <Link href={item.categoryUrl} key={ind}>
            <a>
              <Card p="1rem">
                <ProductCard6
                  title={item.title}
                  subtitle={item.subtitle}
                  imgUrl={item.imgUrl}
                />
              </Card>
            </a>
          </Link>
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

const categoryList = [
  {
    title: "Engineering",
    subtitle: "3k orders this week",
    categoryUrl: "/engineering",
    imgUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/adzic.jpg",
  },
  {
    title: "Science",
    categoryUrl: "/science",
    subtitle: "",
    imgUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/small.jpg",
  },
  {
    title: "Arts",
    subtitle: "3k orders this week",
    categoryUrl: "/arts",
    imgUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/siddaway.jpg",
  },
  {
    title: "Commerce",
    subtitle: "3k orders this week",
    categoryUrl: "/commerce",
    imgUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/shachor.jpg",
  },
  {
    title: "General",
    subtitle: "3k orders this week",
    categoryUrl: "/general",
    imgUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/sande.jpg",
  },
];

export default Section3;
