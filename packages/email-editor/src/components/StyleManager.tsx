import { StylesResultProps } from "@grapesjs/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";
import StylePropertyField from "./StylePropertyField";

export default function StyleManager({
  sectors,
}: Omit<StylesResultProps, "Container">) {
  return (
    <div className="text-left">
      <Accordion type="multiple">
        {sectors.map((sector) => (
          <AccordionItem key={sector.getId()} value={sector.getId()}>
            <AccordionTrigger className="px-2">
              {sector.getName()}
            </AccordionTrigger>
            <AccordionContent className={`flex flex-wrap gap-y-2`}>
              {sector.getProperties().map((prop) => (
                <StylePropertyField key={prop.getId()} prop={prop} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
