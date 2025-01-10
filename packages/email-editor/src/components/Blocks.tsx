import { BlocksProvider } from "@grapesjs/react";

interface IBlocksProps {
  isVisible: boolean;
}

export default function Blocks({ isVisible }: IBlocksProps) {
  return (
    <BlocksProvider>
      {({ blocks, dragStart, dragStop }) => {
        return (
          <div
            className="grid grid-cols-3 gap-2 p-2"
            style={{
              gridAutoRows: "min-content",
              display: isVisible ? "grid" : "none",
            }}
          >
            {blocks.map((block, i) => {
              return (
                <div
                  className="hover:bg-secondary rounded-lg border p-2"
                  key={block.id || i}
                  onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                  onDragEnd={() => dragStop(false)}
                  draggable
                >
                  <div
                    className="mx-auto h-10 w-10 flex-1 p-1"
                    dangerouslySetInnerHTML={{
                      __html: block.attributes.media || "",
                    }}
                  ></div>
                  <p className="text-xxs text-center">
                    {block.attributes.label}
                  </p>
                </div>
              );
            })}
          </div>
        );
      }}
    </BlocksProvider>
  );
}
