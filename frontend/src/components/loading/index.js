import React from "react";
import ReactLoading from "react-loading";

import { Container } from "./styles.js";

const Loading = ({ width, height, color }) => (
  <Container>
    <ReactLoading
      width={width}
      height={height}
      color={color}
      type={"spinningBubbles"}
    ></ReactLoading>
  </Container>
);

export default Loading;
