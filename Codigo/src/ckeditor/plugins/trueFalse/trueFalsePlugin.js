import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import InsertTrueFalseCommand from './insertTrueFalseCommand';
import TrueFalse from '../../../components/exerciseTrueFalse/trueFalse';

export default class TrueFalselugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertTrueFalse', new InsertTrueFalseCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'trueFalseBox', {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // The placeholder will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
            isObject: true,
        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;

        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: [ 'trueFalseBox' ]
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                return modelWriter.createElement('trueFalseBox');
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'trueFalseBox',
            view: ( modelItem, { writer: viewWriter } ) => {
                const widgetElement = viewWriter.createContainerElement( 'span', {
                    class: 'trueFalseBox'
                }, {
                    isAllowedInsideAttributeElement: true
                } );
    

                // Enable widget handling on a placeholder element inside the editing view.
                return toWidget( widgetElement, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'trueFalseBox',
            view: ( modelItem, { writer: viewWriter } ) => viewWriter.createContainerElement( 'span', {
                class: 'trueFalseBox'
            }, {
                isAllowedInsideAttributeElement: true
            })
        });
    }
}