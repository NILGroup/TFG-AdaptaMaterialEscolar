import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import InsertDevelopCommand from './insertDevelopCommand';
import Develop from '../../../components/exerciseDevelop/develop';

export default class DevelopPlugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertDevelop', new InsertDevelopCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'developPreview', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$text',

            isInline: false,

            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
            allowAttributes: [ 'develop' ]
        } );

        schema.register( 'developRow', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block',

            isInline: false,

            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
            allowAttributes: [ 'develop' ]
        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;

        // <productPreview> converters ((data) view → model)
        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'div',
                classes: 'div'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                // Read the "data-id" attribute from the view and set it as the "id" in the model.
                return modelWriter.createElement( 'developPreview', {
                    id: parseInt( viewElement.getAttribute( 'data-develop' ) )
                } );
            }
        } );

        // <productPreview> converters (model → data view)
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'developPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                // In the data view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="..."></section>
                return viewWriter.createEmptyElement( 'div', {
                    class: 'develop'
                } );
            }
        } );

        // <productPreview> converters (model → editing view)
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'developPreview',
            view: ( modelElement, { writer: viewWriter } ) => {
                // In the editing view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="...">
                //     <div class="product__react-wrapper">
                //         <ProductPreview /> (React component)
                //     </div>
                // </section>
                const id = modelElement.getAttribute( 'develop' );

                // The outermost <section class="product" data-id="..."></section> element.
                const section = viewWriter.createContainerElement( 'div', {
                    class: 'develop'
                } );

    
                // The inner <div class="product__react-wrapper"></div> element.
                // This element will host a React <ProductPreview /> component.
                const reactWrapper = viewWriter.createRawElement( 'div', {
                    class: 'develop__react-wrapper'
                }, function( domElement ) {
                    // This the place where React renders the actual product preview hosted
                    // by a UIElement in the view. You are using a function (renderer) passed
                    ReactDOM.render(
                        <Provider store={ store }>
                            <Develop data={id}/>
                            {id.addHowToSolve ?
                            <div className="howToResolveExampleDev">
                                <p><u>Cómo resolver el ejercicio:</u> Tienes que escribir lo que pide el enunciado usando como máximo {id.numLines} {parseInt(id.numLines) === 1 ? "línea" : "líneas"} (no es necesario rellenar {parseInt(id.numLines) === 1 ? "toda la línea" : "todas las líneas"})</p>
                            </div>
                            : null}
                            <br/>
                        </Provider>
                        ,
                        domElement
                    );
                } );

      //          viewWriter.insert( viewWriter.createPositionAt( section, 0 ), reactWrapper );

                return toWidget( section, viewWriter, { label: 'develop preview widget' } );
            }
        } );
    }
}