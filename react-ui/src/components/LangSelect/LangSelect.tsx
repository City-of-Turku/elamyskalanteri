import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/rtkHooks"

const langSelect = () => {
    const { t, i18n } = useTranslation();
    const options = useAppSelector((state) => state.options)

      switch(options.languageSelection) {
        case "fi":
          i18n.language = "fi"
          break;
        case "sv":
          i18n.language = "sv"
          break;
        case "en":
          i18n.language = "en"
          break;
        default:
          i18n.language = "fi"
      }
    
  console.log("langSelect", langSelect)
    return (
        <div>

        </div>
    )
}

export default langSelect