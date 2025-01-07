interface ITopbarProps {
  isVisible: boolean;
}

function Topbar({ isVisible }: ITopbarProps) {
  return (
    <div className="col-span-full bg-red-300">
      <div
        className="items-center justify-between"
        id="email-editor-topbar"
        style={{
          width: "100%",
          position: "static",
          border: "none",
          display: isVisible ? "flex" : "none",
        }}
      >
        <div></div>
      </div>
    </div>
  );
}

export default Topbar;
