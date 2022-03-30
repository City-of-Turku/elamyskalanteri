import { Chip } from "@mui/material";

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

  return (
    <>
      {active
        ?
        <Chip
          label={label}
          variant={active ? "filled" : "outlined"}
          sx={{ margin: "4px 4px", backgroundColor: "#C2CEDB" }}
          onDelete={() => handleDelete ? handleDelete() : null}

        />
        :
        <Chip
          label={label}
          variant={active ? "filled" : "outlined"}
          sx={{ margin: "4px 4px"}}
          onClick={() => handleClick ? handleClick() : null}
        />
      }
    </>
  )
}

export default FilterChip