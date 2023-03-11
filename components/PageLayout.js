import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

const Root = styled.div``;
const PageBody = styled.div`
  position: relative;
`;
const Overlay = styled.div`
  background: black;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0.5;
  z-index: 99;
`;

const PageLayout = ({ children, footerDetails, categoryDetails }) => {
  const { user, isAuthenticated, loading, error, status } = useSelector(
    (state) => state.user
  );
  return <Root>{children}</Root>;
};

export default PageLayout;
