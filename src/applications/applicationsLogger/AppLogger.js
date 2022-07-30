import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAppLogger } from './AppLoggerSlice';
import { DataGrid } from '@mui/x-data-grid';
import format from 'date-fns/format';
import { AppLoggerHeader } from './AppLoggerHeader'

const columns = [
  {
    field: 'id',
    headerName: 'Log ID',
    width: 200,
    valueGetter: (params) => params.row.logId,
  },
  {
    field: 'applicationType',
    headerName: 'Application Type',
    width: 210,
    valueGetter: (params) => params.row.applicationType?.replaceAll("_", " ")?.toLowerCase() || '--',
  },
  {
    field: 'applicationID',
    headerName: 'Application ID',
    width: 200,
    valueGetter: (params) => params.row?.applicationId || '--',
  },
  {
    field: 'actionType',
    headerName: 'Action',
    width: 200,
    valueGetter: (params) => params.row?.actionType?.replaceAll("_", " ")?.toLowerCase() || '--',
  },
  {
    field: 'actionDetails',
    headerName: 'Action Details',
    width: 200,
    valueGetter: (params) => params.row.actionDetails || '--',
  },
  {
    field: 'dateTime',
    headerName: 'Date : Time',
    width: 200,
    valueGetter: (params) => format(new Date(params.row.creationTimestamp), 'yyy-MM-dd / h:mm') || '--',
  },
];

export function AppLogger() {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [appLoggerData, setAppLoggerData] = useState([]);
  const [filteredAppLoggerData, setFilteredAppLoggerData] = useState([]);

  function filterData(filterObj) {
    const filterKeys = Object.keys(filterObj)
    const appFiltered = appLoggerData.filter(function (item) {
      const itemDateStr = format(new Date(item.creationTimestamp), 'yyy-MM-dd')
      for (let i = 0; i < filterKeys.length; i++) {
        const name = filterKeys[i]
        const value = filterObj[name]
        if (value == '') continue
        if (name.includes('Date')) {
          try {
            const itemDate = new Date(itemDateStr)
            const isPast = itemDate <= new Date(value)
            const isFuture = itemDate >= new Date(value)
            const isNow = ((new Date(value)).getTime === itemDate.getTime)
            if (name == "selectDate" && isNow) return true
            if (name == "fromDate" && !isFuture) return false
            if (name == "toDate" && !isPast) return false
          } catch (error) {

          }
        } else {
          if (item[name] !== value) {
            return false
          }
        }
      }
      return true
    })

    setFilteredAppLoggerData(appFiltered)
  }
  function handleLoggerData(loggerData = []) {
    if (loggerData.length === 0) return loggerData
    loggerData.forEach(item => {
      item.id = item?.logId
    })
    setAppLoggerData(loggerData)
    setFilteredAppLoggerData(loggerData)
  }
  useEffect(() => {
    setisLoading(true)
    dispatch(
      getAppLogger()
    ).then((res) => {
      handleLoggerData(res.payload)
      setisLoading(false)
    }
    );
  }, []);
  if (isLoading) return ('loading')
  return (
    <div className='app_logger'>
      <AppLoggerHeader filterData={filterData} appLoggerData={filteredAppLoggerData} />
      <div style={{ display: 'flex', height: 630 }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            disableColumnMenu
            rows={filteredAppLoggerData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[]}
          />
        </div>
      </div>
    </div>
  );
}
