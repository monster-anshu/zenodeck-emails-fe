import { ModalProvider } from "@grapesjs/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { FC } from "react";

type IModalProps = {};

const Modal: FC<IModalProps> = () => {
  return (
    <ModalProvider>
      {({ open, title, content, close }) => {
        return (
          <Dialog
            open={open}
            onOpenChange={(open) => {
              if (!open) close();
            }}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <div>{content}</div>
            </DialogContent>
          </Dialog>
        );
      }}
    </ModalProvider>
  );
};

export default Modal;
