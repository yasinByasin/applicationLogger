import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

export function AppLoggerHeader(props) {
  const ariaLabel = { 'aria-label': 'description' };
  const [actionTypeOptions, setActionTypeOptions] = useState([]);
  const [applicationTypeOptions, setApplicationTypeOptions] = useState([]);
  const [filterKeys, setFilterKeys] = useState({});

  const { appLoggerData, filterData } = props;

  function handleFilterOptions() {
    if (appLoggerData.length === 0) return
    const actionOptions = [...new Set(appLoggerData.map(a =>
      a.actionType && a.actionType))].filter(
        element => {
          return element !== null;
        });
    const applicationOptions = [...new Set(appLoggerData.map(a =>
      a.applicationType && a.applicationType))].filter(
        element => {
          return element !== null;
        });
    setActionTypeOptions(actionOptions)
    setApplicationTypeOptions(applicationOptions)
  }

  function filterDataRows() {
    filterData(filterKeys)
  }

  function updateFilterKeys(event) {
    const keys = filterKeys
    let value = event.target.value
    if (event.target.name === 'applicationId') {
      value = Number(value)
    }
    keys[event.target.name] = value
    setFilterKeys(keys)

  }
  useEffect(() => {
    handleFilterOptions()
  }, []);

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '10em' },
      }}
      noValidate
      autoComplete="on"
    >
      <TextField size="small" onChange={updateFilterKeys} name="employeeName" label="Employee Name" variant="outlined" />
      <TextField onChange={updateFilterKeys} size="small" select name="actionType" label="Action type" variant="outlined" >
        <MenuItem key="noActionOption" value=''>
          None
        </MenuItem>
        {actionTypeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option.replaceAll("_", " ")?.toLowerCase()}
          </MenuItem>
        ))}
      </TextField>
      <TextField size="small" onChange={updateFilterKeys} select name="applicationType" label="Application Type" variant="outlined" >
        <MenuItem key="noApplicationOption" value=''>
          None
        </MenuItem>
        {applicationTypeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option.replaceAll("_", " ")?.toLowerCase()}
          </MenuItem>
        ))}
      </TextField>

      <TextField size="small" onChange={updateFilterKeys} type="date" name="fromDate" label="From Date" focused variant="outlined" />
      <TextField size="small" onChange={updateFilterKeys} type="date" name="selectDate" label="Select date" focused variant="outlined" />
      <TextField size="small" onChange={updateFilterKeys} type="date" name="toDate" label="To Date" focused variant="outlined" />
      <TextField size="small" onChange={updateFilterKeys} name="applicationId" label="Application ID" variant="outlined" />
      <Button variant="contained" onClick={filterDataRows}>Search</Button>
    </Box>
  );
}