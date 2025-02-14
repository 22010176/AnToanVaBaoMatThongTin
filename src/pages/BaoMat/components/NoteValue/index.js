import { useSelector } from "react-redux"
import { getNote } from "../../../../redux/selectors"

function NoteValue() {
  return (
    <div className="rounded w-full flex gap-3 items-center">
      <h1 className="text-xl font-bold">Note:</h1>
      <p className="border w-full border-gray-200 h-8 rounded px-2 py-1">{useSelector(getNote)}</p>
    </div>
  )
}

export default NoteValue