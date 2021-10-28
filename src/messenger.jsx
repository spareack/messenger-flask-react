import React, {useState, useEffect} from 'react';
import './App.css';
import DialogsField from './components/DialogField';
import WorkSpace from './components/workSpace';

function Messenger({dialogs, setLoggedOut}) {
  const [currentDialog, setCurrentDialog] = useState(0)
  const [currentTalk, setCurrentTalk] = useState(0)

  return (
    <div className="App">
      <DialogsField setDialog={setCurrentDialog} dialogs={dialogs} currentDialog={currentDialog} setTalk={setCurrentTalk} setLoggedOut={setLoggedOut}/>
      <WorkSpace id={currentDialog} companion={dialogs[currentDialog]} talks={dialogs[currentDialog].talks} currentTalk={currentTalk} setTalk={setCurrentTalk}/>
    </div>
  );
}

export default Messenger;
