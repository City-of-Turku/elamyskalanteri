import styles from "./FilterContainer.module.css"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Calendar from "../Calendar/Calendar"
import SearchBox from "./SearchBox/SearchBox";
import WhatContainer from "./WhatContainer/WhatContainer";
import WhereContainer from "./WhereContainer/WhereContainer";

const FilterContainer = () => {

  return (
    <div className={styles.container}>
      <h2 style={{ fontWeight: 300, marginBottom: "16px"}}>Löydä parhaimmat jutut</h2>
      <div className={styles.innerContainer}>
        <div style={{ border: "1px solid lightgrey", borderRadius: "16px", padding: "24px 16px"}}>
          <TitleRow />
          <Calendar />
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

const TitleRow = () => {
  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <h3 style={{ margin: "0 0 0 24px"}}>Milloin?</h3>
      <EventAvailableIcon sx={{ fontSize: 32 }} />
    </div>
  )
}
