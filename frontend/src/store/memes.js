const SET_LEO = 'memes/leo';
const SET_GIIIRRRL = 'memes/giiirrrl';
const SET_MONGOOSE = 'memes/mongoose';
const SET_CAPY = 'memes/capy';
const RESET_MEMES = 'memes/reset';

export const setLeo = (toggle) => ({
  type: SET_LEO,
  toggle
})

export const setGiiirrrl = (toggle) => ({
  type: SET_GIIIRRRL,
  toggle
})

export const setMongoose = (toggle) => ({
  type: SET_MONGOOSE,
  toggle
})

export const setCapy = (toggle) => ({
  type: SET_CAPY,
  toggle
})

export const resetMemes = () => ({
  type: RESET_MEMES
})

export const getMemes = state => {
  return state.memes;
}

const initialState = {
  keleo: false,
  giiirrrl: false,
  mongoose: false,
  ssjCapy: false
}

const memesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_MEMES:
      return initialState
    case SET_LEO:
      return {...state, keleo: action.toggle}
    case SET_GIIIRRRL:
      return {...state, giiirrrl: action.toggle}
    case SET_MONGOOSE:
      return {...state, mongoose: action.toggle}
    case SET_CAPY:
      return {...state, ssjCapy: action.toggle}
    default:
      return state;
  }
}

export default memesReducer;