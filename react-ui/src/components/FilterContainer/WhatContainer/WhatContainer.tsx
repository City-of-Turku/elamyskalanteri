import Accordion from "../../Accordion/Accordion";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import styles from "../FilterContainer.module.css";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/rtkHooks";
import FilterChip from "../FilterChip/FilterChip";
import { bindActionCreators } from "@reduxjs/toolkit";
import filterSlice from "../../../redux/slices/filterSlice";
import { useTopicsQuery } from "../../../redux/services/keywordApi";
import { useEffect, useState } from "react";

interface ICategory {
  name: {
    fi: string,
  }
  yso: string
}

const WhatContainer = () => {
  // @ts-ignore
  const { data } = useTopicsQuery()

  // Not a great place for these either...
  const features = [
    {label: "ilmainen", value: "is_free=true"},
    {label: "virtuaalinen", value: "internet_based=true"},
    {label: "esteetön", value: ""},
    {label: "ulkoilma", value: ""}
  ]

  const dispatch = useAppDispatch()

  // Destruct const from redux state
  const { filters } = useAppSelector(state => state)

  // Bind setFeatures to dispatch, so it can be called without dispatch
  const { setFeatures, setEventTypes } = bindActionCreators(filterSlice.actions, dispatch)

  const [categories, setCategories ] = useState([])

  // Adds category to the redux store
  const addFilter = (category: ICategory) => {
    setEventTypes(filters.eventTypes.concat(category.yso))
  }

  // Filters category from the redux store
  const removeFilter = (category: ICategory) => {
    setEventTypes(filters.eventTypes.filter(e => e !== category.yso))
  }

  const handleFeatureChange = (e: any) => {
    // If the checkbox is checked
    if (e.target.checked) {
      // Add feature to existing features
      const updatedFeatures = filters.eventFeatures
        .concat(e.target.value)
      setFeatures(updatedFeatures)
    }
    else {
      // Filter e.target.value from existing features
      const filteredFeatures = filters.eventFeatures
        .filter((feature: any) => feature !== e.target.value)
      setFeatures(filteredFeatures)
    }
  }

  useEffect(() => {
    if (data) {
      console.log("DATA: ", data)
      const topics = data.data[0].keywords
      let tmpCategories = topics.map((topic: any) => (
        {
          name: topic.name,
          yso: topic.id
        }
      ))
      setCategories(tmpCategories)
    }
  }, [data])

  return (
    <div style={{ borderBottom: "1px solid lightgray"}}>
      <Accordion title={"Mitä?"} icon={LocalActivityIcon}>
        <p style={{ margin: "0 4px 4px 4px"}}><b>KATEGORIA</b></p>
        <div className={styles.chipContainer}>
          {categories.map((category: ICategory) => (
            <FilterChip
              label={category.name.fi}
              active={filters.eventTypes.includes(category.yso)}
              handleClick={() => addFilter(category)}
              handleDelete={() => removeFilter(category)}
            />
          ))}
        </div>
        <div style={{ margin: "32px 0 0 0"}}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
            <p style={{ width: "100px"}}>Kenelle:</p>
            <FormGroup row >
              <FormControlLabel
                control={<Checkbox/>}
                label={"lapsiperheet"}
                labelPlacement={"end"}
                style={{ width: "140px"}}
              />
              <FormControlLabel
                control={<Checkbox/>}
                label={"nuoret"}
                labelPlacement={"end"}
                style={{ width: "140px"}}
              />
              <FormControlLabel
                control={<Checkbox/>}
                label={"seniorit"}
                labelPlacement={"end"}
                style={{ width: "140px"}}
              />
            </FormGroup>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap"}}>
            <p style={{ width: "100px"}}>Ominaisuus:</p>
            <FormGroup row>
              {features.map((feature) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={feature.label}
                  style={{ width: "140px"}}
                  value={feature.value}
                  onChange={(e: any) => handleFeatureChange(e)}
                  checked={filters.eventFeatures.includes(feature.value)}
                />
              ))}
            </FormGroup>
          </div>
        </div>
      </Accordion>
    </div>
  )

}

export default WhatContainer