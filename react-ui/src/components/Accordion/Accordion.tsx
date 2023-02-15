import { SvgIconComponent } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon, Typography } from '@mui/material';
import Accordions from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import styles from './Accordion.module.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
  icon: SvgIconComponent;
}

const Accordion = ({ title, children, icon }: IProps) => {
  const theme = useTheme();

  return (
    <Accordions elevation={0} className={styles.accordion}>
      <AccordionSummary
        sx={{ padding: '8px' }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={styles.accordionSummary}
      >
        {icon && (
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            <Icon component={icon} style={{ fontSize: 32, color: '#ffffff' }} />
          </div>
        )}
        <Typography variant="h2" className={styles.title}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.childContainer}>{children}</div>
      </AccordionDetails>
    </Accordions>
  );
};

export default Accordion;
