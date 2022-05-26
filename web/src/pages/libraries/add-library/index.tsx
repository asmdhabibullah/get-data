
import Button from "@component/buttons/Button";
import FlexBox from "@component/FlexBox";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import { StyledSessionCard } from "@component/sessions/SessionStyle";
import TextField from "@component/text-field/TextField";
import { H3, H5, H6, SemiSpan } from "@component/Typography";
import { API } from "config";
import { useFormik } from "formik";
import { ApiPostHelper, setCookie, setLocalStorage } from "helper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as yup from "yup";


const initialValues = {
    userId: "",
    libraryName: "",
    libraryLocation: "",
};

const formSchema = yup.object().shape({
    userId: yup.string().required("${path} is required"),
    libraryName: yup.string().required("${path} is required"),
    libraryLocation: yup.string().required("${path} is required"),
});

const Libraries = () => {
    const [message, setMessage] = useState<string | null>(null);

    const handleFormSubmit = async (values: any, action: any) => {
        // console.log(values);
        const respons = await ApiPostHelper(`${API}/add/library`, values);
        if (respons.status === 201) {
            // console.log("respons", respons);
            setMessage(respons.data.message)
            // router.push("/");
            // router.reload();
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
                    Add Library
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
                    name="userId"
                    placeholder="Owner Id Number"
                    label="Owner Id Number"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userId || ""}
                    errorText={touched.userId && errors.userId}
                />

                <TextField
                    mb="0.75rem"
                    name="libraryName"
                    placeholder="Library Name"
                    label="Library Name"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.libraryName || ""}
                    errorText={touched.libraryName && errors.libraryName}
                />

                <TextField
                    mb="0.75rem"
                    name="libraryLocation"
                    placeholder="Library Location"
                    label="Library Location"
                    type="text"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.libraryLocation || ""}
                    errorText={touched.libraryLocation && errors.libraryLocation}
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