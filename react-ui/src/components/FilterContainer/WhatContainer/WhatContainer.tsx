import Accordion from "../../Accordion/Accordion";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import styles from "./WhatContainer.module.css";
import { Checkbox, FormGroup, FormControlLabel, Typography, RadioGroup, Radio } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/rtkHooks";
import { bindActionCreators } from "@reduxjs/toolkit";
import filterSlice from "../../../redux/slices/filterSlice";
import { useTopicsQuery } from "../../../redux/services/keywordApi";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { CategorySelector, ICategory } from "./CategorySelector"


type CategoryDescriptor = {
  title: string
  categories: Array<ICategory>
}

type Feature = {
  label: {
    [key:string]: string
  }
  value: string
}

const WhatContainer = () => {

  const theme: any = useTheme()
  const { t, i18n } = useTranslation()

  // @ts-ignore
  const { data, isLoading } = useTopicsQuery()

  // Not a great place for these either...
  const features:Array<Feature> = [
    {
      label: {
        fi: "ilmainen",
        sv: "gratis",
        en: "free",
      },
      value: "is_free=true"},
    {
      label: {
        fi: "virtuaalinen",
        sv: "virtuell",
        en: "virtual"
      },
      value: "internet_based=true"},
  ]

  const dispatch = useAppDispatch()

  // Destruct const from redux state
  const { filters } = useAppSelector(state => state)
  // Bind setFeatures to dispatch, so it can be called without dispatch
  const { addFeature, removeFeature, addEventType, removeEventTypes, addAudience, removeAudience, setTypeId } = bindActionCreators(filterSlice.actions, dispatch)

  const [ typeIdState, setTypeIdState ] = useState(filters.typeId)
  const [ categoryGroups, setCategoryGroups ] = useState<{[key: string]: Array<CategoryDescriptor>}>({})
  const [ audiences, setAudiences ] = useState<Array<ICategory>>([])

  const handleTypeIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val: string = (event.target as HTMLInputElement).value
    if (!!typeIdState) {
      removeEventTypes(categoryGroups[typeIdState]?.reduce((acc: Array<string>, curr) => {
        return [...acc, ...curr.categories?.map(cat => cat.yso)]
      }, []));
    }
    setTypeIdState(val);
    setTypeId(val);
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

  const addSelectedCategory = (yso: string) => {
    addEventType(yso);
  }

  const removeSelectedCategory = (yso: string) => {
    removeEventTypes([yso]);
  }

  useEffect(() => {
    if (data) {
      const createYsoObjects = (keywordObjects:Array<object>): Array<ICategory> => (
        keywordObjects.map((thing:any) => (
          {
            name: thing.name,
            yso: thing.id  
          }
        ))      
      );
      
      const _categoryGroups = {
        "eventgeneral": [
          {
            title: t("content"),
            categories: createYsoObjects(data.data.find((item: any) => item.id === "turku:topic_content").keywords),
          },
          {
            title: t("eventType"),
            categories: createYsoObjects(data.data.find((item: any) => item.id === "turku:topic_type").keywords),
          }
        ],
        "eventhobbies": [
          {
            title: t("content"),
            categories: createYsoObjects(data.data.find((item: any) => item.id === "turku:hobbytopics").keywords),
          }
        ],
        "eventcourse": [
          {
            title: t("content"),
            categories: createYsoObjects(data.data.find((item: any) => item.id === "turku:coursetopics").keywords),
          }
        ]
      }       

      const _audiences = createYsoObjects(
        data.data
        .find((item: any) => item.id === "turku:audience").keywords
      );

      setCategoryGroups(_categoryGroups)
      setAudiences(_audiences)
    }
  }, [data, t])

  useEffect(() => {
    setTypeIdState(filters.typeId)
  }, [filters.typeId]);

  return (
    <div className={styles.container}>
      <Accordion title={`${t("what")}?`} icon={LocalActivityIcon}>
        <p
          style={{
            color: theme.palette.primary.dark,
            fontSize: 18,
            fontFamily: "halogen",
            fontWeight: 900,
          }}
        >
          <b>{t("contentType")}</b>
        </p>
        <div className={styles.rowWrap}>
          <RadioGroup
            row
            value={typeIdState}
            name="event-type-group"
            onChange={(e: any) => handleTypeIdChange(e)}
          >
            <FormControlLabel
              value="eventgeneral"
              control={<Radio />}
              label={
                <Typography sx={{ fontFamily: "forma-djr-micro, sans-serif" }}>
                  {t("events")}
                </Typography>
              }
            />
            <FormControlLabel
              value="eventhobbies"
              control={<Radio />}
              label={
                <Typography sx={{ fontFamily: "forma-djr-micro, sans-serif" }}>
                  {t("hobbies")}
                </Typography>
              }
            />
            <FormControlLabel
              value="eventcourse"
              control={<Radio />}
              label={
                <Typography sx={{ fontFamily: "forma-djr-micro, sans-serif" }}>
                  {t("educations")}
                </Typography>
              }
            />
          </RadioGroup>
        </div>

        {typeIdState && categoryGroups[typeIdState]?.map((group, index) => (
          <CategorySelector
            key={index}
            categories={group.categories}
            title={group.title}
            isLoading={isLoading}
            handleAdd={(yso) => {
              addSelectedCategory(yso);
            }}
            handleDelete={(yso) => {
              removeSelectedCategory(yso);
            }}
            selected={filters.eventTypes}
          />
        ))}
        <div className={styles.rowWrap}>
          <p
            style={{
              width: "100px",
              color: theme.palette.primary.dark,
              fontSize: 18,
              fontFamily: "halogen",
              fontWeight: 900,
              textTransform: "capitalize",
            }}
          >
            <b>{t("whom")}:</b>
          </p>
          <FormGroup row>
            {audiences.map((audience: any) => (
              <FormControlLabel
                key={audience.yso}
                control={<Checkbox />}
                label={
                  <Typography
                    sx={{ fontFamily: "forma-djr-micro, sans-serif" }}
                  >
                    {audience.name[i18n.language]}
                  </Typography>
                }
                style={{ width: "250px" }}
                value={audience.yso}
                onChange={(e: any) => handleAudienceChange(e)}
                checked={filters.audiences.includes(audience.yso)}
              />
            ))}
          </FormGroup>
        </div>
        <div className={styles.rowWrap}>
          <p
            style={{
              margin: "0 16px 0 0",
              color: theme.palette.primary.dark,
              fontSize: 18,
              fontFamily: "halogen",
              fontWeight: 900,
              textTransform: "capitalize",
            }}
          >
            <b>{t("feature")}:</b>
          </p>
          <FormGroup row>
            {features.map((feature) => (
              <FormControlLabel
                key={feature.label[i18n.language]}
                control={<Checkbox />}
                // @ts-ignore
                label={
                  <Typography
                    sx={{ fontFamily: "forma-djr-micro, sans-serif" }}
                  >
                    {feature.label[i18n.language]}
                  </Typography>
                }
                style={{ width: "140px" }}
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