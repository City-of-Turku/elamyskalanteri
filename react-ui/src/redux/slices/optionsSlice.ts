import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface OptionsState {
    title: string | null
    description: string | null
    style: string
    listView: string
    numOfView: number | null
    hideSearchCriteria: boolean,
    languageSelection: string,
    linkContainer: string | null
}

const initialState: OptionsState = {
    title: null,
    description: null,
    style: "vinkTheme",
    listView: "grid",
    numOfView: null,
    hideSearchCriteria: false,
    languageSelection: "fi",
    linkContainer: null
}

export const optionsSlice = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string | null>) => {
            state.title = action.payload
        },
        setDescription: (state, action: PayloadAction<string | null>) => {
            state.description = action.payload
        },
        setStyle: (state, action: PayloadAction<string>) => {
            state.style = action.payload
        },
        setListView: (state, action: PayloadAction<string>) => {
            state.listView = action.payload
        },
        setNumOfView: (state, action: PayloadAction<number | null>) => {
            state.numOfView = action.payload
        },
        setHideSearchCriteria: (state, action: PayloadAction<boolean>) => {
            state.hideSearchCriteria = action.payload
        },
        setLanguageSelection: (state, action: PayloadAction<string>) => {
            state.languageSelection = action.payload
            console.log("lang", action.payload)
        },
        setLinkContainer: (state, action: PayloadAction<string>) => {
            state.linkContainer = action.payload
            console.log("linkContainer", action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
//export const { setTitle, setDescription, setStyle, setListView, setNumOfView, setHideSearchCriteria } = optionsSlice.actions

export default optionsSlice