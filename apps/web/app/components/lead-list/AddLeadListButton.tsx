import { Button } from "@repo/ui/components/button";
import React, { FC, useState } from "react";
import AddEditLeadListModal from "./AddEditLeadList";

type IAddLeadListButtonProps = {};

const AddLeadListButton: FC<IAddLeadListButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>+ Add</Button>
      {isOpen ? (
        <AddEditLeadListModal onClose={() => setIsOpen(false)} />
      ) : null}
    </>
  );
};

export default AddLeadListButton;
