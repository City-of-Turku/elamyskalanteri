import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { getCoords } from "../../../functions/boundingBox";
import { useAppDispatch } from "../../../hooks/rtkHooks";
import filterSlice from "../../../redux/slices/filterSlice";
import { useState } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";

const LocationContainer = () => {

  const dispatch = useAppDispatch()

  // Bind setBbox to dispatch, so it can be called without dispatch
  const { setBbox } = bindActionCreators(filterSlice.actions, dispatch)

  const [activeCheckbox, setActiveCheckbox] = useState<number | null>(null)

  const handleLocation = (d: number) => {
    const location = navigator.geolocation
    location.getCurrentPosition(
      (pos) => handleCoords(pos, d),
      () => console.error("Could not locate"),
      {timeout: 5000})

    const handleCoords = (pos: { coords: any }, d: number) => {
      const coords = getCoords(pos, d)
      setBbox(coords)
    }
  }

  return (
    <div>
      <p>Lähellä minua</p>
      <FormGroup row>
        <FormControlLabel
          control={<Checkbox/>}
          label={"alle 1km"}
          labelPlacement={"end"}
          style={{ width: "140px"}}
          value={1}
          checked={activeCheckbox === 1}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null)
              setBbox({ north: null, east: null, south: null, west: null})
              return;
            }
            setActiveCheckbox(Number(e.target.value))
            handleLocation(1)
          }}
        />
        <FormControlLabel
          control={<Checkbox/>}
          label={"alle 3km"}
          labelPlacement={"end"}
          style={{ width: "140px"}}
          value={2}
          checked={activeCheckbox === 2}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null)
              setBbox({ north: null, east: null, south: null, west: null})
              return;
            }
            setActiveCheckbox(Number(e.target.value))
            handleLocation(3)
          }}
        />
        <FormControlLabel
          control={<Checkbox/>}
          label={"alle 5km"}
          labelPlacement={"end"}
          style={{ width: "140px"}}
          value={3}
          checked={activeCheckbox === 3}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null)
              setBbox({ north: null, east: null, south: null, west: null})
              return;
            }
            setActiveCheckbox(Number(e.target.value))
            handleLocation(5)
          }}
        />
        <FormControlLabel
          control={<Checkbox/>}
          label={"alle 10km"}
          labelPlacement={"end"}
          style={{ width: "140px"}}
          value={4}
          checked={activeCheckbox === 4}
          onChange={(e: any) => {
            if (!e.target.checked) {
              setActiveCheckbox(null)
              setBbox({ north: null, east: null, south: null, west: null})
              return;
            }
            setActiveCheckbox(Number(e.target.value))
            handleLocation(10)
          }}
        />
      </FormGroup>
    </div>
  )
}

export default LocationContainer