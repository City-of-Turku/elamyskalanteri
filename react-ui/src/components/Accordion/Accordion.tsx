import {useState} from "react";
import { Icon } from '@mui/material';
import styles from "./Accordion.module.css"

interface IProps {
  title: string,
  children: any,
  icon: string,
}

const Accordion = ({ title, children, icon }: any) => {

  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className={styles.container} onClick={() => setOpen(!open)}>
        <h3>{title}</h3>
        {icon && <Icon component={icon} style={{fontSize: 32}}/>}
      </div>
      {open &&
        <div className={styles.childContainer}>
        {children}
      </div>}
    </div>
  )
}

export default Accordion