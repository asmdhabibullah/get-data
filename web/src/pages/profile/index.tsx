import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H3, H5, Small } from "@component/Typography";
import { Auth } from "auth";
import { API } from "config";
import { ApiGetHelper } from "helper";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface userData {
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  rules?: string;
  address?: string;
  dateOfBirth?: string;
  buys?: []
  borrows?: []
}

const Profile = () => {
  const { userData } = useContext(Auth);
  const [activeUser, setActiveUser] = useState<userData | undefined>({
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
    rules: "",
    address: "",
    dateOfBirth: "",
    buys: [],
    borrows: []
  });



  // const { data } = useSWR(`${API}/user/${userId}`)

  // console.log("data", data);



  useEffect(() => {

    const getUserData = async () => {

      if (userData) {
        const email = userData?.user?.email;
        console.log("email", email);
        const user = await ApiGetHelper(`${API}/user/${email}`);
        console.log("user", user);

        if (user) {
          const {
            email, phoneNumber, firstName, lastName, accountType, address, dateOfBirth, buys, borrows
          } = user?.data?.message;

          setActiveUser({
            ...activeUser,
            email,
            buys,
            borrows,
            address,
            dateOfBirth,
            phone: phoneNumber,
            rules: accountType,
            first_name: firstName,
            last_name: lastName,
          })
        }
      }

    };
    getUserData();
  }, []);
  // const user = JSON.parse(getLocalStorage("user"));

  // console.log("json", json);

  // const user = JSON.parse(json);
  // console.log("user", user);

  const { email, phone, first_name, last_name, rules, address,
    dateOfBirth, buys, borrows
  } = activeUser;


  const date = new Date(dateOfBirth);
  // console.log("date", date.toDateString());


  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="My Profile"
        button={
          <Link href="/profile/edit">
            <Button color="primary" bg="primary.light" px="2rem">
              Edit Profile
            </Button>
          </Link>
        }
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              <Avatar src="/assets/images/faces/ralph.png" size={64} />
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px">{first_name} {last_name}</H5>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>
                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        $00
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography
                    ontSize="14px"
                    color="text.hint"
                    letterSpacing="0.2em"
                  >
                    {rules} USER
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>
                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow p="0.75rem 1.5rem">
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            First Name
          </Small>
          <span>{first_name}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Last Name
          </Small>
          <span>{last_name}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Email
          </Small>
          <span>{email} </span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px" textAlign="left">
            Phone
          </Small>
          <span>{phone}</span>
        </FlexBox>
        <FlexBox flexDirection="column" p="0.5rem">
          <Small color="text.muted" mb="4px">
            Birth date
          </Small>
          <span className="pre">
            {
              date.toDateString()
            }
          </span>
        </FlexBox>
      </TableRow>
    </div>
  );
};

const infoList = [
  {
    title: "00",
    subtitle: "All Orders",
  },
  {
    title: "00",
    subtitle: "Awaiting Payments",
  },
  {
    title: "00",
    subtitle: "Awaiting Shipment",
  },
  {
    title: "00",
    subtitle: "Awaiting Delivery",
  },
];

Profile.layout = DashboardLayout;

export default Profile;
