import { DevicesProvider, useEditor } from "@grapesjs/react";
import { Button } from "@repo/ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { ReactNode, useEffect, useState } from "react";
import {
  LuCodeXml,
  LuEraser,
  LuEye,
  LuFileDown,
  LuFullscreen,
  LuRedo2,
  LuSquareDashedMousePointer,
  LuUndo2,
} from "react-icons/lu";
import {
  activateFullscreen,
  activateOutline,
  activatePreview,
  cmdClear,
  cmdOpenImport,
  openExport,
} from "../email-editor-plugin/consts";

interface ITopbarProps {
  isPreview: boolean;
}

interface CommandButton {
  id: string;
  icon: ReactNode;
  options?: Record<string, any>;
  disabled?: () => boolean;
}

function Topbar({ isPreview }: ITopbarProps) {
  const editor = useEditor();
  const { Commands } = editor;
  const [, setUpdateCounter] = useState(0);

  const cmdButtons: CommandButton[] = [
    {
      id: activateOutline,
      icon: <LuSquareDashedMousePointer />,
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

  if (isPreview) {
    return <div className="col-span-1"></div>;
  }

  return (
    <div className="bg-muted col-span-1 flex border px-2 py-2">
      <div className="w-44">
        <DevicesProvider>
          {({ selected, select, devices }) => (
            <Select onValueChange={(value) => select(value)} value={selected}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {devices.map((option) => (
                  <SelectItem key={option.id} value={option.id as string}>
                    {option.getName()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </DevicesProvider>
      </div>

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
              variant={"outline"}
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
