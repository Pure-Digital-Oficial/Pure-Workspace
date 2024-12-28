import { FC, ReactNode, useState } from 'react';
import { FileModalContext } from './file-modal-context';

export const FileModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [directoryId, setDirectoryId] = useState<string | undefined>(undefined);
  const [closed, setClosed] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setClosed(false);
  };
  const handleClose = () => {
    setOpen(false);
    setClosed(true);
  };

  return (
    <FileModalContext.Provider
      value={{
        open,
        handleOpen,
        handleClose,
        setDirectoryId,
        directoryId,
        closed,
      }}
    >
      {children}
    </FileModalContext.Provider>
  );
};
