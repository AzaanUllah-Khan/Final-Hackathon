import styled from "styled-components";
import React from "react"

const Balls = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .ball {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: #3699bf;
    margin: 0 6px 0 0;
    animation: oscillate 0.2s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.1s;
  }
  .two {
    animation-delay: 0.25s;
  }
  .three {
    animation-delay: 0.4s;
  }

  @keyframes oscillate {
    0% {
      opacity:1
    }
    50% {
        opacity:0.2
    }
    100% {
        opacity:1
    }
  }
`;

const LoadingScreen = () => {
    return (
        <Balls>
            <div className="ball one"></div>
            <div className="ball two"></div>
            <div className="ball three"></div>
        </Balls>
    );
};

export default LoadingScreen;