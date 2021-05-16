
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import InsertTrueFalseCommand from './insertTrueFalseCommand';
import TrueFalse from '../../../components/wordSearch/wordSearch';

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

        schema.register( 'trueFalsePreview', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',

            isInline: true,

            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
            allowAttributes: [ 'characters' ]
        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;

        // <productPreview> converters ((data) view → model)
        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'table',
                classes: 'table'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                // Read the "data-id" attribute from the view and set it as the "id" in the model.
                return modelWriter.createElement( 'trueFalsePreview', {
                    id: parseInt( viewElement.getAttribute( 'data-characters' ) )
                } );
            }
        } );

        // <productPreview> converters (model → data view)
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'trueFalsePreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                // In the data view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="..."></section>
                return viewWriter.createEmptyElement( 'table', {
                    class: 'table',
                } );
            }
        } );

        // <productPreview> converters (model → editing view)
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'trueFalsePreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                // In the editing view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="...">
                //     <div class="product__react-wrapper">
                //         <ProductPreview /> (React component)
                //     </div>
                // </section>
                const id = modelElement.getAttribute( 'characters' );

                // The outermost <section class="product" data-id="..."></section> element.
                const section = viewWriter.createContainerElement( 'table', {
                    class: 'table'
                } );

                // The inner <div class="product__react-wrapper"></div> element.
                // This element will host a React <ProductPreview /> component.
                const reactWrapper = viewWriter.createRawElement( 'div', {
                    class: 'trueFalse__react-wrapper'
                }, function( domElement ) {
                    // This the place where React renders the actual product preview hosted
                    // by a UIElement in the view. You are using a function (renderer) passed
                    
                    console.log(id);
                    ReactDOM.render(
                        <Provider store={ store }>
                            <TrueFalse data={id}/>
                        </Provider>
                        ,
                        domElement
                    );
                } );

                viewWriter.insert( viewWriter.createPositionAt( section, 0 ), reactWrapper );

                return toWidget( section, viewWriter, { label: 'trueFalse preview widget' } );
            }
        } );
    }
}