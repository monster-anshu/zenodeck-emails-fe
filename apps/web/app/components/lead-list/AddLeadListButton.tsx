import { Button } from "@repo/ui/components/button";
import React, { FC, useState } from "react";
import AddLeadListModal from "./AddLeadList";

type IAddLeadListButtonProps = {};

const AddLeadListButton: FC<IAddLeadListButtonProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>+ Add</Button>
      {isOpen ? <AddLeadListModal onClose={() => setIsOpen(false)} /> : null}
    </>
  );
};

export default AddLeadListButton;
