"use client";

import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    console.log("HomePage client side");
  }, []);

  return <div>HomePage Okeeeeeeee</div>;
};

export default HomePage;
