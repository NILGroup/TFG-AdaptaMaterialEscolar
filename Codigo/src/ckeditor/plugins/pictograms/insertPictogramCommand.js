import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertPictogramCommand extends Command {
    execute( url ) {
        this.editor.model.change( writer => {

            let image = writer.createElement('image', {src: url});
            this.editor.model.insertContent( image );
            writer.setSelection(image, 'on');
            this.editor.execute( 'imageStyle', { value: 'side' } );
          
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'pictogramPreview' );

        this.isEnabled = allowedIn !== null;
    }
}