import { createSlice } from "@reduxjs/toolkit";

const copySlice = createSlice({
  name: "clipboard",
  initialState: {
    value: ''
  },
  reducers: {
    copy(state, value) {
      state.value = value.payload
      navigator.clipboard.writeText(value.payload)
    }
  }
})
export default copySlice