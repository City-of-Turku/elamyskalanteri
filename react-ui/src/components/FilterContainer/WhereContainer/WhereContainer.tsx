import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../../Accordion/Accordion';
import LocationContainer from '../LocationContainer/LocationContainer';

const WhereContainer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Accordion title={`${t('where')}?`} icon={LocationOnIcon}>
        <LocationContainer />
      </Accordion>
    </div>
  );
};

export default WhereContainer;
