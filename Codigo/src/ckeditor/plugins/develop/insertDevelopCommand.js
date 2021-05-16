import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDevelopCommand extends Command {
    execute( url ) {
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            this.editor.model.insertContent( writer.createElement( 'developPreview', { url } ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'developPreview' );

        this.isEnabled = allowedIn !== null;
    }
}