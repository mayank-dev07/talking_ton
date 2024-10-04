import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="fixed w-full top-0 right-0 flex justify-between items-center z-50 text-black p-8">
      <h1>Talking Ton</h1>
      <button>connect wallet</button>
    </div>
  );
};

export default Header;
