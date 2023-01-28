const initialState = {
  countProduct: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT": {
      localStorage.setItem("qty", JSON.stringify(action.payload.countProduct));
      return action.payload;
    }
    default:
      return state;
  }
};
export default cartReducer;
