import { createContext } from 'react';

interface FileModalContextProps {
  open: boolean;
  closed: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  directoryId?: string;
  setDirectoryId: (directoryId: string) => void;
}

export const FileModalContext = createContext<
  FileModalContextProps | undefined
>(undefined);
