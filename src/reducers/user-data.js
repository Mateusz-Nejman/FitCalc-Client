const userDataReducer = (
  state = {
    bmr: {
      age: 21,
      mass: 75,
      height: 175,
      target: 0,
      activity: 1.2,
      gender: 5
    },
    history: [],
    today: {
      protein: 0,
      carbo: 0,
      fat: 0,
      date: ""
    },
    progress: []
  },
  action
) => {
  if (action.type === "SET_BMR") {
    const newState = {
      ...state,
      bmr: action.bmr
    };

    if (action.localSave)
      localStorage.setItem("user_data", JSON.stringify(newState));

    return newState;
  } else if (action.type === "ADD_PROGRESS") {
    const newState = {
      ...state,
      progress: [...state.progress, [action.date, action.mass]]
    };

    if (action.localSave)
      localStorage.setItem("user_data", JSON.stringify(newState));

    return newState;
  } else if (action.type === "ADD_HISTORY") {
    const newState = {
      ...state,
      history: [...state.history, [action.date, action.kcal]]
    };

    console.log(newState);

    if (action.localSave)
      localStorage.setItem("user_data", JSON.stringify(newState));

    return newState;
  } else if (action.type === "SET_TODAY") {
    const newState = {
      ...state,
      today: {
        protein: action.protein,
        carbo: action.carbo,
        fat: action.fat,
        date: action.date
      }
    };

    if (action.localSave)
      localStorage.setItem("user_data", JSON.stringify(newState));

    return newState;
  } else if (action.type === "ADD_TODAY") {
    const newState = {
      ...state,
      today: {
        ...state.today,
        protein: state.today.protein + action.protein,
        carbo: state.today.carbo + action.carbo,
        fat: state.today.fat + action.fat
      }
    };
    localStorage.setItem("user_data", JSON.stringify(newState));

    return newState;
  } else if (action.type === "INIT") {
    localStorage.setItem("user_data", JSON.stringify(state));
    return state;
  } else return state;
};

export default userDataReducer;
