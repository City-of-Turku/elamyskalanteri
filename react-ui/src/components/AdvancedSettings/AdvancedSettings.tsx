import AdditionalCategories from "./AdditionalCategories/AdditionalCategories"
import styles from "./AdvancedSettings.module.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdvancedSettings = () => {

    return (
        <div className={styles.container}>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-id"
                >
                    <p>Näytä laajennetut hakuehdot</p>
                </AccordionSummary>
                <AccordionDetails>
                <AdditionalCategories />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default AdvancedSettings