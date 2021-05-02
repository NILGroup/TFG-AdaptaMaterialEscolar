import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import './editor.styles.scss'
import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import ExportPdf from '@ckeditor/ckeditor5-export-pdf/src/exportpdf';

import PictogramEditing from '../pictoPlugin/pictogramEditing';
//import FillWords from '../rellenarPalabrasPlugin/fillWords';
class Editor extends React.Component{
    
    constructor(){
        super();
        this.state = {editorData: "<p>Hola</p>"};
        this.handleEditorDataChange = this.handleEditorDataChange.bind( this );
        this.editor = null;
        this.editorConfig = {
            language: 'es',
            plugins: [Essentials, Heading, Bold, Italic, Underline,
                    Link, Paragraph, Table, TableToolbar, PictogramEditing, Alignment
                ],
            toolbar: [  'exportPdf', '|',
                        'heading',
                        '|',
                        'bold', 'italic', 'underline',
                        '|',
                        'link', 'insertTable',
                        '|',
                        'undo', 'redo', 'alignment'
            ],
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells'
                ]
            }
        }
    }

    

    handleEditorDataChange( evt, editor ) {
        console.log(editor.getData());
        this.setState( {
            editorData: editor.getData()
        } );
    }


    searchFunc = (url) => {
            this.editor.execute( 'insertPictogram', url );
            this.editor.editing.view.focus();
    }

    render() {
        return (
        <div className="document-editor">
            <div className="document-editor__toolbar"></div>
            <div className="document-editor__editable-container">
            <CKEditor editor={DecoupledEditor} 
                data={this.state.editorData} 
                config={this.editorConfig} 
                onChange={this.handleEditorDataChange} 
                onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );

                    // Insert the toolbar before the editable area.
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                    this.editor = editor;
            } }/>
        </div>
    </div>);
    }
}

export default Editor;