import { COMMAND, COMMAND_CONTEXT } from './WrapCommand';

export const WrapReducer = (state, action) => {
  switch (action.type) {
    case COMMAND_CONTEXT.SET_HABIT:
      return { ...state, habit: action.payload };
    case COMMAND_CONTEXT.SET_BMI:
      return { ...state, bmi: action.payload };
    case COMMAND_CONTEXT.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
