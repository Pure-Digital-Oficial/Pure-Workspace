import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import InfoIcon from '@mui/icons-material/Info';
import { FC } from 'react';
import { IconMenuItem } from '@pure-workspace/domain';
import { SimpleCardItem } from '../../../card';
import { useAppThemeContext } from 'libs/feature/src/lib/contexts';

interface DeviceCardProps {
  name: string;
  editTitle?: string;
  deleteTitle?: string;
  detailsTitle?: string;
  addSchedulesToDeviceTitle?: string;
  deleteDevice: () => Promise<void>;
  editDevice: () => Promise<void>;
  addSchedulesToDevice: () => Promise<void>;
  detailsDevice: () => Promise<void>;
}

export const DeviceCard: FC<DeviceCardProps> = ({
  name,
  deleteDevice,
  editDevice,
  addSchedulesToDevice,
  detailsDevice,
  editTitle = 'Editar',
  deleteTitle = 'Deletar',
  detailsTitle = 'Detalhes',
  addSchedulesToDeviceTitle = 'Adicionar Agendamentos',
}) => {
  const { themeName } = useAppThemeContext();
  const iconMenuList: IconMenuItem[] = [
    {
      icon: <DeleteIcon />,
      title: deleteTitle,
      handleClick: deleteDevice,
    },
    {
      icon: <EditIcon />,
      title: editTitle,
      handleClick: editDevice,
    },
    {
      icon: <InfoIcon />,
      title: detailsTitle,
      handleClick: detailsDevice,
    },
    {
      icon: <AddToQueueIcon />,
      title: addSchedulesToDeviceTitle,
      handleClick: addSchedulesToDevice,
    },
  ];

  return (
    <SimpleCardItem
      iconMenuList={iconMenuList}
      imageData={{
        image:
          themeName == 'dark'
            ? '/assets/images/Pure_Device_White.svg'
            : '/assets/images/Pure_Device_Black.svg',
        imageName: 'device',
      }}
      name={name}
    />
  );
};
