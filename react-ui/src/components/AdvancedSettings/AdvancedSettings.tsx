import AdditionalCategories from "./AdditionalCategories/AdditionalCategories"
import TextFields from "./TextFields/TextFields";
import Style from "./Style/Style";
import ListView from "./ListView/ListView";
import SearchCriteria from "./SearchCriteria/SearchCriteria";
import LanguageSelect from "./LanguageSelect/LanguageSelect";
import styles from "./AdvancedSettings.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkContainer from "./LinkContainer/LinkContainer";
import { useTranslation } from "react-i18next";

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
                <p>{`${t("showAdvancedSettings")}`}</p>
                </AccordionSummary>
                <AccordionDetails>
                <TextFields />
                <Style />
                <ListView />
                <SearchCriteria />
                <LanguageSelect />
                <AdditionalCategories />
                <LinkContainer />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default AdvancedSettings