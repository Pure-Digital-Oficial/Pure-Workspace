import { Box, Chip, Typography, useTheme } from '@mui/material';
import { Scheduling } from '@pure-workspace/domain';
import { FC } from 'react';
import { formatBrDate } from '../../shared';

interface DetailsSchedulingCardProps {
  createByTitle: string;
  createAtTitle: string;
  startTimeTitle: string;
  endTimeTitle: string;
  loopingTitle: string;
  priorityTitle: string;
  schedulingDetails: Scheduling;
}

export const DetailsSchedulingCard: FC<DetailsSchedulingCardProps> = ({
  createByTitle,
  createAtTitle,
  startTimeTitle,
  endTimeTitle,
  loopingTitle,
  priorityTitle,
  schedulingDetails,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: theme.spacing(1),
      }}
    >
      <Typography variant="h5">
        <strong>{schedulingDetails.name}</strong>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: theme.spacing(1),
        }}
      >
        <Typography variant="body1">
          <strong>{createByTitle}</strong>
          {schedulingDetails.createBy}
        </Typography>
        <Typography variant="body1">
          <strong>{createAtTitle}</strong>
          {formatBrDate(new Date(schedulingDetails?.createdAt ?? new Date()))}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            marginTop: theme.spacing(1),
          }}
        >
          <Typography variant="body1">
            <strong>{startTimeTitle}</strong>
            {schedulingDetails.startTime}
          </Typography>
          <Typography marginLeft={theme.spacing(1)} variant="body1">
            <strong>{endTimeTitle}</strong>
            {schedulingDetails.endTime}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginTop: theme.spacing(1),
          }}
        >
          <strong>{loopingTitle}</strong>
          <Chip
            sx={{ marginLeft: theme.spacing(1) }}
            label={schedulingDetails.lopping === true ? 'Sim' : 'Não'}
            color={schedulingDetails.lopping === true ? 'success' : 'error'}
            variant="filled"
          />
          <Typography marginLeft={theme.spacing(1)} variant="body1">
            <strong>{priorityTitle}</strong>
            {schedulingDetails.priority}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
