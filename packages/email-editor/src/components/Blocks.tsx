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
                  className="hover:bg-primary/20 flex aspect-square h-full w-20 flex-col rounded-lg border p-2 text-center"
                  key={block.id || i}
                  onDragStart={(ev) => dragStart(block, ev.nativeEvent)}
                  onDragEnd={() => dragStop(false)}
                  draggable
                >
                  <div
                    className="w-full flex-1 p-1"
                    dangerouslySetInnerHTML={{
                      __html: block.attributes.media || "",
                    }}
                  ></div>
                  <p className="text-xs">{block.attributes.label}</p>
                </div>
              );
            })}
          </div>
        );
      }}
    </BlocksProvider>
  );
}
