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
import queryString from "query-string";
import {bindActionCreators} from "@reduxjs/toolkit";
import filterSlice from "../../../redux/slices/filterSlice";
import {useTranslation} from "react-i18next";

const EventList = () => {

  const history = useHistory()
  const queryString = require('query-string')
  const dispatch = useAppDispatch()

  const { filters } = useAppSelector((state) => state);
  const { setSearch, setEventTypes, setFeatures } = bindActionCreators(filterSlice.actions, dispatch)
  const [view, setView] = useState(true);
  const [color, setColor] = useState("primary.dark")
  const handleColor = (e: any, value: SetStateAction<string>) => setColor(value);

  const { t, i18n } = useTranslation()

  const [firstLoadDone, setFirstLoadDone] = useState(false)

  useEffect(() => {
    const query = (queryString.parse(window.location.hash.replaceAll("?", "")))
    console.log(query)

    if (Object.keys(query).includes("text")) {
      setSearch(query.text)
    }
    if (Object.keys(query).includes("keywords")) {
      let keywordArray = query.keywords.split(',')
      setEventTypes(keywordArray)
    }
    if (Object.keys(query).includes("features")) {
      let featureArray = query.features.split(",")
      console.log(featureArray)
      setFeatures(featureArray)
    }
    setFirstLoadDone(true)
  }, [window.location.hash])

  useEffect(() => {
    if (!firstLoadDone) return
    history.push(parseQuery(filters))
  }, [filters])


  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useEventsQuery({
    page: page,
    searchTerm: filters.search || "",
    keyword: filters.eventTypes.join(),
    features: filters.eventFeatures.join("&"),
    bbox: filters.bbox.north ? Object.values(filters.bbox).join(",") : "",
  });

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.eventTypes]);

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <FilterContainer />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "8px 0 24px 0",
          }}
        >
          <Button
            variant={"contained"}
            sx={{ mx: 1 }}
            onClick={() => setPage(page - 1)}
            disabled={!data?.meta.previous}
          >
            Edellinen sivu
          </Button>
          <p>Sivu {page}</p>
          <Button
            variant={"contained"}
            sx={{ mx: 1 }}
            onClick={() => setPage(page + 1)}
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
            margin:"2em"
          }}
        >
          <ToggleButtonGroup orientation="horizontal" exclusive onChange={handleColor} value={color}>
            <ToggleButton
              sx={{color: 'primary.dark'}} 
              value="primary.dark"
              aria-label="module"
              onClick={() => setView(true)}
            >
              {" "}
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton
              sx={{color: 'primary.dark'}}
                value="secondary"
              aria-label="list"
              onClick={() => setView(false)}
            >
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 0.5,
          }}
        ></Box>
        <Grid
          sx={{ flexGrow: 1, alignItems: "strech", justifyContent: "center"}}
          container
          
        >
          {isLoading ||
            (isFetching && (
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                }}
              >
                <CircularProgress />
              </Box>
            ))}
          {!isLoading &&
            !isFetching &&
            !error &&
            data.data?.map((event: any) => {
              return (
                <div>
                  <div>
                    {view ? (
                      <Grid key={event.id} item>
                        <EventCard {...event} />
                      </Grid>
                    ) : (
                      <Grid key={event.id} item>
                        <List {...event} />
                      </Grid>
                    )}
                  </div>
                  <Box p={1}></Box>
                </div>
              );
            })}
          {error && <h2>Something went wrong</h2>}
        </Grid>
      </Box>
    </div>
  );
};

export default EventList;
