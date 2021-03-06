import React from 'react'
import TextArea from './../../util/textArea/TextArea';

function Editor({text, closeEditor, saveEditedText}) {
  const [editedText, setEditedText] = React.useState(text)

  const textHandler = (e) => {
    setEditedText(e.target.value)
  }

  return (
    <div className="editor">
      <TextArea onChange={textHandler} value={editedText} />
      <div className="button-group">
        <button className="btn blue" onClick={() => saveEditedText(editedText)}>Save</button>
        <button className="btn red" onClick={closeEditor}>Cancel</button>
      </div>
    </div>
  )
}

export default Editor
