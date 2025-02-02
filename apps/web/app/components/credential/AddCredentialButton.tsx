import { Button } from "@repo/ui/components/button";
import { FC, useState } from "react";
import AddEditCredentialModal from "./AddEditCredentialModal";

type IAddCredentialButtonProps = {};

const AddCredentialButton: FC<IAddCredentialButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>+ Add</Button>
      {isOpen ? (
        <AddEditCredentialModal onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
};

export default AddCredentialButton;
