import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface OrderRowProps {
  item: {
    orderNo: any;
    status: string;
    href?: string;
    purchaseDate: string | Date;
    price: number;
    person: string;
  };
}

const OrderRow: React.FC<OrderRowProps> = ({ item }) => {
  const getColor = (status) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Processing":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "";
    }
  };

  return (

    <TableRow as="a" href={item.href} my="1rem" padding="6px 18px">
      <H5 m="6px" textAlign="left">
        {item.orderNo}
      </H5>
      <Box m="6px">
        <Chip p="0.25rem 1rem" bg={`${getColor(item.status)}.light`}>
          <Small color={`${getColor(item.status)}.main`}>{item.status}</Small>
        </Chip>
      </Box>
      <Typography className="flex-grow pre" m="6px" textAlign="left">
        {format(new Date(item.purchaseDate), "MMM dd, yyyy")}
      </Typography>
      <Typography m="6px" textAlign="left">
        ${item.price.toFixed(2)}
      </Typography>
      <Typography m="6px" textAlign="left">
        {item.person}
      </Typography>
    </TableRow>
  );
};

export default OrderRow;
