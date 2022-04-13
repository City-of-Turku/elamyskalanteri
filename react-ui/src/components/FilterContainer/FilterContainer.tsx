import styles from "./FilterContainer.module.css"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarContainer from "../Calendar/CalendarContainer"
import SearchBox from "./SearchBox/SearchBox";
import WhatContainer from "./WhatContainer/WhatContainer";
import WhereContainer from "./WhereContainer/WhereContainer";
import {useTheme} from "@mui/styles";
import {useTranslation} from "react-i18next";

const FilterContainer = () => {

  const theme = useTheme()
  const { t, i18n } = useTranslation()

  return (
    <div className={styles.container}>
      <h2 style={{ fontWeight: 300, marginBottom: "16px"}}>{t("slogan")}</h2>
      <div className={styles.innerContainer}>
        <div className={styles.calendarContainer}>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <h3 style={{ margin: "0 0 0 24px", textTransform: "capitalize"}}>{t("when")}?</h3>
            <div style={{ backgroundColor: theme.palette.primary.main, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%"}}>
              <EventAvailableIcon sx={{ fontSize: 32, color: "#ffffff" }} />
            </div>
          </div>
          <CalendarContainer />
        </div>
          <>
            <div className={styles.searchContainer}>
              <WhatContainer />
              <WhereContainer />
              <SearchBox />
            </div>
          </>
      </div>
    </div>
  )
}

export default FilterContainer

