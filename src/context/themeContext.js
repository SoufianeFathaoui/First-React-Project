import { createContext, useReducer } from "react";
const ThemeContext = createContext();
const initialData = { theme: localStorage.getItem("localTheme") === null ? "Light" : localStorage.getItem("localTheme") === "Light" ? "Light" : "Dark" };
const reducer = (firstState , action) => {
  switch (action.type) {
    case "CHANGE_NAME":
      return {...firstState , theme : action.newValue}
    default:
      return firstState;
  }
}
export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const changeName = (newName) => {
    dispatch({type : "CHANGE_NAME" , newValue : newName });
    localStorage.setItem("localTheme" , newName)
  }
  return (
    <ThemeContext.Provider value={{ ...firstState , changeName}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;