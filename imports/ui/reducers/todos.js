const initialState = {
  tasks: []
};

function todos(state = initialState, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        tasks: [...action.payload]
      };
    default:
      return state
  }
}

export default todos