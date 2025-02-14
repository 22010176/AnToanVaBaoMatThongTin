import { configureStore } from "@reduxjs/toolkit";

import copySlice from "../pages/reducers/copyReducer";
import noteSlice from "../pages/BaoMat/components/NoteValue/noteReducer";
import logger from "redux-logger";
import cypherSlice from "../pages/BaoMat/cypherSlice";

const store = configureStore({
  reducer: {
    cypher: cypherSlice.reducer,
    copy: copySlice.reducer,
    note: noteSlice.reducer
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(logger)
  }
})

export default store;