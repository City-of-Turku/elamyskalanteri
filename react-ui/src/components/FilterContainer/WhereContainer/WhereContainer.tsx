import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalitiesQuery } from '../../../redux/services/localityApi';
import Accordion from '../../Accordion/Accordion';
import LocationContainer from '../LocationContainer/LocationContainer';
import PlaceLocalityContainer from '../PlaceLocalityContainer/PlaceLocalityContainer';

const WhereContainer = () => {
  const { t } = useTranslation();
  const { data: localities, isLoading, isFetching, isError, isSuccess } = useLocalitiesQuery();

  return (
    <div>
      <Accordion title={`${t('where')}?`} icon={LocationOnIcon}>
        <Typography variant="h3">{t('near')}</Typography>
        <LocationContainer />
        <Typography variant="h3" sx={{ marginTop: 2, marginBottom: 1 }}>
          {t('placeLocality')}
        </Typography>
        <PlaceLocalityContainer
          localities={localities?.data}
          isLoading={isLoading || isFetching}
          isError={isError}
          isSuccess={isSuccess}
        />
      </Accordion>
    </div>
  );
};

export default WhereContainer;
