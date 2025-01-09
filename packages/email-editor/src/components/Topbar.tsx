import { useEditor } from "@grapesjs/react";
import { Button } from "@repo/ui/components/button";
import { ReactNode, useEffect, useState } from "react";
import {
  LuCodeXml,
  LuEraser,
  LuEye,
  LuFileDown,
  LuFullscreen,
  LuRedo2,
  LuScan,
  LuUndo2,
} from "react-icons/lu";
import {
  activateFullscreen,
  activateOutline,
  activatePreview,
  cmdClear,
  cmdOpenImport,
  openBlocks,
  openExport,
  openLayers,
  openStyleManager,
  openTraits,
} from "../email-editor-plugin/consts";

interface ITopbarProps {
  isVisible: boolean;
}

const iconStyle = 'style="display: block; max-width: 22px"';

const panel2 = [
  {
    id: openStyleManager,
    command: openStyleManager,
    label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
        </svg>`,
  },
  {
    id: openTraits,
    command: openTraits,
    label: `<svg ${iconStyle} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </svg>`,
  },
  {
    id: openLayers,
    command: openLayers,
    label: `<svg ${iconStyle} viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
      </svg>`,
  },
  {
    id: openBlocks,
    command: openBlocks,
    label: `<svg ${iconStyle} viewBox="0 0 24 24">
          <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
      </svg>`,
  },
];

interface CommandButton {
  id: string;
  icon: ReactNode;
  options?: Record<string, any>;
  disabled?: () => boolean;
}

function Topbar({ isVisible }: ITopbarProps) {
  const editor = useEditor();
  const { Commands } = editor;
  const [, setUpdateCounter] = useState(0);

  const cmdButtons: CommandButton[] = [
    {
      id: activateOutline,
      icon: <LuScan />,
    },
    {
      id: activatePreview,
      icon: <LuEye />,
    },
    {
      id: activateFullscreen,
      icon: <LuFullscreen />,
    },
    {
      id: openExport,
      icon: <LuCodeXml />,
    },
    {
      id: cmdOpenImport,
      icon: <LuFileDown />,
    },
    {
      id: "core:undo",
      icon: <LuUndo2 />,
    },
    {
      id: "core:redo",
      icon: <LuRedo2 />,
    },
    {
      id: cmdClear,
      icon: <LuEraser />,
    },
  ];

  useEffect(() => {
    const cmdEvent = "run stop";
    const updateEvent = "update";
    const updateCounter = () => setUpdateCounter((value) => value + 1);
    const onCommand = (id: string) => {
      if (cmdButtons.find((btn) => btn.id === id)) {
        updateCounter();
      }
    };
    editor.on(cmdEvent, onCommand);
    editor.on(updateEvent, updateCounter);

    return () => {
      editor.off(cmdEvent, onCommand);
      editor.off(updateEvent, updateCounter);
    };
  }, []);

  // if (!isVisible) {
  //   return null;
  // }

  return (
    <div className="bg-background col-span-1 rounded px-2 py-2">
      <div className="ml-auto w-fit space-x-1">
        {cmdButtons.map((item) => {
          const { icon, id, options, disabled } = item;
          return (
            <Button
              key={item.id}
              onClick={() =>
                Commands.isActive(id)
                  ? Commands.stop(id)
                  : Commands.run(id, options)
              }
              disabled={disabled?.()}
            >
              {icon}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default Topbar;
