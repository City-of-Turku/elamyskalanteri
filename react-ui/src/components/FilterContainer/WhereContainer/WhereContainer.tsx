import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTheme } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '../../Accordion/Accordion';
import FilterChip from '../FilterChip/FilterChip';
import LocationContainer from '../LocationContainer/LocationContainer';
import styles from './WhereContainer.module.css';

const WhereContainer = () => {
  const theme: any = useTheme();
  const { t } = useTranslation();

  const places = [
    { fi: 'Kaikki' },
    { fi: 'Turku' },
    { fi: 'Raisio' },
    { fi: 'Naantali' },
    { fi: 'Kaarina' },
    { fi: 'Lieto' },
    { fi: 'Aura' },
    { fi: 'Rusko' },
  ];

  return (
    <div>
      <Accordion title={`${t('where')}?`} icon={LocationOnIcon}>
        {/*
        <p style={{ margin: "0 4px 4px 4px", color: theme.palette.primary.dark}}>
          <b>
            {t("place")}
          </b>
        </p>
        <div className={styles.wrapRow}>
          {places.map(place => (
            <FilterChip
              label={place.fi}
              active={false}
            />
          ))}
        </div>
        */}
        <LocationContainer />
      </Accordion>
    </div>
  );
};

export default WhereContainer;
