import { TraitsResultProps } from "@grapesjs/react";
import TraitPropertyField from "./TraitPropertyField";

export default function TraitManager({
  traits,
}: Omit<TraitsResultProps, "Container">) {
  return (
    <div className="mt-2 px-2 text-left">
      {!traits.length ? (
        <div className="text-sm"> No properties available</div>
      ) : (
        traits.map((trait) => (
          <TraitPropertyField key={trait.getId()} trait={trait} />
        ))
      )}
    </div>
  );
}
