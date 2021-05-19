import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDefinitionsCommand extends Command {
    execute(definitions) {
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            this.editor.model.insertContent( writer.createElement( 'definitionsPreview', { definitions } ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'definitionsPreview' );

        this.isEnabled = allowedIn !== null;
    }
}