import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { FC } from 'react';
import { IconMenuItem } from '@pure-workspace/domain';
import { SimpleCardItem } from '../../../card';

interface ListContentFilesProps {
  fileImage: string;
  name: string;
  fileImageName: string;
  deleteFile: () => Promise<void>;
  downloadFile: () => Promise<void>;
  detailsFile: () => Promise<void>;
  moveFile: () => Promise<void>;
}

export const ContentFileCard: FC<ListContentFilesProps> = ({
  fileImage,
  name,
  fileImageName,
  deleteFile,
  downloadFile,
  detailsFile,
  moveFile,
}) => {
  const iconMenuList: IconMenuItem[] = [
    {
      icon: <InfoIcon />,
      title: 'Detalhes',
      handleClick: detailsFile,
    },
    {
      icon: <DeleteIcon />,
      title: 'Deletar',
      handleClick: deleteFile,
    },
    {
      icon: <DownloadIcon />,
      title: 'Download',
      handleClick: downloadFile,
    },
    {
      icon: <DriveFileMoveIcon />,
      title: 'Mover para',
      handleClick: moveFile,
    },
  ];

  return (
    <SimpleCardItem
      iconMenuList={iconMenuList}
      imageData={{
        image: fileImage,
        imageName: fileImageName,
      }}
      name={name}
    />
  );
};
