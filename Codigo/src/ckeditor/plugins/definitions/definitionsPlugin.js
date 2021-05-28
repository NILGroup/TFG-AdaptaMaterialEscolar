import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import InsertDefinitionsCommand from './insertDefinitionsCommand';


export default class DefinitionsPlugin extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertDefinitions', new InsertDefinitionsCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'definitionsPreview', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$text',

            isInline: false,

            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
            allowAttributes: [ 'definitions' ]
        } );

        schema.register( 'definitionsText', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$text',

            isBlock: true

            // Each product preview has an ID. A unique ID tells the application which
            // product it represents and makes it possible to render it inside a widget.
        } );

        schema.register( 'definitionsSameLine', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$text',

            isInline: true

        } );

        schema.register( 'definitionsLine', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            allowWhere: '$text',

            isInline: true,

            styles: {
                'width': '300px',
                'border-bottom': '1px solid black'
            }

        } );

        schema.register( 'definitionsLineMore', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            allowWhere: '$text',

            isInline: true,

            styles: {
                'width': '300px',
                'border-bottom': '1px solid black'
            }

        } );
    }

    _defineConverters() {
        const editor = this.editor;
        const conversion = editor.conversion;

        conversion.elementToElement( {
            model: 'definitionsSameLine',
            view: {
                name: 'span',
                classes: 'definitions-same-line'
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'definitionsLine',
            view: {
                name: 'div',
                classes: 'definitions-line'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'definitionsLine',
            view: {
                name: 'hola',
                classes: 'definitions-line'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'definitionsLine',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'div', { class: 'definitions-line' } );

                return toWidget( section, viewWriter, { label: 'line' } );
            }
        } );

        conversion.for( 'upcast' ).elementToElement( {
            model: 'definitionsLineMore',
            view: {
                name: 'div',
                classes: 'definitions-line-more'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'definitionsLineMore',
            view: {
                name: 'hola',
                classes: 'definitions-line-more'
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'definitionsLineMore',
            view: ( modelElement, { writer: viewWriter } ) => {
                const section = viewWriter.createContainerElement( 'div', { class: 'definitions-line-more' } );

                return toWidget( section, viewWriter, { label: 'line' } );
            }
        } );
    }
}