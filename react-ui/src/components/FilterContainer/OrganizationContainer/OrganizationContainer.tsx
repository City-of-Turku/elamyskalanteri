import { Alert, CircularProgress, FilterOptionsState, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { bindActionCreators } from '@reduxjs/toolkit';
import { matchSorter } from 'match-sorter';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { useOrganizationsQuery } from '../../../redux/services/organizationApi';
import filterSlice from '../../../redux/slices/filterSlice';
import { Organization } from '../../../types';

const OrganizationContainer = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isError } = useOrganizationsQuery();
  const { filters } = useAppSelector((state) => state);
  const { setOrganization } = bindActionCreators(filterSlice.actions, dispatch);
  const activeOrganization =
    filters.organization && data
      ? data.find((org) => org.id === filters.organization) || null
      : null;

  const handleChange = (organization: Organization | null) => {
    if (!organization) return setOrganization(null);
    return setOrganization(organization.id);
  };

  const filterOptions = (
    options: Organization[],
    { inputValue }: FilterOptionsState<Organization>,
  ) => {
    if (!inputValue.length) return [];
    return matchSorter(options, inputValue, { keys: ['name'] });
  };

  if (isLoading || isFetching) {
    return (
      <div style={{ width: '100%' }}>
        <Typography variant="h3" style={{ margin: '16px 0' }}>
          {t('organizer')}
        </Typography>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ width: '100%' }}>
        <Typography variant="h3" style={{ margin: '16px 0' }}>
          {t('organizer')}
        </Typography>
        <Alert severity="error" sx={{ lineHeight: 'unset' }}>
          {t('errorLoadingAdditionalCategories')}
        </Alert>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h3" style={{ margin: '16px 0' }}>
        {t('organizer')}
      </Typography>
      <FormGroup row>
        <Autocomplete
          value={activeOrganization}
          filterOptions={filterOptions}
          onChange={(event, newValue) => handleChange(newValue)}
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
