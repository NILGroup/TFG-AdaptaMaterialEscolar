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
import {editorInstance} from '../../ckeditor/editor/CkEditor';
import PictogramEditing from '../../ckeditor/plugins/pictograms/pictogramEditing';
import { createStructuredSelector } from 'reselect';
import { selectEditorClass } from '../../redux/editor/editor.selectors';
import { connect } from 'react-redux';
import { setEditor } from '../../redux/editor/editor.actions';
import WordSearchActionTypes from '../../redux/wordSearch/wordsearch.types';
import WordSearchPlugin from '../../ckeditor/plugins/wordSearch/wordSearchPlugin';
import DefinitionsPlugin from '../../ckeditor/plugins/definitions/definitionsPlugin';
import TrueFalsePlugin from '../../ckeditor/plugins/trueFalse/trueFalsePlugin';
import DevelopPlugin from '../../ckeditor/plugins/develop/developPlugin';
//import FillWords from '../rellenarPalabrasPlugin/fillWords';
class Editor extends React.Component{
    
    constructor(props){
        super();
        this.state = {editorData: "<p>Hola</p><hr>"};
        this.handleEditorDataChange = this.handleEditorDataChange.bind( this );
        this.editor = props.editor;
        this.editorConfig = {
            language: 'es',
            plugins: [Essentials, Heading, Bold, Italic, Underline,
                    Link, Paragraph, Table, TableToolbar, PictogramEditing, Alignment, WordSearchPlugin, DefinitionsPlugin, TrueFalsePlugin, DevelopPlugin
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
            <div className="document-editor__editable-container">
            <CKEditor editor={DecoupledEditor} 
                data={this.state.editorData} 
                config={this.editorConfig} 
                onChange={this.handleEditorDataChange} 
                onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                    editor.ui.getEditableElement().parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.getEditableElement()
                    );
                    this.props.setEditor(editor);
            } }/>
        </div>
    </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    editor: selectEditorClass
})

const mapDispatchToProps = (dispatch) => ({
    setEditor: (editor) => dispatch(setEditor(editor))
})
export default connect(mapStateToProps, mapDispatchToProps)(Editor);