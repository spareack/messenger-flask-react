import React, {useState, useEffect} from 'react';
import './App.css';
import DialogsField from './components/DialogField';
import WorkSpace from './components/workWindow';

function Messenger() {
  const [currentDialog, setCurrentDialog] = useState(0)
  const user = true;

  return (
    <div className="App">
      <DialogsField setDialog={setCurrentDialog}/>
      <WorkSpace id={currentDialog}/>
    </div>
  );
}

export default Messenger;
