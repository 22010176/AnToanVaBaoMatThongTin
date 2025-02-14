import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "note",
  initialState: { value: '' },
  reducers: {
    note(state, action) {
      state.value = action.payload || ''
    }
  }
})

export default noteSlice