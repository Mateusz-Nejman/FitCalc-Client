const productsReducer = (state = [], action) => {
  if (action.type === "ADD_PRODUCT") {
    const newState = [
      ...state,
      [
        action.name.replace("&quot;","\"").replace("&quot;","\""),
        parseFloat(action.protein),
        parseFloat(action.carbo),
        parseFloat(action.fat),
        parseFloat(action.portion),
        parseFloat(action.protein * 4.0)+(parseFloat(action.carbo) * 4.0)+(parseFloat(action.fat) * 9.0),
        action.hash
      ]
    ];

    if (action.localSave)
      localStorage.setItem("products", JSON.stringify(newState));

    return newState;
  } else if(action.type == "ADD_PRODUCTS") {

    localStorage.setItem("products", JSON.stringify(state));
      

    return state;
  } else if (action.type === "ADD_PRODUCT_ID") {
    const newState = [...state, action.product];

    return newState;
  } else return state;
};

export default productsReducer;
