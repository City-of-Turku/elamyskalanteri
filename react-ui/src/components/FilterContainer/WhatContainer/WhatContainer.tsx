import Accordion from "../../Accordion/Accordion";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import styles from "./WhatContainer.module.css";
import { Checkbox, CircularProgress, FormControlLabel, FormGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/rtkHooks";
import FilterChip from "../FilterChip/FilterChip";
import { bindActionCreators } from "@reduxjs/toolkit";
import filterSlice from "../../../redux/slices/filterSlice";
import { useTopicsQuery } from "../../../redux/services/keywordApi";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import { useTranslation } from "react-i18next";

interface ICategory {
  name: {
    fi: string,
    en: string,
    sv: string,
  }
  yso: string
}

const WhatContainer = () => {

  const theme: any = useTheme()
  const { t, i18n } = useTranslation()

  // @ts-ignore
  const { data, isLoading } = useTopicsQuery()

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
  const { addFeature, removeFeature, setEventTypes, addAudience, removeAudience } = bindActionCreators(filterSlice.actions, dispatch)

  const [ categories, setCategories ] = useState([])
  const [ audiences, setAudiences ] = useState([])

  // Adds category to the redux store
  const addFilter = (category: ICategory) => {
    // @ts-ignore
    setEventTypes(filters.eventTypes.concat(category.yso))
  }

  // Filters category from the redux store
  const removeFilter = (category: ICategory) => {
    // @ts-ignore
    setEventTypes(filters.eventTypes.filter(e => e !== category.yso))
  }

  const handleFeatureChange = (e: any) => {
    // If the checkbox is checked
    if (e.target.checked) {
      // @ts-ignore
      addFeature(e.target.value)
    }
    else {
      // @ts-ignore
      removeFeature(e.target.value)
    }
  }

  const handleAudienceChange = (e: any) => {
    if (e.target.checked) {
      // @ts-ignore
      addAudience(e.target.value)
    }
    else {
      // @ts-ignore
      removeAudience(e.target.value)
    }
  }

  useEffect(() => {
    if (data) {
      const topics = data.data
        .find((item: any) => item.id === "turku:topics").keywords
      const audiences = data.data
        .find((item: any) => item.id === "turku:audience").keywords
      let tmpCategories = topics.map((topic: any) => (
        {
          name: topic.name,
          yso: topic.id
        }
      ))

      let tmpAudiences = audiences.map((audience: any) => (
        {
          name: audience.name,
          yso: audience.id
        }
      ))
      setCategories(tmpCategories)
      setAudiences(tmpAudiences)
    }
  }, [data])

  return (
    <div className={styles.container}>
     <Accordion title={`${t("what")}?`} icon={LocalActivityIcon}>
        <p style={{ color: theme.palette.primary.dark}}><b>KATEGORIA</b></p>
        <div className={styles.chipContainer}>
          {isLoading &&
            <CircularProgress />
          }
          {data &&
            categories.map((category: ICategory) => (
            <FilterChip
              label={category.name[i18n.language as keyof typeof category.name] }
              active={filters.eventTypes.includes(category.yso)}
              handleClick={() => addFilter(category)}
              handleDelete={() => removeFilter(category)}
            />
          ))}
        </div>
          <div className={styles.rowWrap}>
            <p style={{ width: "100px", color: theme.palette.primary.dark}}><b>Kenelle:</b></p>
            <FormGroup row >
              {audiences.map((audience: any) => (
                <FormControlLabel
                  control={<Checkbox />}
                  label={audience.name[i18n.language]}
                  style={{ width: "250px"}}
                  value={audience.yso}
                  onChange={(e: any) => handleAudienceChange(e)}
                  checked={filters.audiences.includes(audience.yso)}

                />
              ))}
            </FormGroup>
          </div>
          <div className={styles.rowWrap}>
            <p style={{ margin: "0 16px 0 0", color:theme.palette.primary.dark}}><b>Ominaisuus:</b></p>
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
      </Accordion>
    </div>
  )

}

export default WhatContainer