import React, {useState, useEffect} from 'react';
import './App.css';
import DialogsField from './components/DialogField';
import WorkSpace from './components/workSpace';

function Messenger({dialogs}) {
  const [currentDialog, setCurrentDialog] = useState(0)
  
  return (
    <div className="App">
      <DialogsField setDialog={setCurrentDialog} dialogs={dialogs}/>
      <WorkSpace id={currentDialog} talks={dialogs[currentDialog].talks}/>
    </div>
  );
}

export default Messenger;
