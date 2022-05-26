import Box from "@component/Box";
import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import TextField from "@component/text-field/TextField";
import { H3, H5, H6, SemiSpan, Small, Span } from "@component/Typography";
import { API } from "config";
import { useFormik } from "formik";
import { ApiPostHelper, setCookie, setLocalStorage } from "helper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import * as yup from "yup";


const initialValues = {
    name: "",
    isbn: "",
    price: 0,
    author: "",
    publisher: "",
    cetegory: "",
    publishYear: "",
    section: "",
    imgUri: "",
    shortDescription: "",
    longDescription: ""
};

const formSchema = yup.object().shape({
    name: yup.string().required("${path} is required"),
    isbn: yup.string().required("${path} is required"),
    price: yup.number().required("${path} is required"),
    author: yup.string().required("${path} is required"),
    publisher: yup.string().required("${path} is required"),
    cetegory: yup.string().required("${path} is required"),
    publishYear: yup.string().required("${path} is required"),
    section: yup.string().required("${path} is required"),
    imgUri: yup.string().required("${path} is required"),
    shortDescription: yup.string().required("${path} is required"),
    longDescription: yup.string().required("${path} is required"),
});

const AddBook = () => {
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const { id } = router.query
    const handleFormSubmit = async (values: any, action: any) => {
        // console.log(values);
        const respons = await ApiPostHelper(`${API}/book/add/${id}`, values);
        if (respons.status === 201) {
            // console.log("respons", respons);
            setMessage(respons.data.message)
            action.resetForm();
        }
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        onSubmit: handleFormSubmit,
        initialValues,
        validationSchema: formSchema,
    });

    return (
        <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
            <form className="content" onSubmit={handleSubmit}>
                <H3 textAlign="center" mb="0.5rem">
                    Welcome To Library
                </H3>
                <H5
                    fontWeight="600"
                    fontSize="12px"
                    color="gray.800"
                    textAlign="center"
                    mb="2.25rem"
                >
                    Add Book
                </H5>
                {
                    message && (
                        <H5
                            fontWeight="600"
                            fontSize="12px"
                            color="green"
                            textAlign="center"
                            mb="2.25rem"
                        >
                            {message}
                        </H5>
                    )
                }

                <TextField
                    mb="0.75rem"
                    name="name"
                    placeholder="Book Name"
                    label="Book Name"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                />

                <TextField
                    mb="0.75rem"
                    name="isbn"
                    placeholder="ISBN"
                    label="Book ISBN"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.isbn || ""}
                    errorText={touched.isbn && errors.isbn}
                />

                <TextField
                    mb="0.75rem"
                    name="price"
                    placeholder="Book Price"
                    label="Book Price"
                    type="number"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price || ""}
                    errorText={touched.price && errors.price}
                />
                <TextField
                    mb="0.75rem"
                    name="author"
                    placeholder="Book Author"
                    label="Book Author"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.author || ""}
                    errorText={touched.author && errors.author}
                />
                <TextField
                    mb="0.75rem"
                    name="publisher"
                    placeholder="Book Publisher"
                    label="Book Publisher"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.publisher || ""}
                    errorText={touched.publisher && errors.publisher}
                />

                <TextField
                    mb="0.75rem"
                    name="cetegory"
                    placeholder="Book Cetegory"
                    label="Book Cetegory"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cetegory || ""}
                    errorText={touched.cetegory && errors.cetegory}
                />


                <TextField
                    mb="0.75rem"
                    name="publishYear"
                    placeholder="Book Publish Year"
                    label="Book Publish Year"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.publishYear || ""}
                    errorText={touched.publishYear && errors.publishYear}
                />

                <TextField
                    mb="0.75rem"
                    name="section"
                    placeholder="Book Section In Library"
                    label="Book Section In Library"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.section || ""}
                    errorText={touched.section && errors.section}
                />

                <TextField
                    mb="0.75rem"
                    name="imgUri"
                    placeholder="Book Image"
                    label="Book Image"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.imgUri || ""}
                    errorText={touched.imgUri && errors.imgUri}
                />

                <TextField
                    mb="0.75rem"
                    name="shortDescription"
                    placeholder="Short Description"
                    label="Short Description"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shortDescription || ""}
                    errorText={touched.shortDescription && errors.shortDescription}
                />
                <TextField
                    mb="0.75rem"
                    name="longDescription"
                    placeholder="Long Description"
                    label="Long Description"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.longDescription || ""}
                    errorText={touched.longDescription && errors.longDescription}
                />

                <Button
                    mb="1.65rem"
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullwidth
                >
                    Add
                </Button>

                {/* <Box mb="1rem">
                    <Divider width="200px" mx="auto" />
                    <FlexBox justifyContent="center" mt="-14px">
                        <Span color="text.muted" bg="body.paper" px="1rem">
                            on
                        </Span>
                    </FlexBox>
                </Box>

                <FlexBox
                    justifyContent="center"
                    alignItems="center"
                    bg="#3B5998"
                    borderRadius={5}
                    height="40px"
                    color="white"
                    cursor="pointer"
                    mb="0.75rem"
                >
                    <Icon variant="small" defaultcolor="auto" mr="0.5rem">
                        facebook-filled-white
                    </Icon>
                    <Small fontWeight="600">Continue with Facebook</Small>
                </FlexBox>

                <FlexBox
                    justifyContent="center"
                    alignItems="center"
                    bg="#4285F4"
                    borderRadius={5}
                    height="40px"
                    color="white"
                    cursor="pointer"
                    mb="1.25rem"
                >
                    <Icon variant="small" defaultcolor="auto" mr="0.5rem">
                        google-1
                    </Icon>
                    <Small fontWeight="600">Continue with Google</Small>
                </FlexBox> */}

                {/* <FlexBox justifyContent="center" mb="1.25rem">
                    <SemiSpan>Don’t have account?</SemiSpan>
                    <Link href="/signup">
                        <a>
                            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                                Sign Up
                            </H6>
                        </a>
                    </Link>
                </FlexBox> */}
            </form>

            <FlexBox justifyContent="center" bg="gray.200" py="19px">
                <SemiSpan>Do you want to reset form?</SemiSpan>
                <Link href="/">
                    <a>
                        <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                            Reset It
                        </H6>
                    </a>
                </Link>
            </FlexBox>
        </StyledSessionCard>
    );
};

AddBook.layout = DashboardLayout;
export default AddBook;



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