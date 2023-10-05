"use client";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    console.log("HomePage client side");
    const fetchData = async function () {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, []);

  return (
    <div>
      HomePage Okeeeeeeee
      <div>
        {data.map((item, i) => (
          <div style={{border: 'solid 1px lightgray'}} key={i}>{item.title}</div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
