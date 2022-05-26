import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small } from "@component/Typography";
import { API } from "config";
import { ApiGetHelper } from "helper";
import Link from "next/link";
import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState<any[]>([]);
    useEffect(() => {
        const getUsers = async () => {
            const response = await ApiGetHelper(`${API}/users`);
            // console.log("response", response);

            if (response.status === 200) {
                const { message } = response.data;
                setUsers(message)
            }

        };

        getUsers();
    }, []);

    // console.log("users", users);

    // const { first_name, last_name, phoneNUmber } = users;

    return (
        <div>
            <DashboardPageHeader title="Users" iconName="user" />

            {users.map((item) => (
                // <Link href="/support-tickets/xkssThds6h37sd" key={item}>
                <Link href={`/users/[id]`} as={`/users/${item.id}`} key={item}>

                    <TableRow
                        as="a"
                        href="/support-tickets/xkssThds6h37sd"
                        my="1rem"
                        padding="15px 24px"
                    >
                        <div>
                            <FlexBox alignItems="center" flexWrap="wrap" pt="0.5rem" m="-6px">
                                {/* <Chip p="0.25rem 1rem" bg="primary.light" m="6px">
                                    <Small color="primary.main">Urgent</Small>
                                </Chip> */}
                                <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                                    <Small color="success.main">{item.firstName} {item.lastName}</Small>
                                </Chip>
                                <SemiSpan className="pre" m="6px">
                                    {item.phoneNumber}
                                </SemiSpan>
                            </FlexBox>
                        </div>

                        <Hidden flex="0 0 0 !important" down={769}>
                            <Typography textAlign="center" color="text.muted">
                                <IconButton size="small">
                                    <Icon variant="small" defaultcolor="currentColor">
                                        arrow-right
                                    </Icon>
                                </IconButton>
                            </Typography>
                        </Hidden>
                    </TableRow>
                </Link>
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
    )
};

Users.layout = DashboardLayout;

export default Users;