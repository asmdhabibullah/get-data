const CHANGE_CART_AMOUNT = "CHANGE_CART_AMOUNT";

export const cartInitialState = {
  cartList: [
    {
      price: 230,
      name: "Unlocking Android",
      imgUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
      id: "1",
      qty: 1,
    },
    {
      price: 230,
      name: "Flex on Java",
      imgUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/allmon.jpg",
      id: "38553442244076086",
      qty: 1,
    },
    {
      price: 230,
      name: "Team Foundation Server 2008 in Action",
      imgUrl:
        "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/azher.jpg",
      id: "9573201630529315",
      qty: 1,
    },
  ],
};

export type CartItem = {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
};

export type cartStateType = {
  cartList: CartItem[];
};

export type cartActionType = {
  type: typeof CHANGE_CART_AMOUNT;
  payload: CartItem;
};

export const cartReducer: React.Reducer<cartStateType, cartActionType> = (
  state: cartStateType,
  action: cartActionType
) => {
  switch (action.type) {
    case CHANGE_CART_AMOUNT:
      let cartList = state.cartList;
      let cartItem = action.payload;
      let exist = cartList.find((item) => item.id === cartItem.id);

      if (cartItem.qty < 1)
        return {
          cartList: cartList.filter((item) => item.id !== cartItem.id),
        };
      else if (exist)
        return {
          cartList: cartList.map((item) => {
            if (item.id === cartItem.id) return { ...item, qty: cartItem.qty };
            else return item;
          }),
        };
      else
        return {
          cartList: [...cartList, cartItem],
        };

    default: {
    }
  }
};
