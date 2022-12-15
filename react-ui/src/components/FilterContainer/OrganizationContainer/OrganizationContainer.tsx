import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/styles";
import { matchSorter } from 'match-sorter';


import { useTranslation } from "react-i18next";

import { useOrganizationsQuery } from "../../../redux/services/organizationApi";
import { Organization } from "../../../redux/types/Organizations";
import { FilterOptionsState } from "@mui/material";

const OrganizationContainer = () => {
  const { t } = useTranslation();
  const theme: any = useTheme();

  const { data, error, isLoading, isFetching } = useOrganizationsQuery();

  const filterOptions = (options: Organization[], { inputValue }: FilterOptionsState<Organization>) => {
    if (!inputValue.length) return [];
    return matchSorter(options, inputValue, {keys: ['name']});
  }

  console.log(data);
  //   const handleSelectChange = (event: SelectChangeEvent) => {
  //     //setSelectedOrganization(event.target.value as string);
  //   };

  //   const handleSearchChange = () => {

  //   }

  //   const handleTextChange = () => {

  //   }
  return (
    <div>
      <p
        style={{
          margin: "0 16px 16px 0",
          color: theme.palette.primary.dark,
          fontSize: 18,
          fontFamily: "halogen",
          fontWeight: 900,
          textTransform: "capitalize",
        }}
      >
        <b>{t("organizer")}:</b>
      </p>
      <FormGroup row>
        <Autocomplete
          filterOptions={filterOptions}
          disablePortal
          clearOnBlur
          popupIcon={null}
          id="organizationSelect"
          options={data ? data : []}
          getOptionLabel={(option) => option.name}
          sx={{ 
            width: 500,
          } }
          noOptionsText={t("noOptions")}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormGroup>
    </div>
  );
};

export default OrganizationContainer;