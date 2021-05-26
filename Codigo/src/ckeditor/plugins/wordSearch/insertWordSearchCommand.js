import Command from '@ckeditor/ckeditor5-core/src/command';


export default class InsertWordSearchCommand extends Command {
    execute(characters) {
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            const simpleBox = writer.createElement( 'wordSearchPreview' );
            characters.forEach(row => {
                const simpleBoxTitle = writer.createElement( 'wordSearchRow' );
                row.forEach(cell =>{
                    const simpleBoxCell = writer.createElement( 'wordSearchCell', {name: cell} );
                    writer.append( simpleBoxCell, simpleBoxTitle );
                });
                writer.append( simpleBoxTitle, simpleBox );
            });
            this.editor.model.insertContent( simpleBox );            
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'wordSearchPreview' );

        this.isEnabled = allowedIn !== null;
    }
}