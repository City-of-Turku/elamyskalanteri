import { useState } from "react";
import { Icon } from '@mui/material';
import styles from "./Accordion.module.css"
import { useTheme } from "@mui/styles";

interface IProps {
  title: string,
  children: any,
  icon: any,
}

const Accordion = ({ title, children, icon }: IProps) => {

  const theme: any = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className={styles.container} onClick={() => setOpen(!open)}>
        <h3 style={{
          color: theme.palette.primary.dark
        }}
        >
          {title}
        </h3>
        {icon &&
          <div style={{ backgroundColor: theme.palette.primary.main, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%"}}>
            <Icon
              component={icon}
              style={{fontSize: 32, color: "#ffffff"}}
            />
          </div>}
      </div>
      {open &&
        <div className={styles.childContainer}>
        {children}
      </div>}
    </div>
  )
}

export default Accordion