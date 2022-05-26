import IconButton from "@component/buttons/IconButton";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Box from "../Box";
import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import SearchBox from "../search-box/SearchBox";
import Login from "../sessions/Login";
import StyledHeader from "./HeaderStyle";
import UserLoginDialog from "./UserLoginDialog";
import { Auth } from "auth";
import { logout } from "helper";
import { useRouter } from "next/router";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ isFixed, className }) => {
  const router = useRouter();
  const { isAuthenticated } = useContext(Auth);
  // const [open, setOpen] = useState(false);
  // const toggleSidenav = () => setOpen(!open);
  // const { state } = useAppContext();
  // const { cartList } = state.cart;

  // const cartHandle = (
  //   <FlexBox ml="20px" alignItems="flex-start">
  //     <IconButton bg="gray.200" p="12px">
  //       <Icon size="20px">bag</Icon>
  //     </IconButton>

  //     {!!cartList.length && (
  //       <FlexBox
  //         borderRadius="300px"
  //         bg="error.main"
  //         px="5px"
  //         py="2px"
  //         alignItems="center"
  //         justifyContent="center"
  //         ml="-1rem"
  //         mt="-9px"
  //       >
  //         <Tiny color="white" fontWeight="600">
  //           {cartList.length}
  //         </Tiny>
  //       </FlexBox>
  //     )}
  //   </FlexBox>
  // );

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <Image src="/logo.jpeg" width={180} height={75} alt="logo" />
            </a>
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchBox />
        </FlexBox>
        {/* {
          isAuthenticated && (
            <Sidenav
              handle={cartHandle}
              position="right"
              open={open}
              width={380}
              toggleSidenav={toggleSidenav}
            >
              <MiniCart toggleSidenav={toggleSidenav} />
            </Sidenav>
          )
        } */}

        <FlexBox className="header-right" alignItems="center">
          {
            isAuthenticated ? (
              <IconButton ml="1rem" bg="gray.200" p="8px">
                <Icon size="28px"
                  onClick={async () => {
                    logout();
                    // router.push("/")
                    router.reload();
                  }}
                >logout</Icon>
              </IconButton>
            ) : (
              <UserLoginDialog
                handle={
                  <IconButton ml="1rem" bg="gray.200" p="8px">
                    <Icon size="28px">user</Icon>
                  </IconButton>
                }
              >
                <Box>
                  <Login />
                </Box>
              </UserLoginDialog>
            )
          }
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
