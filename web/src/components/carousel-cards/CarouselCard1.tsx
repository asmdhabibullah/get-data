import React from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { StyledCarouselCard1 } from "./CarouselCardStyle";

export interface CarouselCard1Props { }

const CarouselCard1: React.FC<CarouselCard1Props> = () => {
  return (
    <StyledCarouselCard1>
      <div>
        <h1 className="title">New Collection. Book Rent Fee 5% off.</h1>
        <Typography color="secondary.main" mb="1.35rem">
          There is probably no Java certification more valuable to you than Sun Certified Business Component Developer CX-310-090. To pass you need a readable, no-nonsense book focused like a laser beam on the exam goals. SCBCD Exam Study Kit is that book.
        </Typography>
        <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >
          Visit Collections
        </Button>
      </div>

      <div className="image-holder">
        <img
          src="https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/small.jpg"
          alt="science book"
        />
      </div>
    </StyledCarouselCard1>
  );
};

export default CarouselCard1;
