import LocationOnIcon from "@mui/icons-material/LocationOn";
import FilterChip from "../FilterChip/FilterChip";
import LocationContainer from "../LocationContainer/LocationContainer";
import Accordion from "../../Accordion/Accordion";
import {useTranslation} from "react-i18next";
import { useTheme } from "@mui/styles";

const WhereContainer = () => {

  const theme: any = useTheme()
  const { t } = useTranslation()

  const places = [
    {fi: "Kaikki"},
    {fi: "Turku"},
    {fi: "Raisio"},
    {fi: "Naantali"},
    {fi: "Kaarina"},
    {fi: "Lieto"},
    {fi: "Aura"},
    {fi: "Rusko"}
  ]

  return (
    <div>
      <Accordion
        title={`${t("where")}?`}
        icon={LocationOnIcon}
      >
        <p style={{ margin: "0 4px 4px 4px", color: theme.palette.primary.main}}>
          <b>
            PAIKKAKUNTA
          </b>
        </p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0 0 8px 0", gap: "8px"}}>
          {places.map(place => (
            <FilterChip
              label={place.fi}
              active={false}
            />
          ))}
        </div>
        <LocationContainer />
      </Accordion>
    </div>
  )
}

export default WhereContainer