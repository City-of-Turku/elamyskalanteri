import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/styles";
import { useEffect, useState } from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/rtkHooks";
import { useEventsQuery } from "../../../redux/services/eventApi";
import FilterContainer from "../../FilterContainer/FilterContainer";
import { useHistory } from "react-router-dom";
import { parseQuery } from "../../../functions/urlParser";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../../redux/slices/filterSlice";
import EmbedCode from "../../FilterContainer/EmbedCode/EmbedCode";
import dayjs from "dayjs";
import Title from "../../Title/Title";
import GridList from "../../EventList/GridList";
import VerticalList from "../../EventList/VerticalList";
import HorizontalList from "../../EventList/HorizontalList";

interface EventListProps {
  typeId?: string;
}

const EventList = (props:EventListProps) => {
  const theme: any = useTheme();
  const options = useAppSelector((state) => state.options)
  const dispatch = useAppDispatch()
  const history = useHistory()
  const queryString = require('query-string')

  const { filters } = useAppSelector((state) => state);
  const { setSearch, setEventTypes, setFeatures, setStartTime, setEndTime, addAudience, setTypeId } = bindActionCreators(filterSlice.actions, dispatch)
  const [firstLoadDone, setFirstLoadDone] = useState(false)

  useEffect(() => {
    if (!firstLoadDone) {
      const query = (queryString.parse(window.location.hash.replaceAll("?", "")))

      if (Object.keys(query).includes("text")) {
        setSearch(query.text)
      }
      if (Object.keys(query).includes("keywords")) {
        let keywordArray = query.keywords.split(',')
        setEventTypes(keywordArray)
      }
      if (Object.keys(query).includes("features")) {
        let featureArray = query.features.split(",")
        console.log("feature array: ", featureArray)
        setFeatures(featureArray)
      }

      if (Object.keys(query).includes("start_time")) {
        setStartTime(query.start_time)
      }

      if (Object.keys(query).includes("end_time")) {
        setEndTime(query.end_time)
      }

      if (Object.keys(query).includes("audiences")) {
        let audienceArray = query.audiences.split(',')
        audienceArray.forEach((item: string) => addAudience(item))
      }

      if (Object.keys(query).includes("type_id")) {
        setTypeId(query.type_id);
      }
      else if (props.typeId) {
        setTypeId(props.typeId);
      }

      setFirstLoadDone(true)
    }
  }, [window.location.hash])

  useEffect(() => {
    if (!firstLoadDone) return
    history.push(parseQuery(filters))
  }, [filters])

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useEventsQuery({
    page: page,
    searchTerm: filters.search || "",
    keyword: filters.eventTypes,
    features: Array.isArray(filters.eventFeatures) ? filters.eventFeatures.join("&") : "",
    bbox: filters.bbox.north ? Object.values(filters.bbox).join(",") : "",
    start_time: filters.startTime ? dayjs(filters.startTime).format("YYYY-MM-DD") : "",
    end_time: filters.endTime ? dayjs(filters.endTime).format("YYYY-MM-DD") : "",
    audiences: filters.audiences,
    type_id: filters.typeId ? filters.typeId : "",
  });

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.eventTypes]);

  let listComponent;
  switch(options.listView) {
    case "grid":
      listComponent = <GridList events={data?.data}/>
      break;
    case "vertical":
      listComponent = <VerticalList events={data?.data}/>
      break;
    case "horizontal":
      listComponent = <HorizontalList events={data?.data}/>
      break;
      default:
        listComponent = <GridList events={data?.data}/>
  }

  return (
      <Box sx={{ p: 2 }}>
        <Title />
        <FilterContainer />
        <EmbedCode />
        <Grid
          sx={{
            flexGrow: 1,
            alignItems: "strech",
            justifyContent: "center",
            // p: 6,
          }}
          container
        >
          {isLoading || isFetching ? (
            <Box sx={{ position: "absolute", left: "50%", top: "50%" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <h2>Something went wrong</h2>
          ) : (
         <div>
          <div>
            {listComponent}
          </div>
         </div>
          )}
       </Grid>
       <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "8px 0 24px 0",
          }}
        >
        <Button onClick={() => setPage(page + 1)} sx={{backgroundColor: theme.palette.primary.dark, 
          "&:hover": {backgroundColor: theme.palette.primary.main},}} variant="contained">Lataa lisää</Button>
       </div>
      </Box>
  );
};

export default EventList;