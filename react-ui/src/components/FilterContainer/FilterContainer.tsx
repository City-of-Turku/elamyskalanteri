import styles from "./FilterContainer.module.css"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarContainer from "../Calendar/CalendarContainer"
import SearchBox from "./SearchBox/SearchBox";
import WhatContainer from "./WhatContainer/WhatContainer";
import WhereContainer from "./WhereContainer/WhereContainer";
import { useTheme } from "@mui/styles";
import { useTranslation } from "react-i18next";

const FilterContainer = () => {

  const theme: any = useTheme()
  const { t } = useTranslation()

  return (
    <div className={styles.container}>

      <div className={styles.sloganContainer}>
        <h2>
          <span style={{ color: theme.palette.primary.dark, fontWeight: "bold" }}>
          {t("slogan1")}
          </span>
          <span>&nbsp;</span>
          <span style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
            {t("slogan2")}
          </span>
          <span>&nbsp;</span>
          <span style={{ color: theme.palette.primary.dark, fontWeight: "bold" }}>
            {t("slogan3")}
          </span>
        </h2>
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.whenRow}>
            <h3 style={{color: theme.palette.primary.dark }}>{t("when")}?</h3>
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
              <div className={styles.divider} />
              <WhereContainer />
              <div className={styles.divider} />
              <SearchBox />
            </div>
          </>
      </div>
    </div>
  )
}

export default FilterContainer

