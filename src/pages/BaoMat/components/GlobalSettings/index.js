import { Button, Flex, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"

import { cypherName } from "../../../../utilities/crypto"
import cypherSlice, { fetchAESDescript, fetchAESEnscript, fetchDESDescript, fetchDESEnscript, fetchDESResult } from "../../cypherSlice"
import { getCaesarInput, getCipherInput, getCypher, getCypherName } from "../../../../redux/selectors"
import { useCallback, useMemo } from "react"

function GlobalSettings({ }) {
  const dispatch = useDispatch()
  const cinput = JSON.parse(useSelector(getCipherInput))
  const nameCypher = useSelector(getCypherName)

  function changeCypherMode(e) {
    dispatch(cypherSlice.actions.changeCypher(e))
    dispatch(cypherSlice.actions.resetInput())
  }

  function enscriptOnClick(e) {
    switch (nameCypher) {
      case 'caesar':
      case 'hill':
      case 'vigenere':
      case 'affine':
        dispatch(cypherSlice.actions.enscriptClassic(cinput))
        break
      case 'des':
        dispatch(fetchDESEnscript(cinput))
        break
      case 'aes':
        dispatch(fetchAESEnscript(cinput))
        break;
      case 'rsa':
        dispatch(cypherSlice.actions.rsaEncrypt())
        break
    }
  }

  function descriptOnClick(e) {
    switch (nameCypher) {
      case 'caesar':
      case 'hill':
      case 'vigenere':
      case 'affine':
        dispatch(cypherSlice.actions.descriptClassic(cinput))
        break
      case 'des':
        dispatch(fetchDESDescript(cinput))
        break
      case 'aes':
        dispatch(fetchAESDescript(cinput))
        break
      case 'rsa':
        dispatch(cypherSlice.actions.rsaDecrypt())
        break
    }
  }

  return (
    <Flex className='w-full gap-2'>
      <Select
        className='w-36'
        value={nameCypher}
        onChange={changeCypherMode}
        options={cypherName.map(i => ({ value: i.lower, label: i.cap }))} />
      <Button variant='filled' color='cyan' onClick={enscriptOnClick}>Enscript</Button>
      <Button variant='filled' color='red' onClick={descriptOnClick}>Descript</Button>
    </Flex>
  )
}

export default GlobalSettings 