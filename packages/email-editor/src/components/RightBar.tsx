import {
  SelectorsProvider,
  StylesProvider,
  TraitsProvider,
  useEditorMaybe,
} from "@grapesjs/react";
import { Button } from "@repo/ui/components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { normalize } from "@repo/ui/lib/normalize";
import { EventHandler } from "grapesjs";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { LuBlocks, LuLayers, LuPencil, LuSettings2 } from "react-icons/lu";
import {
  activatePreview,
  openBlocks,
  openLayers,
  openStyleManager,
  openTraits,
} from "../email-editor-plugin/consts";
import Blocks from "./Blocks";
import TraitManager from "./TraitManager";

type IRightBarProps = {
  isPreview: boolean;
};

export type Tab = "BLOCKS" | "STYLES" | "LAYERS" | "TRAITS";
type TabItem = {
  label: string;
  icon: ReactNode;
  active: Tab;
} & (
  | {
      command: string;
    }
  | {
      tab: Tab;
    }
);

const tabs: TabItem[] = [
  {
    label: "Blocks",
    icon: <LuBlocks />,
    tab: "BLOCKS",
    active: "BLOCKS",
  },
  {
    label: "Styles",
    icon: <LuPencil />,
    tab: "STYLES",
    active: "STYLES",
  },
  {
    label: "Layers",
    icon: <LuLayers />,
    command: openLayers,
    active: "LAYERS",
  },
  {
    label: "Settings",
    icon: <LuSettings2 />,
    tab: "TRAITS",
    active: "TRAITS",
  },
] as const;

const tabRecord = normalize(tabs, "active");

const RightBar: FC<IRightBarProps> = ({}) => {
  const editor = useEditorMaybe();
  const [activeView, setActiveView] = useState<Tab>("BLOCKS");
  const lastActiveCommand = useRef(null as null | string);
  const [isPreview, setIsPreview] = useState(false);

  const handleTabClick = (tabItem: TabItem) => {
    let command, tab;

    if ("tab" in tabItem) {
      tab = tabItem.tab;
    } else {
      command = tabItem.command;
    }

    if (
      lastActiveCommand.current &&
      (!command || lastActiveCommand.current !== command)
    ) {
      editor?.Commands.stop(lastActiveCommand.current);
    }

    if (command) {
      editor?.Commands.run(command);
    }

    if (tab) {
      setActiveView(tab);
    }
  };

  useEffect(() => {
    if (!editor) return;

    const record = {
      [openStyleManager]: "STYLES",
      [openBlocks]: "BLOCKS",
      [openLayers]: "LAYERS",
      [openTraits]: "TRAITS",
    } as Record<string, typeof activeView>;

    const runHandler: EventHandler = (event) => {
      const active = record[event];
      setIsPreview((curr) => (!curr ? event === activatePreview : curr));
      if (!active) return;
      setActiveView(active);
      lastActiveCommand.current = event;
    };

    const stopHandler: EventHandler = (event) => {
      const active = record[event];
      setIsPreview((curr) => (event === activatePreview ? false : curr));
      if (!active) return;
      //   setActiveView((curr) => (curr === active ? null : curr));
      //   if (active === lastActiveCommand.current) {
      //     lastActiveCommand.current = null;
      //   }
    };

    editor.on("run", runHandler);
    editor.on("stop", stopHandler);
    return () => {
      editor.off("run", runHandler);
      editor.off("stop", stopHandler);
    };
  }, [!!editor]);

  return (
    <>
      {isPreview && <div className="row-span-2"></div>}
      <div
        className="bg-background relative row-span-2 w-80 overflow-auto rounded"
        style={{
          display: isPreview || !editor ? "none" : "block",
        }}
      >
        <Tabs
          value={activeView}
          onValueChange={(value) => {
            const tab = tabRecord[value];
            if (!tab) return;
            handleTabClick(tab);
          }}
          className="bg-background sticky top-0 z-50 my-2 px-2"
        >
          <TabsList
            className="grid w-full"
            style={{
              gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
            }}
          >
            {tabs.map((tab) => {
              // const isActive = tab.active === activeView;
              return (
                <TabsTrigger
                  key={tab.active}
                  aria-label={tab.label}
                  title={tab.label}
                  value={tab.active}
                  className="text-sm"
                >
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div>
          {activeView === "BLOCKS" && <Blocks isVisible={true} />}
          <div
            id="custom-selector-manager"
            style={{
              display: activeView === "STYLES" ? "block" : "none",
            }}
          ></div>
          <div
            id="custom-style-manager"
            style={{
              display: activeView === "STYLES" ? "block" : "none",
            }}
          ></div>
          {activeView === "STYLES" && (
            <>
              {/* <SelectorsProvider>
                {(props) => <SelectorManager {...props} />}
              </SelectorsProvider> */}
              {/* <StylesProvider>
                {(props) => <StyleManager {...props} />}
              </StylesProvider> */}
            </>
          )}
          <div
            id="custom-layer-manager"
            className="bg-gray-500"
            style={{
              display: activeView === "LAYERS" ? "block" : "none",
            }}
          ></div>
          {activeView === "TRAITS" && (
            <TraitsProvider>
              {(props) => {
                return <TraitManager {...props} />;
              }}
            </TraitsProvider>
          )}
          <div id="custom-page-manager"></div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
