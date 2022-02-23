import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&family=Raleway:wght@100;200;300;400;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100&display=swap");

body{
    background-color : ${(props) => props.theme.back};
    font-family :Roboto;
    color : ${(props) => props.theme.col};
    
 

}

`;
