import Box from "@component/Box";
import { Auth } from "auth";
import { getLocalStorage } from "helper";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const CustomerDashboardNavigation = () => {
  const { userData } = useContext(Auth);
  const { pathname } = useRouter();
  const [routingList, setRoutingList] = useState<any[] | null>([]);

  // console.log(userData);

  useEffect(() => {
    // const localRes = getLocalStorage("user");
    // let user: any;
    // if (localRes) {
    //   user = JSON.parse(localRes);
    // }
    // console.log(user);


    if (userData) {
      const rules = userData?.user?.rules || "";
      // const rules = user.rules
      // console.log("rules", rules);
      if (rules === "ADMIN" || rules === "STAFF") {
        setRoutingList(adminOrStaffLinkList);
      } else if (rules === "USER") {
        setRoutingList(userLinkList);
      } else {
        setRoutingList(guestLinkList);
      }
    }

  }, [userData]);

  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {routingList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>
          {item.list.map((item) => (
            <StyledDashboardNav
              isCurrentPath={pathname.includes(item.href)}
              href={item.href}
              key={item.title}
              px="1.5rem"
              mb="1.25rem"
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </Box>
                <span>{item.title}</span>
              </FlexBox>
              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};

const adminOrStaffLinkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/users",
        title: "Users",
        iconName: "person",
        // count: 5,
      },
      {
        href: "/orders",
        title: "Orders",
        iconName: "bag",
        // count: 5,
      },
      {
        href: "/fine",
        title: "Fine Collect",
        iconName: "money_icon",
        // count: 0,
      },
      {
        href: "/libraries",
        title: "Libraries",
        iconName: "book",
        // count: 100,
      },
      {
        href: "/libraries/add-library",
        title: "Add Library",
        iconName: "book",
      },
      {
        href: "/books",
        title: "Books",
        iconName: "book",
        // count: 100,
      },
      {
        href: "/books/add-book",
        title: "Add Book",
        iconName: "add-book",
        // count: 1,
      },
      {
        href: "/payments",
        title: "Payments",
        iconName: "credit-card",
        // count: 4,
      },
      {
        href: "/support-tickets",
        title: "Support Tickets",
        iconName: "customer-service",
        // count: 1,
      },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        iconName: "user",
        // count: 3,
      },
    ],
  },
];

const userLinkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/user-orders",
        title: "Orders",
        iconName: "bag",
      },
      {
        href: "/my-wish-list",
        title: "My Wishlist",
        iconName: "heart",
      },
      {
        href: "/user-support-tickets",
        title: "Support Tickets",
        iconName: "customer-service",
      },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        iconName: "user",
      },
      {
        href: "/address",
        title: "Addresses",
        iconName: "pin",
      },
      {
        href: "/payment-methods",
        title: "Payment Methods",
        iconName: "credit-card",
      },
    ],
  },
];


const guestLinkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/wish-list",
        title: "Wishlist",
        iconName: "heart",
      }
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        iconName: "user",
      }
    ],
  },
];


export default CustomerDashboardNavigation;
