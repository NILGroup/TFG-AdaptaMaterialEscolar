import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import InsertFillGapsCommand from './insertFillGapsCommand';
import TrueFalse from '../../../components/exerciseTrueFalse/trueFalse';

export default class FillGapsPlugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {

        this.editor.commands.add( 'insertFillGaps', new InsertFillGapsCommand( this.editor ) );
    }

}