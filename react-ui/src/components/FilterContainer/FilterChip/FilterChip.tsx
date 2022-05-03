import { Chip } from "@mui/material";
import {useTheme} from "@mui/styles";

interface IProps {
  label: string,
  active?: boolean,
  handleClick?: () => void,
  handleDelete?: () => void
}

/*
 * Displays either outlined chip or deletable chip based on active status
 * MUI's chips change visual whether they are provided with `onDelete` or `onClick` prop
 */

const FilterChip = ({ label, active, handleClick, handleDelete }: IProps) => {

  const theme: any = useTheme()

  return (
    <>
      {active
        ?
        <Chip
          label={label}
          variant={active ? "filled" : "outlined"}
          // @ts-ignore
          sx={{ backgroundColor: theme.palette.primary.main, color: "#ffffff", borderRadius: 0, clipPath: "polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%);", padding: "0 4px" }}
          onDelete={() => handleDelete ? handleDelete() : null}

        />
        :
        <Chip
          label={label}
          variant={active ? "filled" : "outlined"}
          onClick={() => handleClick ? handleClick() : null}
          sx={{ borderRadius: 0, border: "none", backgroundColor: "rgba(242, 202, 153, 0.2);", clipPath: "polygon(7px 0, 100% 0, calc(100% - 7px) 100%, 0 100%);", padding: "0 4px" }}
        />
      }
    </>
  )
}

export default FilterChip