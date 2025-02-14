import { Button, Flex, Upload } from "antd"
import TextArea from "antd/es/input/TextArea"
import { UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard, faPen } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import cypherSlice from "../../cypherSlice";
import { getCypherOutput, getMessageInput } from "../../../../redux/selectors";
import copySlice from "../../../reducers/copyReducer";
import noteSlice from "../NoteValue/noteReducer";
import NoteValue from "../NoteValue";

function ResultOutput() {
  const dispatch = useDispatch()
  const messageInput = useSelector(getMessageInput)
  const messageOutput = useSelector(getCypherOutput)

  function onInputChange(e) {
    dispatch(cypherSlice.actions.updateInput({ message: e.target.value }))
  }

  function onInputCopyButtonClick(e) {
    dispatch(copySlice.actions.copy(messageInput))
  }
  function onInputNoteButtonClick(e) {
    dispatch(noteSlice.actions.note(messageInput))
  }

  function onOutputCopyButtonClick(e) {
    dispatch(copySlice.actions.copy(messageOutput))
  }
  function onOutputNoteButtonClick(e) {
    dispatch(noteSlice.actions.note(messageOutput))
  }

  return (
    <div className='flex flex-col gap-3 border rounded-lg w-full p-3 bg-white shadow'>
      <NoteValue />

      <div className='w-full h-0.5 bg-gray-400'></div>

      <Flex className='gap-3'>
        <h1 className='text-xl font-bold'>Input</h1>
        <div className="flex-grow">
          <TextArea value={messageInput} className='resize-none' autoSize={{ minRows: 4, maxRows: 4 }} onChange={onInputChange} />
        </div>
        <Flex vertical className='gap-2'>
          <Upload>
            <Button size="large" variant="filled" color="blue">
              <UploadOutlined />
            </Button>
          </Upload>
          <Button color='primary' variant='filled' onClick={onInputCopyButtonClick}>
            <FontAwesomeIcon icon={faClipboard} />
          </Button>
          <Button color='primary' variant='filled' onClick={onInputNoteButtonClick}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </Flex>
      </Flex>

      <div className='w-full h-0.5 bg-gray-400'></div>

      <div className='gap-3 grid grid-cols-[50px_1fr_auto]'>
        <h1 className='text-xl font-bold'>Value</h1>
        <p className='rounded-lg px-2 py-1 w-full border-1 border-gray-300 bg-slate-50 text-black'>
          {messageOutput}
        </p>

        <Flex vertical className='gap-2'>
          <Button color='primary' variant='filled' onClick={onOutputCopyButtonClick}>
            <FontAwesomeIcon icon={faClipboard} />
          </Button>
          <Button color='primary' variant='filled' onClick={onOutputNoteButtonClick}>
            <FontAwesomeIcon icon={faPen} />
          </Button>
        </Flex>
      </div>
    </div>
  )
}

export default ResultOutput