import { FilterOptionsState, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
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

  const { data } = useOrganizationsQuery();

  const filterOptions = (
    options: Organization[],
    { inputValue }: FilterOptionsState<Organization>,
  ) => {
    if (!inputValue.length) return [];
    return matchSorter(options, inputValue, { keys: ['name'] });
  };

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h3" style={{ margin: '16px 0' }}>
        {t('organizer')}
      </Typography>
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
            maxWidth: 500,
            width: '100%',
          }}
          noOptionsText={t('noOptions')}
          renderInput={(params) => (
            <TextField
              aria-label={t('organizer')}
              placeholder={t('searchOrganizerByName')}
              {...params}
            />
          )}
        />
      </FormGroup>
    </div>
  );
};

export default OrganizationContainer;
