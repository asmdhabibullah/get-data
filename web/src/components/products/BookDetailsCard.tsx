import LazyImage from "@component/LazyImage";
import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
// import Avatar from "../avatar/Avatar";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Rating from "../rating/Rating";
import { H1, H2, H3, H6, SemiSpan } from "../Typography";

export interface BookDetailsCardProps {
  id?: string;
  name?: string;
  isbn?: string;
  price?: number;
  imgUri?: string;
  shortDescription?: string;
  longDescription?: string;
  authors?: string;
  categories?: string;
}

const BookDetailsCard: React.FC<BookDetailsCardProps> = ({
  id,
  name,
  price,
  imgUri,
  shortDescription,
  longDescription,
  authors,
  categories
}) => {
  // const [selectedImage, setSelectedImage] = useState(0);
  // const { state, dispatch } = useAppContext();
  // const cartList: CartItem[] = state.cart.cartList;
  const router = useRouter();
  const routerId = router.query.id as string;

  // console.log("book", book)

  // const cartItem = cartList.find(
  //   (item) => item.id === id || item.id === routerId
  // );

  // const handleImageClick = (ind) => () => {
  //   setSelectedImage(ind);
  // };



  // const handleCartAmountChange = useCallback(
  //   (amount) => () => {
  //     dispatch({
  //       type: "CHANGE_CART_AMOUNT",
  //       payload: {
  //         qty: amount,
  //         name: name,
  //         price,
  //         imgUrl: imgUri,
  //         id: id || routerId,
  //       },
  //     });
  //   },
  //   []
  // );

  return (
    null
  );
};

export default BookDetailsCard;
