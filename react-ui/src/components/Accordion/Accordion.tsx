import { useState } from "react";
import { Icon } from '@mui/material';
import styles from "./Accordion.module.css"
import { useTheme } from "@mui/styles";
import Accordions from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IProps {
  title: string,
  children: any,
  icon: any,
}

const Accordion = ({ title, children, icon }: IProps) => {

  const theme: any = useTheme()

  return (
      <div> 
      <Accordions elevation={0} className={styles.accordion}>
      <AccordionSummary
          sx={{padding: "24px 16px"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        {icon &&
          <div style={{ backgroundColor: theme.palette.primary.main, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%"}}>
            <Icon
              component={icon}
              style={{fontSize: 32, color: "#ffffff"}}
            />
          </div>}
        <h3 style={{
          textTransform: "capitalize",
          color: theme.palette.primary.dark,
          fontSize: 22,
          fontFamily: 'halogen',
        }}
        >
          {title}
        </h3>
        </AccordionSummary>
        <AccordionDetails>
    
        <div className={styles.childContainer}>
        {children}
      </div>
        </AccordionDetails>
      </Accordions>
    </div>
  )
}

export default Accordion