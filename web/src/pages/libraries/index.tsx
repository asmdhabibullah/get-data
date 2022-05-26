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


const Libraries = () => {

    const [libraries, setLibraries] = useState<any[]>([]);
    useEffect(() => {
        const getLibraries = async () => {
            const response = await ApiGetHelper(`${API}/libraries`);
            // console.log("response", response);

            if (response.status === 200) {
                const { message } = response.data;
                setLibraries(message)
            }

        };

        getLibraries();
    }, []);

    // console.log("libraries  ", libraries);

    // const { first_name, last_name, phoneNUmber } = users;

    return (
        <div>
            <DashboardPageHeader title="Libraries" iconName="book" />

            {libraries.map((item) => (
                // <Link href="/support-tickets/xkssThds6h37sd" key={item}>
                <Link href={`/libraries/[id]`} as={`/libraries/${item.id}`} key={item}>

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
                                    <Small color="success.main">{item.libraryName} </Small>
                                </Chip>
                                <SemiSpan className="pre" m="6px">
                                    {item.libraryLocation}
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

Libraries.layout = DashboardLayout;
export default Libraries;



// const Login: React.FC = () => {

// };

// const initialValues = {
//     email: "",
//     password: "",
// };

// const formSchema = yup.object().shape({
//     email: yup.string().email("invalid email").required("${path} is required"),
//     password: yup.string().required("${path} is required"),
// });