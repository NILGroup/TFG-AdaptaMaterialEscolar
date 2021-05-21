import React from 'react';
//import './editor.styles.scss'
//import FillWords from '../rellenarPalabrasPlugin/fillWords';
import Toolbar from '../toolBar/toolbar.component';
import FillGapsButton from '../fillGapsButton/fillGapsButton';
import Editor from '../editor/editor.component';
import Document from '../document/document.component';
class EditorWorkplace extends React.Component{

    render() {
        return (<div className='editor-container'>
        <div className="editor-container__pdf">
            <Document/>
        </div>
        <div className='editor-half'>
            <Toolbar/>
            <Editor/>
        </div>
        
    </div>);
    }
}

export default EditorWorkplace;