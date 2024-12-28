import { useContext } from 'react';
import { FileModalContext } from './file-modal-context';

export const useFileModal = () => {
  const context = useContext(FileModalContext);
  if (context === undefined) {
    throw new Error('useFileModal must be used within a FileModalProvider');
  }

  return context;
};
