import { Select } from "antd"
import { alphabetOptions } from "../../../../utilities/crypto"
import cypherSlice from "../../cypherSlice"
import { useDispatch, useSelector } from "react-redux"
import { getCypherAlphabet, getCypherName } from "../../../../redux/selectors"

function AlphabetSettings() {
  const dispatch = useDispatch()
  const cipherName = useSelector(getCypherName)

  function onChangeAlphabet(e) {
    dispatch(cypherSlice.actions.setAlphabet(e))
  }

  return (
    <div className="border rounded-lg w-full p-4 bg-white shadow flex gap-3">
      <h1 className="text-xl font-bold">Alphabets:</h1>
      <Select
        disabled={['rsa', 'aes', 'des'].includes(cipherName)}
        mode="multiple"
        className="w-full"
        defaultValue={alphabetOptions}
        value={useSelector(getCypherAlphabet)}
        onChange={onChangeAlphabet}
        options={alphabetOptions.map(i => ({ value: i, label: i }))} />
    </div>
  )
}

export default AlphabetSettings