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

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setOpen(!open)
    }
  }

  return (
    <div>
      <div className={styles.container} onClick={() => setOpen(!open)} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
        <h3 style={{
          textTransform: "capitalize",
          color: theme.palette.primary.dark,
          fontSize: 22,
          fontFamily: 'halogen'
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