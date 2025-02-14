import { useDispatch, useSelector } from "react-redux"

import cypherSlice from "../../cypherSlice"
import { getRSAInput } from "../../../../redux/selectors"
import { findNextPrime, isPrime } from "../../../../utilities/number"
import { InputNumber } from "antd"
import { checkE, findNextD, findNextE } from "../../../../utilities/rsa"
import { useEffect, useMemo } from "react"

function KeyResult({ value = [] }) {
  return (
    <div className="w-full">
      {/* {value.map((i,j)=>)} */}
      <p className="text-lg">
        ({value.join(', ')})
      </p>
    </div>

  )
}

function CInput({ ...props }) {
  return (
    <input {...props} className={[props.className, props.disabled ? 'opacity-60' : '', "border rounded-md border-gray-300 px-3 h-7 w-25 focus:outline-none"].join(' ')} />
  )
}

function RSAInput() {
  const dispatch = useDispatch()
  const message = JSON.parse(useSelector(getRSAInput))
  const enableE_D = useMemo(
    () => isPrime(message.q) && isPrime(message.p) && message.psuedoPrime > 2,
    [message.q, message.p, message.psuedoPrime])

  useEffect(function () {
    dispatch(cypherSlice.actions.updateRSA())
  }, [message.q, message.p])

  function onPChange(e) {
    const value = +e.target.value
    const _prime = findNextPrime(value, value < message.p)
    dispatch(cypherSlice.actions.updateInput({ p: _prime }))
  }

  function onQChange(e) {
    const value = +e.target.value
    const _prime = findNextPrime(value, value < message.q)
    dispatch(cypherSlice.actions.updateInput({ q: _prime }))
  }

  function onEChange(e) {
    const value = +e.target.value
    const _e = findNextE(message.psuedoPrime, value, value < message.e)
    const _d = findNextD(message.psuedoPrime, _e)

    dispatch(cypherSlice.actions.updateInput({ e: _e, d: _d }))
  }

  function onDChange(e) {
    const value = +e.target.value;
    const _d = findNextD(message.psuedoPrime, message.e, value, value < message.d)
    dispatch(cypherSlice.actions.updateInput({ d: _d }))
  }

  return (
    <div className="flex gap-20">
      <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-3">
        <h1 className="text-xl font-bold">P:</h1>
        <CInput onChange={onPChange} type="number" value={message.p} />

        <h1 className="text-xl font-bold">Q:</h1>
        <CInput onChange={onQChange} type="number" value={message.q} />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-3">
        <h1 className="text-xl font-bold">E:</h1>
        <CInput onChange={onEChange} type="number" disabled={!enableE_D} value={message.e} />
        <h1 className="text-xl font-bold">D:</h1>
        <CInput onChange={onDChange} type="number" disabled={!enableE_D} value={message.d} />
      </div>
      <div className="flex-grow grid grid-cols-2">
        <div>
          <h1 className="font-bold text-xl">Public Key</h1>
          <KeyResult value={[message.n, message.e]} />
        </div>
        <div>
          <h1 className="font-bold text-xl">Private Key</h1>
          <KeyResult value={[message.n, message.d]} />
        </div>
      </div>
    </div>
  )
}

export default RSAInput