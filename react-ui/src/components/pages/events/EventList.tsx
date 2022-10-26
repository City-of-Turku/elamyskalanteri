import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Button, ToggleButton } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { SetStateAction, useEffect, useState } from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/rtkHooks";
import { useEventsQuery } from "../../../redux/services/eventApi";
import FilterContainer from "../../FilterContainer/FilterContainer";
import EventCard from "./EventCard";
import List from "./List";
import { useHistory } from "react-router-dom";
import { parseQuery } from "../../../functions/urlParser";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../../redux/slices/filterSlice";
import EmbedCode from "../../FilterContainer/EmbedCode/EmbedCode";
import dayjs from "dayjs";

interface EventListProps {
  typeId?: string;
  advancedEditor: boolean; 
}

const EventList = (props:EventListProps) => {

  const history = useHistory()
  const queryString = require('query-string')
  const dispatch = useAppDispatch()

  const { filters } = useAppSelector((state) => state);
  const { setSearch, setEventTypes, setFeatures, setStartTime, setEndTime, addAudience, setTypeId } = bindActionCreators(filterSlice.actions, dispatch)
  const [view, setView] = useState(true);
  const [color, setColor] = useState("primary.dark")
  const handleColor = (e: any, value: SetStateAction<string>) => setColor(value);

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

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <FilterContainer />
        <EmbedCode advancedMode={props.advancedEditor} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "8px 0 24px 0",
          }}
        >
          <Button
            onClick={() => setPage(page - 1)}
            variant={"contained"}
            sx={{ mx: 1 }}
            disabled={!data?.meta.previous}
          >
            Edellinen sivu
          </Button>
          <p>Sivu {page}</p>
          <Button
            onClick={() => setPage(page + 1)}
            variant={"contained"}
            sx={{ mx: 1 }}
            disabled={!data?.meta.next}
          >
            Seuraava sivu
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "2em",
          }}
        >
          <ToggleButtonGroup
            orientation="horizontal"
            exclusive
            onChange={handleColor}
            value={color}
          >
            <ToggleButton
              onClick={() => setView(true)}
              sx={{ color: "primary.main" }}
              value="primary.dark"
              aria-label="module"
            >
              {" "}
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton
              onClick={() => setView(false)}
              sx={{ color: "primary.main" }}
              value="secondary"
              aria-label="list"
            >
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Box sx={{ display: "flex", justifyContent: "center", p: 0.5 }}></Box>
        <Grid
          sx={{
            flexGrow: 1,
            alignItems: "strech",
            justifyContent: "center",
            p: 6,
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
            data.data?.map((event: any) => (
              <div key={event.id}>
                <div>
                  {view ? (
                    <Grid key={event.id} item>
                      <EventCard {...event} />
                    </Grid>
                  ) : (
                    <Grid item key={event.id}>
                      <List {...event} />
                    </Grid>
                  )}
                </div>
                <Box p={1}></Box>
              </div>
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default EventList;