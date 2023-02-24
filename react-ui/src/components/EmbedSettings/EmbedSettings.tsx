import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalCategories from './AdditionalCategories/AdditionalCategories';
import styles from './EmbedSettings.module.css';
import LanguageSelect from './LanguageSelect/LanguageSelect';
import LinkContainer from './LinkContainer/LinkContainer';
import ListView from './ListView/ListView';
import OpenInNewWindow from './OpenInNewWindow/OpenInNewWindow';
import SearchCriteria from './SearchCriteria/SearchCriteria';
import ShowPastEvents from './ShowPastEvents/ShowPastEvents';
import TextFields from './TextFields/TextFields';
import Theme from './Theme/Theme';

const EmbedSettings = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.title}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="embedSettings-panelContent"
          id="embedSettings-panelId"
        >
          <Typography>{t('showEmbedSettings')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextFields />
          <Theme />
          <ListView />
          <ShowPastEvents />
          <SearchCriteria />
          <OpenInNewWindow />
          <LanguageSelect />
          <AdditionalCategories />
          <LinkContainer />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EmbedSettings;
