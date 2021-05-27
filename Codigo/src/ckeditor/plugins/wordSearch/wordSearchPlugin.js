import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import { toWidget, toWidgetEditable,
    viewToModelPositionOutsideModelElement} from '@ckeditor/ckeditor5-widget/src/utils';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import InsertWordSearchCommand from './insertWordSearchCommand';
import WordSearch from '../../../components/wordSearch/wordSearch';

export default class WordSearchPlugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertWordSearch', new InsertWordSearchCommand( this.editor ) );

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'placeholder' ) )
        );
    }

  /*  _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'wordSearchPreview', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',

            isInline: false

            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
           // allowAttributes: [ 'name' ]
        } 
        
        );

        schema.register( 'wordSearchRow', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: false,
            isBlock: false,
            allowIn: "wordSearchPreview",
            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',

            isInline: false
        } 
        
        );

        schema.register( 'wordSearchCell', {
            // Cannot be split or left by the caret.
            isLimit: true,
            isObject: false,
            allowIn: 'wordSearchRow',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$text',
            
            allowAttributes: ['name']
        } );


    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <simpleBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'wordSearchPreview',
            view: {
                name: 'table',
                classes: 'simple-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'wordSearchPreview',
            view: {
                name: 'hola',
                classes: 'simple-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'wordSearchPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'table', { class: 'simple-box' } );

                return toWidget( section, viewWriter, { label: 'simple box widget' } );
            }
        } );

        conversion.elementToElement( {
            model: 'wordSearchRow',
            view: {
                name: 'tr',
                classes: 'simple-box-title'
            }
        } );

        // <simpleBoxTitle> converters
        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'th',
                classes: 'simple-box-title'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                // Extract the "name" from "{name}".
                const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

                return modelWriter.createElement( 'wordSearchCell', { name } );
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'wordSearchCell',
            view: ( modelItem, { writer: viewWriter } ) => {
                const widgetElement = createPlaceholderView( modelItem, viewWriter );

                // Enable widget handling on a placeholder element inside the editing view.
                return toWidget( widgetElement, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'wordSearchCell',
            view: ( modelItem, { writer: viewWriter } ) => createPlaceholderView( modelItem, viewWriter )
        } );


        function createPlaceholderView( modelItem, viewWriter ) {
            const name = modelItem.getAttribute( 'name' );

            const placeholderView = viewWriter.createEditableElement( 'th', {
                class: 'wordSearchCell'
            }, {
                isAllowedInsideAttributeElement: true
            } );

            // Insert the placeholder name (as a text).
            const innerText = viewWriter.createText( name );
            viewWriter.insert( viewWriter.createPositionAt( placeholderView, 1 ), innerText );

            return placeholderView;
        }
    }*/

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'wordSearchPreview', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$text',

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
                return modelWriter.createElement( 'wordSearchPreview', {
                    id: parseInt( viewElement.getAttribute( 'data-characters' ) )
                } );
            }
        } );

        // <productPreview> converters (model → data view)
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'wordSearchPreview',
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
            model: 'wordSearchPreview',
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
                const section = viewWriter.createContainerElement( 'div', {
                    class: 'table board'
                } );

                // The inner <div class="product__react-wrapper"></div> element.
                // This element will host a React <ProductPreview /> component.
                const reactWrapper = viewWriter.createRawElement( 'div', {
                    class: 'wordSearch__react-wrapper'
                }, function( domElement ) {
                    // This the place where React renders the actual product preview hosted
                    // by a UIElement in the view. You are using a function (renderer) passed
                    ReactDOM.render(
                        <Provider store={ store }>
                            <WordSearch data={id}/>
                        </Provider>
                        ,
                        domElement
                    );
                } );

                viewWriter.insert( viewWriter.createPositionAt( section, 0 ), reactWrapper );

                return toWidget( section, viewWriter, { label: 'wordsearch preview widget' } );
            }
        } );
    }
}