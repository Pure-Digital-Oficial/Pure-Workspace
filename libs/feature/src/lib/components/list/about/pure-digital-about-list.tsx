import { Box, useMediaQuery, useTheme } from '@mui/material';
import { PureDigitalAboutItem } from '../item';
import { FC } from 'react';
import { IconTextProps } from '../../../shared';

interface PureDigitalAbouListProps {
  backgroundRight: string;
  width: string;
  aboutList: IconTextProps[];
  borderTopLeftRadius: string;
  paddingTop?: string;
  paddingLeft?: string;
  paddingBottom?: string;
  justifyContent?: string;
  alignItems?: string;
  height?: string;
  marginLeft?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  dividerColor?: string;
}

export const PureDigitalAbouList: FC<PureDigitalAbouListProps> = ({
  backgroundRight,
  aboutList,
  width,
  borderTopLeftRadius,
  paddingTop,
  paddingLeft,
  paddingBottom,
  justifyContent,
  alignItems,
  marginLeft,
  height,
  marginTop,
  marginRight,
  dividerColor,
}) => {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Box
      sx={{
        mt: marginTop,
        mr: marginRight,
        width: width,
        background: backgroundRight,
        paddingTop: paddingTop,
        paddingLeft: paddingLeft,
        paddingBottom: paddingBottom,
        alignContent: lgDown ? 'center' : '',
        borderTopLeftRadius: borderTopLeftRadius,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: justifyContent,
          alignItems: alignItems,
          height: height,
          ml: marginLeft,
        }}
      >
        <Box>
          {aboutList.length > 0 &&
            aboutList.map((about) => (
              <PureDigitalAboutItem
                key={about.title}
                about={about}
                dividerColor={dividerColor}
              />
            ))}
        </Box>
      </Box>
    </Box>
  );
};
