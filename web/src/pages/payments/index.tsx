import IconButton from "@component/buttons/IconButton";
import { Chip } from "@component/Chip";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { SemiSpan, Small } from "@component/Typography";
import { API } from "config";
import { ApiGetHelper } from "helper";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";

const Payments = () => {

    const [payments, setPayments] = useState<any[] | undefined>([])

    useEffect(() => {
        const getPayments = async () => {
            const response = await ApiGetHelper(`${API}/payments`);

            if (response.status === 200) {
                setPayments(response.data.message);
            }
        };
        getPayments();
    }, []);

    console.log(payments);

    return (
        <div>
            <DashboardPageHeader title="Payments" iconName="user" />

            {payments.map((item) => (
                // <Link href="/support-tickets/xkssThds6h37sd" key={item}>
                // <Link href={`/users/[id]`} as={`/users/${item.id}`} key={item}>

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
                                <Small color="success.main">{item.paymentInfo.carHolder} </Small>
                            </Chip>
                            <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                                <Small color="success.main">
                                    Card: {item.paymentInfo.card}</Small>
                            </Chip>
                            <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                                <Small color="success.main">{item.paymentInfo.cardType} </Small>
                            </Chip>

                            <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                                <Small color="success.main">{item.paymentInfo.type} </Small>
                            </Chip>
                            <Chip p="0.25rem 1rem" bg="success.light" m="6px">
                                <Small color="success.main">Amount: ${item.amount} </Small>
                            </Chip>
                        </FlexBox>
                    </div>

                    {/* <Hidden flex="0 0 0 !important" down={769}>
                        <Typography textAlign="center" color="text.muted">
                            <IconButton size="small">
                                <Icon variant="small" defaultcolor="currentColor">
                                    arrow-right
                                </Icon>
                            </IconButton>
                        </Typography>
                    </Hidden> */}
                </TableRow>
                // </Link>
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
}

Payments.layout = CustomerDashboardLayout;

export default Payments;