import React from 'react';

const SideBar = (props) => {
  const { className } = props;
  return (
    <main className={className}>
      <h1>
        Main
      </h1>
      <div>
        Messages
      </div>
    </main>
  );
};

export default SideBar;
