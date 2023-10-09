import React, { Suspense } from "react";

const withSuppense = <T extends object>(Component: React.FC<T>) => {
  const WithSomething: React.FC<T> = (props) => {
    return (
      <Suspense>
        <Component {...props} />
      </Suspense>
    );
  };
  return WithSomething;
};

export default withSuppense;
