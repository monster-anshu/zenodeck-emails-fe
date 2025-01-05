import {} from "@grapesjs/react";
import React from "react";

interface ITopbarProps {
  isVisible: boolean;
}

function Topbar({ isVisible }: ITopbarProps) {
  return (
    <div className="col-span-full">
      <div
        className="items-center justify-between"
        id="email-editor-topbar"
        style={{
          width: "100%",
          position: "static",
          border: "none",
          display: isVisible ? "flex" : "none",
        }}
      ></div>
    </div>
  );
}

export default Topbar;
