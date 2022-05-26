import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import Typography, { H2 } from "../Typography";
import Grid from "../grid/Grid";
import TextField from "../text-field/TextField";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Radio from "../radio/Radio";
import Divider from "../Divider";
import Box from "../Box";
import useWindowSize from "../../hooks/useWindowSize";
import { ApiPostHelper } from "helper";
import { API } from "config";

const PaymentForm = ({ email, bookId }: any) => {
  const [message, setMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const width = useWindowSize();
  const isMobile = width < 769;

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  const bookBuyHandeler = async (values: any, action: any) => {
    const res = await ApiPostHelper(`${API}/book/buy/?bookId=${bookId}&email=${email}`, values);

    // console.log("email", email);
    // console.log("bookId", bookId);

    if (res.status === 201) {
      setMessage(res.data.message)
      action.resetFrom();
    } else {
      // setMessage(res.data.message);
      setMessage(res.response.data.message);
    }
  };

  return (
    <Fragment>
      <Card1 mb="2rem">
        <Radio
          name="credit-card"
          mb="1.5rem"
          color="secondary"
          checked={paymentMethod === "credit-card"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              For Buy This Book, Please Use Credit Card
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />

        {
          message && (
            <Box mb="24px">
              <H2 color="green" mb="4px" lineHeight="1">
                {message}
              </H2>
            </Box>
          )
        }
        <Divider mb="1.25rem" mx="-2rem" />

        {paymentMethod === "credit-card" && (
          <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            onSubmit={bookBuyHandeler}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb="1.5rem">
                  <Grid container horizontal_spacing={6} vertical_spacing={4}>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="card_no"
                        label="Card Number"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.card_no || ""}
                        errorText={touched.card_no && errors.card_no}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="exp_date"
                        label="Exp Date"
                        placeholder="MM/YY"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.exp_date || ""}
                        errorText={touched.exp_date && errors.exp_date}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="cvc"
                        label="Card CVC"
                        placeholder="Card CVC"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.cvc || ""}
                        errorText={touched.cvc && errors.cvc}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="name"
                        label="Card Holder Name"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name || ""}
                        errorText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        name="price"
                        label="Book Price"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.price || ""}
                        errorText={touched.price && errors.price}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Button variant="outlined" color="primary" mb="30px" type="submit">
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        )}
      </Card1>
    </Fragment>
  );
};

const initialValues = {
  card_no: "",
  name: "",
  exp_date: "",
  cvc: "",
  price: 0
};

const checkoutSchema = yup.object().shape({
  card_no: yup.string().required("required"),
  name: yup.string().required("required"),
  exp_date: yup.string().required("required"),
  cvc: yup.string().required("required"),
  price: yup.number().required("required"),
});

export default PaymentForm;


{/* <Radio
          name="paypal"
          mb="1.5rem"
          color="secondary"
          checked={paymentMethod === "paypal"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Pay with Paypal
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />
        <Divider mb="1.5rem" mx="-2rem" /> */}

{/* {paymentMethod === "paypal" && (
          <Fragment>
            <FlexBox alignItems="flex-end" mb="30px">
              <TextField
                name="email"
                label="Paypal Email"
                type="email"
                mr={isMobile ? "1rem" : "30px"}
                fullwidth
              />
              <Button variant="outlined" color="primary" type="button">
                Submit
              </Button>
            </FlexBox>

            <Divider mb="1.5rem" mx="-2rem" />
          </Fragment>
        )} */}
{/* 
        <Radio
          name="cod"
          color="secondary"
          checked={paymentMethod === "cod"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Cash On Delivery
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        /> */}
{/* <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Link href="/orders">
            <Button variant="contained" color="primary" type="submit" fullwidth>
              Review
            </Button>
          </Link>
        </Grid>
      </Grid> */}
