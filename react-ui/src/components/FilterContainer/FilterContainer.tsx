import styles from "./FilterContainer.module.css"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarContainer from "../Calendar/CalendarContainer"
import SearchBox from "./SearchBox/SearchBox";
import WhatContainer from "./WhatContainer/WhatContainer";
import WhereContainer from "./WhereContainer/WhereContainer";
import {useTheme} from "@mui/styles";
import {useTranslation} from "react-i18next";

const FilterContainer = () => {

  const theme: any = useTheme()
  const { t, i18n } = useTranslation()

  return (
    <div className={styles.container}>

      <div className={styles.sloganContainer}>
        <h2>{t("slogan")}</h2>
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.whenRow}>
            <h3 style={{color: theme.palette.primary.main }}>{t("when")}?</h3>
            <div
              style={{ backgroundColor: theme.palette.primary.main}}
              className={styles.iconWrapper}
            >
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

