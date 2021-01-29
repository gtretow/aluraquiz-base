/* eslint-disable quotes */
import { useRouter } from "next/router";
import React from "react";

const User = () => {
  const {
    query: { name },
  } = useRouter();
  return <span>{name}</span>;
};

export default User;
