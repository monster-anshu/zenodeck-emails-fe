import { TraitsResultProps } from "@grapesjs/react";
import TraitPropertyField from "./TraitPropertyField";

export default function TraitManager({
  traits,
}: Omit<TraitsResultProps, "Container">) {
  return (
    <div className="mt-2 p-1 text-left">
      {!traits.length ? (
        <div>No properties available</div>
      ) : (
        traits.map((trait) => (
          <TraitPropertyField key={trait.getId()} trait={trait} />
        ))
      )}
    </div>
  );
}
