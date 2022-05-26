import React from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import DashboardPageHeader from "../layout/DashboardPageHeader";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";
import { H5 } from "../Typography";
import OrderRow from "./OrderRow";

export interface CustomerOrderListProps { }

const CustomerOrderList: React.FC<CustomerOrderListProps> = () => {
  return (
    <div>
      <DashboardPageHeader title="All Fine List" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Id #
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Status
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Date
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Amount
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Contact
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {orderList.map((item, ind) => (
        <OrderRow item={item} key={ind} />
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
    </div>
  );
};

const orderList = [
  {
    orderNo: "105017AS",
    status: "Pending",
    purchaseDate: "2022/05/27",
    price: 10,
    person: "+861560880785"
  },
  {
    orderNo: "1056617AS4354",
    status: "Pending",
    purchaseDate: "2022/05/24",
    price: 5,
    person: "+8615608805860"
  },
  {
    orderNo: "1050017AS232",
    status: "Pending",
    purchaseDate: "2022/05/26",
    price: 13,
    person: "+8615608805660"
  },
  {
    orderNo: "1050017ASr4rw",
    status: "Pending",
    purchaseDate: "2022/05/23",
    price: 20,
    person: "+8615604577860"
  },
];

export default CustomerOrderList;
