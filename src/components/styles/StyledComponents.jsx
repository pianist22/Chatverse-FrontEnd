import { keyframes, Skeleton, styled } from "@mui/material";
import {Link as LinkComponent} from 'react-router-dom';
import { greyColor, matBlack } from "../../constants/colors";

export const  VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
});

export const Link = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding:1rem;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;

export const InputBox = styled("input")`
  width:100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 2.0rem;
  background-color: ${greyColor};
`;

export const SearchField = styled("input")`
    padding: 1rem 2rem;
    width: 20vmax;
    border: none;
    border-radius: 1.5rem;
    outline:none;
    background-color: ${greyColor};
    font-size: 1.1rem;
`;

export const CurveButton = styled("button")`

    padding: 1rem 2rem;
    border-radius: 1.5rem;
    border: none;
    cursor: pointer;
    background-color: ${matBlack};
    color: white;
    font-size: 1.1rem;
    &:hover{
        background-color: rgba(0,0,0,0.8);
    }
`;

const BouncingAnimation = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.5); }
100% { transform: scale(1); }
`;

export const BouncingSkeleton = styled(Skeleton)(()=>({
    animation: `${BouncingAnimation} 1s infinite`,
}));
