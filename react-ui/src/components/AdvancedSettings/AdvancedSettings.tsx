import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalCategories from './AdditionalCategories/AdditionalCategories';
import styles from './AdvancedSettings.module.css';
import LanguageSelect from './LanguageSelect/LanguageSelect';
import LinkContainer from './LinkContainer/LinkContainer';
import ListView from './ListView/ListView';
import SearchCriteria from './SearchCriteria/SearchCriteria';
import TextFields from './TextFields/TextFields';
import Theme from './Theme/Theme';

const AdvancedSettings = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.title}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-id"
        >
          <p>{`${t('showAdvancedSettings')}`}</p>
        </AccordionSummary>
        <AccordionDetails>
          <TextFields />
          <Theme />
          <ListView />
          <SearchCriteria />
          <LanguageSelect />
          <AdditionalCategories />
          <LinkContainer />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AdvancedSettings;
