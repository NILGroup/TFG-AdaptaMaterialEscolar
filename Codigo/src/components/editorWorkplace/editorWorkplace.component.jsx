import React from 'react';
import './editor.styles.scss'
//import FillWords from '../rellenarPalabrasPlugin/fillWords';
import Toolbar from '../toolBar/toolbar.component';
import Editor from '../editor/editor.component';
import DocumentLoaded from '../document/document.component';
class EditorWorkplace extends React.Component{

    render() {
        return (<div className='editor-container'>
        <DocumentLoaded/>
        <div className='editor-half'>
        <Toolbar/>
        <Editor/>
        </div>
    </div>);
    }
}

export default EditorWorkplace;