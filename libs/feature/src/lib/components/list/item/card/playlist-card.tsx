import {
  ErrorResponse,
  FindFilesByPlaylistDto,
  IconMenuItem,
  ImageCardItem,
} from '@pure-workspace/domain';
import EditIcon from '@mui/icons-material/Edit';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { FC, useCallback, useEffect, useState } from 'react';
import { FindFilesByPlaylistRequest } from '../../../../services';
import { useLoggedUser } from '../../../../contexts';
import { ValidationsError } from '../../../../shared';
import axios, { AxiosError } from 'axios';
import { SimpleCardItem } from '../../../card';

interface ListPlaylistProps {
  name: string;
  editTitle?: string;
  deleteTitle?: string;
  addFileTitle?: string;
  detailsTitle?: string;
  idPlaylist: string;
  editPlaylist: () => Promise<void>;
  deletePlaylist: () => Promise<void>;
  addFile: () => Promise<void>;
  detailsPlaylist: () => Promise<void>;
  showAlert: (message: string, success: boolean) => void;
}

export const PlaylistCard: FC<ListPlaylistProps> = ({
  name,
  editTitle = 'Editar',
  deleteTitle = 'Deletar',
  addFileTitle = 'Adicionar Arquivos',
  detailsTitle = 'Detalhes',
  idPlaylist,
  editPlaylist,
  deletePlaylist,
  addFile,
  detailsPlaylist,
  showAlert,
}) => {
  const { loggedUser } = useLoggedUser();
  const [imageData, setImageData] = useState<ImageCardItem>(
    {} as ImageCardItem
  );

  const iconMenuList: IconMenuItem[] = [
    {
      icon: <EditIcon />,
      title: editTitle,
      handleClick: editPlaylist,
    },
    {
      icon: <DeleteIcon />,
      title: deleteTitle,
      handleClick: deletePlaylist,
    },
    {
      icon: <InfoIcon />,
      title: detailsTitle,
      handleClick: detailsPlaylist,
    },
    {
      icon: <NoteAddIcon />,
      title: addFileTitle,
      handleClick: addFile,
    },
  ];

  const getImage = useCallback(
    async (input: FindFilesByPlaylistDto) => {
      try {
        const result = await FindFilesByPlaylistRequest({
          idPlaylist: input.idPlaylist,
          loggedUserId: input.loggedUserId,
        });

        if (result) {
          setImageData({
            image: result?.files[0]?.path,
            imageName: result?.files[0]?.originalName,
          });
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Imagem');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  useEffect(() => {
    getImage({
      idPlaylist,
      loggedUserId: loggedUser?.id ?? '',
    });
  }, [idPlaylist, loggedUser, getImage]);

  return (
    <SimpleCardItem
      iconMenuList={iconMenuList}
      imageData={{
        image: imageData.image ?? '',
        imageName: imageData.imageName,
      }}
      name={name}
    />
  );
};
