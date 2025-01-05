import type { BlockProperties, Editor } from "grapesjs";
import { ReactNode } from "react";
import {
  BUTTON,
  DIVIDER,
  GRID_ITEMS,
  LIST_ITEM,
  QUOTE,
  SECTION_100,
  SECTION_30,
  SECTION_37,
  SECTION_50,
  SECTION_73,
  TEXT_SECTION,
} from "./components";
import {
  BUTTON_ICON,
  DIVIDER_ICON,
  GRID_ITEMS_ICON,
  IMAGE_ICON,
  LINK_BLOCK_ICON,
  LINK_ICON,
  LIST_ITEMS_ICON,
  QUOTE_ICON,
  SECTION_100_ICON,
  SECTION_30_ICON,
  SECTION_37_ICON,
  SECTION_50_ICON,
  SECTION_73_ICON,
  TEXT_ICON,
  TEXT_SECTION_ICON,
} from "./icons";
import { PluginOptions } from "./types";

export default function loadBlocks(
  editor: Editor,
  opts: Required<PluginOptions>
) {
  const addBlock = (
    id: string,
    blockDef: Omit<BlockProperties, "media"> & { media: ReactNode }
  ) => {
    if (opts.blocks.indexOf(id)! >= 0) {
      editor.Blocks.add(id, {
        select: true,
        ...(blockDef as BlockProperties),
        ...(opts.block(id) as object),
      });
    }
  };

  addBlock("sect100", {
    label: "1 Section",
    media: SECTION_100_ICON,
    content: SECTION_100,
  });

  addBlock("sect50", {
    label: "1/2 Section",
    media: SECTION_50_ICON,
    content: SECTION_50,
  });

  addBlock("sect30", {
    label: "1/3 Section",
    media: SECTION_30_ICON,
    content: SECTION_30,
  });

  addBlock("sect37", {
    label: "3/7 Section",
    media: SECTION_37_ICON,
    content: SECTION_37,
  });

  addBlock("sect73", {
    label: "7/3 Section",
    media: SECTION_73_ICON,
    content: SECTION_73,
  });

  addBlock("button", {
    label: "Button",
    media: BUTTON_ICON,
    content: BUTTON,
  });

  addBlock("divider", {
    label: "Divider",
    media: DIVIDER_ICON,
    content: DIVIDER,
  });

  addBlock("text", {
    label: "Text",
    media: TEXT_ICON,
    activate: true,
    content: {
      type: "text",
      content: "Insert your text here",
      style: { padding: "10px" },
    },
  });

  addBlock("text-sect", {
    label: "Text Section",
    media: TEXT_SECTION_ICON,
    content: TEXT_SECTION,
  });

  addBlock("image", {
    label: "Image",
    media: IMAGE_ICON,
    activate: true,
    content: {
      type: "image",
      style: { color: "black" },
    },
  });

  addBlock("quote", {
    label: "Quote",
    media: QUOTE_ICON,
    content: QUOTE,
  });

  addBlock("link", {
    label: "Link",
    media: LINK_ICON,
    content: {
      type: "link",
      content: "Link",
      style: { color: "#3b97e3" },
    },
  });

  addBlock("link-block", {
    label: "Link Block",
    media: LINK_BLOCK_ICON,
    content: {
      type: "link",
      editable: false,
      droppable: true,
      style: {
        display: "inline-block",
        padding: "5px",
        "min-height": "50px",
        "min-width": "50px",
      },
    },
  });

  addBlock("grid-items", {
    label: "Grid Items",
    media: GRID_ITEMS_ICON,
    content: GRID_ITEMS,
  });

  addBlock("list-items", {
    label: "List Items",
    media: LIST_ITEMS_ICON,
    content: [LIST_ITEM, LIST_ITEM],
  });
}
