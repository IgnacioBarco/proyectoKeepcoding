import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginator = () => {
  return (
    <Pagination size="lg">
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};
export default Paginator;
