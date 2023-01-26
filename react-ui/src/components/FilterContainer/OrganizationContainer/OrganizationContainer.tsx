import { FilterOptionsState } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOrganizationsQuery } from '../../../redux/services/organizationApi';
import { Organization } from '../../../types';

type IProps = {
  onChange: (newId: string | null) => void;
};

const OrganizationContainer = ({ onChange }: IProps): JSX.Element => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { data } = useOrganizationsQuery();

  const filterOptions = (
    options: Organization[],
    { inputValue }: FilterOptionsState<Organization>,
  ) => {
    if (!inputValue.length) return [];
    return matchSorter(options, inputValue, { keys: ['name'] });
  };

  return (
    <div>
      <p
        style={{
          margin: '0 16px 16px 0',
          color: theme.palette.primary.dark,
          fontSize: 18,
          fontFamily: 'halogen, sans-serif',
          fontWeight: 900,
          textTransform: 'capitalize',
        }}
      >
        <b>{t('organizer')}:</b>
      </p>
      <FormGroup row>
        <Autocomplete
          filterOptions={filterOptions}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: Organization | null,
          ) => {
            onChange(newValue ? newValue.id : null);
          }}
          disablePortal
          clearOnBlur
          popupIcon={null}
          id="organizationSelect"
          options={data ? data : []}
          getOptionLabel={(option) => option.name}
          sx={{
            width: 500,
          }}
          noOptionsText={t('noOptions')}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormGroup>
    </div>
  );
};

export default OrganizationContainer;
