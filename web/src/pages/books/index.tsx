import { API } from "config";
import Box from "@component/Box";
import { ApiGetHelper } from "helper";
import { Chip } from "@component/Chip";
import Container from "@component/Container";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import MainLayout from "@component/layout";
import LazyImage from "@component/LazyImage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { H3, SemiSpan } from "@component/Typography";
import Rating from "@component/rating/Rating";
import BookSearch from "@component/search-box/BookSearch";

const Books = () => {

    const [resultList, setResultList] = useState([]);
    const [useBooks, setUseBooks] = useState<any[] | undefined>([])

    useEffect(() => {
        const getBooks = async () => {
            const response = await ApiGetHelper(`${API}/books`);

            if (response.status === 200) {
                setUseBooks(response.data.message);
            }
        };
        getBooks();
    }, []);


    // console.log("useBooks", useBooks);
    // console.log("resultList", resultList);

    // const toggleDialog = useCallback(() => {
    //     setOpen((open) => !open);
    // }, []);

    const off = 20;

    // console.log("useBooks", useBooks);

    // cosnt { }

    // const { state, dispatch } = useAppContext();
    // const cartItem: CartItem = state.cart.cartList.find((item) => item.id === id);

    // const handleCartAmountChange = useCallback(
    //     (amount) => () => {
    //         dispatch({
    //             type: 'CHANGE_CART_AMOUNT',
    //             payload: {
    //                 name: title,
    //                 qty: amount,
    //                 price,
    //                 imgUrl: imgUri,
    //                 id,
    //             },
    //         });
    //     },
    //     []
    // );

    if (resultList && resultList.length > 0) {

        return (
            <MainLayout>
                <Container mb="70px">
                    <div style={{ margin: "40px 0" }}>
                        <FlexBox justifyContent="center" flex="1 1 0">
                            <BookSearch books={useBooks} setResultList={setResultList} />
                        </FlexBox>
                    </div>
                    <Grid container spacing={6}>
                        {resultList.map((book, ind) => (
                            <Grid item lg={3} md={6} xs={12} key={ind}>
                                <div className="image-holder">
                                    {!!off && (
                                        <Chip
                                            position="absolute"
                                            bg="primary.main"
                                            color="primary.text"
                                            fontSize="10px"
                                            fontWeight="600"
                                            p="5px 10px"
                                            top="10px"
                                            left="10px"
                                        >
                                            {off}% off
                                        </Chip>
                                    )}

                                    <Link href={`/books/[id]`} as={`/books/${book?._id}`}>
                                        <a>
                                            <LazyImage
                                                src={book.imgUri}
                                                width="100%"
                                                height="auto"
                                                layout="responsive"
                                                alt={book.name}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className="details">
                                    <FlexBox>
                                        <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
                                            <Link href={`/books/[id]`} as={`/books/${book._id}`}>
                                                <a>
                                                    <H3
                                                        className="title"
                                                        fontSize="14px"
                                                        textAlign="left"
                                                        fontWeight="600"
                                                        color="text.secondary"
                                                        mb="10px"
                                                        title={book.name}
                                                    >
                                                        {book.name}
                                                    </H3>
                                                </a>
                                            </Link>

                                            <Rating value={book.rating || 0} outof={5} color="warn" readonly />

                                            <FlexBox alignItems="center" mt="10px">
                                                <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                                                    ${(book.price - (book.price * off) / 100).toFixed(2)}
                                                </SemiSpan>
                                                {!!off && (
                                                    <SemiSpan color="text.muted" fontWeight="600">
                                                        <del>{book.price?.toFixed(2)}</del>
                                                    </SemiSpan>
                                                )}
                                            </FlexBox>
                                        </Box>


                                    </FlexBox>
                                </div>

                            </Grid>
                        ))}
                    </Grid>
                    {/* </Card> */}
                </Container>

            </MainLayout>
        )
    } else {
        return (
            <MainLayout>
                <Container mb="70px">
                    <div style={{ margin: "40px 0" }}>
                        <FlexBox justifyContent="center" flex="1 1 0">
                            <BookSearch books={useBooks} setResultList={setResultList} />
                        </FlexBox>
                    </div>
                    <Grid container spacing={6}>
                        {useBooks.map((book, ind) => (
                            <Grid item lg={3} md={6} xs={12} key={ind}>
                                <div className="image-holder">
                                    {!!off && (
                                        <Chip
                                            position="absolute"
                                            bg="primary.main"
                                            color="primary.text"
                                            fontSize="10px"
                                            fontWeight="600"
                                            p="5px 10px"
                                            top="10px"
                                            left="10px"
                                        >
                                            {off}% off
                                        </Chip>
                                    )}

                                    <Link href={`/books/[id]`} as={`/books/${book?._id}`}>
                                        <a>
                                            <LazyImage
                                                src={book.imgUri}
                                                width="100%"
                                                height="auto"
                                                layout="responsive"
                                                alt={book.name}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className="details">
                                    <FlexBox>
                                        <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
                                            <Link href={`/books/[id]`} as={`/books/${book._id}`}>
                                                <a>
                                                    <H3
                                                        className="title"
                                                        fontSize="14px"
                                                        textAlign="left"
                                                        fontWeight="600"
                                                        color="text.secondary"
                                                        mb="10px"
                                                        title={book.name}
                                                    >
                                                        {book.name}
                                                    </H3>
                                                </a>
                                            </Link>

                                            <Rating value={book.rating || 0} outof={5} color="warn" readonly />

                                            <FlexBox alignItems="center" mt="10px">
                                                <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                                                    ${(book.price - (book.price * off) / 100).toFixed(2)}
                                                </SemiSpan>
                                                {!!off && (
                                                    <SemiSpan color="text.muted" fontWeight="600">
                                                        <del>{book.price?.toFixed(2)}</del>
                                                    </SemiSpan>
                                                )}
                                            </FlexBox>
                                        </Box>


                                    </FlexBox>
                                </div>

                            </Grid>
                        ))}
                    </Grid>
                    {/* </Card> */}
                </Container>

            </MainLayout>
        )
    }
};

export default Books;


{/* <Modal open={open} onClose={toggleDialog}>
                                <Card p="1rem" position="relative">
                                    <BookCard imgUri={book.imgUri} title={book.name} price={book.price} id={book.id} />
                                    <Box
                                        position="absolute"
                                        top="0.75rem"
                                        right="0.75rem"
                                        cursor="pointer"
                                    >
                                        <Icon
                                            className="close"
                                            color="primary"
                                            variant="small"
                                            onClick={toggleDialog}
                                        >
                                            close
                                        </Icon>
                                    </Box>
                                </Card>
                            </Modal> */}
{/* <FlexBox
                                        flexDirection="column-reverse"
                                        alignItems="center"
                                        justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}
                                        width="30px"
                                    > */}
{/* <div className="add-cart"> */ }
{/* <Button
                                            variant="outlined"
                                            color="primary"
                                            padding="3px"
                                            size="none"
                                            borderColor="primary.light"
                                            onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
                                        >
                                            <Icon variant="small">Buy</Icon>
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            padding="3px"
                                            size="none"
                                            borderColor="primary.light"
                                            onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
                                        >
                                            <Icon variant="small">Borrow</Icon>
                                        </Button> */}

{/* {!!cartItem?.qty && (
                                            <Fragment>
                                                <SemiSpan color="text.primary" fontWeight="600">
                                                    {cartItem?.qty}
                                                </SemiSpan>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    padding="3px"
                                                    size="none"
                                                    borderColor="primary.light"
                                                    onClick={handleCartAmountChange(cartItem?.qty - 1)}
                                                >
                                                    <Icon variant="small">minus</Icon>
                                                </Button>
                                            </Fragment>
                                        )} */}
{/* </FlexBox> */ }