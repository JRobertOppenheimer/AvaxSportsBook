import Styled from 'styled-components'
import { Ggg, cblack } from './Colors'
import { Radius } from './Style'

export default Styled.button1`
        border: none;
        border-radius: ${Radius};
        font-size: ${({ size }) => size ? size : "14px"};
        padding: 6px 14px;
        outline: none;
        margin-right: ${({ margin }) => margin};
        font-weight: ${({ weight }) => weight ? weight : "normal"};
        width: ${({ width }) => width ? width : "auto"};
        cursor: pointer;
        border-style:outset;
        border-color: yellow; 
        color: yellow;
        background-color: black;
        

    `
    