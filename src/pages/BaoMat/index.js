import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CypherInput from './components/CypherInput';
import GlobalSettings from './components/GlobalSettings';
import ResultOutput from './components/ResultOutput';
import AlphabetSettings from './components/AlphabetSettings';
import { Flex } from 'antd';
import NoteValue from './components/NoteValue';

function BaoMatPage() {
  useEffect(function () {
  }, [])

  return (
    <div className='flex gap-5 flex-col w-screen h-screen bg-slate-500 p-40'>
      <GlobalSettings />
      <AlphabetSettings />
      <CypherInput />
      <ResultOutput />
    </div>
  )
}
export default BaoMatPage