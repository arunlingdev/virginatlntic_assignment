const initialState = {
  loader: 0,
  holidays: [],
};

const SET_LOADER = 'SET_LOADER';

const GET_HOLIDAYS = 'GET_HOLIDAYS';
const SET_HOLIDAYS = 'SET_HOLIDAYS';


export const actions = {
  setLoader: (open) => ({ type: SET_LOADER, payload: open }),
  setHolidays: (open) => ({ type: SET_HOLIDAYS, payload: open }),

  getHolidays: (open) => ({ type: GET_HOLIDAYS, payload: open }),
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADER:
      return { ...state, loader: payload };
 
    case SET_HOLIDAYS:
      return { ...state, holidays: payload };

    case GET_HOLIDAYS:
      return { ...state };
    default:
      return state;
  }
};
