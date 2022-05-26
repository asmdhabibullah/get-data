import Box from "@component/Box";
import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import NavbarLayout from "@component/layout/NavbarLayout";;
import ProductDescription from "@component/products/ProductDescription";
import ProductReview from "@component/products/ProductReview";
import Rating from "@component/rating/Rating";
import { H1, H2, H5, H6, SemiSpan } from "@component/Typography";
import { API } from "config";
import { ApiGetHelper } from "helper";
import { useRouter } from "next/router";
import LazyImage from "@component/LazyImage";
import { NextPageContext } from "next";
import useSWR from "swr";
import { useCallback, useContext, useState } from "react";
import { Auth } from "auth";
import Modal from "@component/modal/Modal";
import PaymentForBuy from "../../components/payment/PaymentForBuy";
import PaymentForBorrow from "../../components/payment/PaymentForBorrow";

// import PaymentForm from "@components/payment/PaymentForm";

// import Card, { CardProps } from '../../components/modal/Modal';
// import Link from "next/link";
// import booksData from "../../data/books.json";


interface BookInterface {
  book?: {
    id?: string;
    name?: string;
    price?: number;
    imgUri?: string;
    section?: string;
    library?: {
      libraryLocation?: string;
    };
    publisher?: string;
    publishYear?: string;
    reviews?: string[];
    shortDescription?: string;
    longDescription?: string;
    author?: string;
    categories?: string;
  }
};

// const bookInitialData: BookInterface["book"] = {
//   id: "",
//   name: "",
//   price: 0,
//   imgUri: "",
//   reviews: [],
//   section: "",
//   library: {
//     libraryLocation: ""
//   },
//   publisher: "",
//   publishYear: "",
//   shortDescription: "",
//   longDescription: "",
//   author: "",
//   categories: ""
// }

const BookDetails = ({ book }: BookInterface) => {
  const { id } = useRouter().query
  const { userData } = useContext(Auth);
  const { email } = userData.user;
  const [openBuy, setBuyOpen] = useState(false);
  const [openBorrow, setBorrowOpen] = useState(false);


  const toggleBuyDialog = useCallback(() => {
    setBuyOpen((openBuy) => !openBuy);
  }, []);
  const toggleBorrowDialog = useCallback(() => {
    setBorrowOpen((openBorrow) => !openBorrow);
  }, []);
  // console.log("id", id);
  // console.log("book", book);
  const { data } = useSWR(`${API}/book/${id}`, { initialData: book })
  // useEffect(() => {

  //   const getBooks = () => {
  //     if (data) {
  //       setUseBook({ ...useBook, ...data });
  //     }
  //   };
  //   getBooks();
  // }, [data]);

  // console.log("useBook", useBook);
  // const , isbn, price, thumbnailUrl, shortDescription, longDescription, authors, categories } = useBook;

  const {
    name,
    price,
    imgUri,
    author,
    reviews,
    section,
    library,
    publisher,
    publishYear,
    categories,
    longDescription,
  } = data;

  const { libraryLocation } = library;

  return (
    <div>
      {/* <BookDetailsCard {...useBook} /> */}
      <Box overflow="hidden">
        <Grid container justifyContent="center" spacing={16}>
          <Grid item md={6} xs={12} alignItems="center">
            <Box>
              <FlexBox justifyContent="center" mb="50px">
                <LazyImage
                  src={imgUri}
                  alt={name}
                  height="300px"
                  width="200px"
                  objectFit="contain"
                  loading="eager"
                />
              </FlexBox>
            </Box>
          </Grid>

          <Grid item md={6} xs={12} alignItems="center">

            <H1 mb="1rem">{name}</H1>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Author:</SemiSpan>
              <H6 ml="8px">{author}</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Rated:</SemiSpan>
              <Box ml="8px" mr="8px">
                <Rating color="warn" value={4} outof={5} />
              </Box>
              <H6>({reviews.length || 0})</H6>
            </FlexBox>

            <Box mb="24px">
              <H2 color="primary.main" mb="4px" lineHeight="1">
                ${price}
              </H2>
              <SemiSpan color="inherit">Stock Available</SemiSpan>
            </Box>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Location:</SemiSpan>
              <H6 ml="8px">{libraryLocation}</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Position:</SemiSpan>
              <H6 ml="8px">{section}</H6>
            </FlexBox>
            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Publisher:</SemiSpan>
              <H6 ml="8px">{publisher} - {publishYear}</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb="1rem">
              <SemiSpan>Catergory:</SemiSpan>
              <H6 ml="8px">{categories} - {publishYear}</H6>
            </FlexBox>

            <FlexBox>
              <Button
                mb="36px"
                mr="8px"
                size="small"
                color="primary"
                variant="contained"
                onClick={toggleBuyDialog}
              >
                Buy
              </Button>

              <Button
                mb="36px"
                size="small"
                color="primary"
                variant="contained"
                onClick={toggleBorrowDialog}
              >
                Borrow
              </Button>
            </FlexBox>

            <Modal open={openBuy} onClose={toggleBuyDialog}>
              <Grid item lg={8} md={8} xs={12}>
                <PaymentForBuy email={email} bookId={id} />
              </Grid>
            </Modal>

            <Modal open={openBorrow} onClose={toggleBorrowDialog}>
              <Grid item lg={8} md={8} xs={12}>
                <PaymentForBorrow email={email} bookId={id} />
              </Grid>
            </Modal>

          </Grid>
        </Grid>
      </Box>

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          className="cursor-pointer"
          mr="25px"
          p="4px 10px"
          color="primary.main"
          borderBottom={"2px solid"}
          borderColor="primary.main"
        // onClick={handleOptionClick("description")}
        >
          Description
        </H5>
      </FlexBox>
      <p>{longDescription}</p>

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          className="cursor-pointer"
          p="4px 10px"
          color="text.muted"
          // onClick={handleOptionClick("review")}
          borderBottom="2px solid"
          borderColor="primary.main"
        >
          Review (3)
        </H5>
      </FlexBox>

      <Box mb="50px">
        <ProductDescription />
        <ProductReview />
      </Box>
    </div>
  );
};

BookDetails.layout = NavbarLayout;


BookDetails.getInitialProps = async ({ query }: NextPageContext) => {

  const response = await ApiGetHelper(`${API}/book/${query.id}`);

  // console.log("message", response?.data?.message);

  return {
    book: response?.data?.message
  }
}

export default BookDetails;
