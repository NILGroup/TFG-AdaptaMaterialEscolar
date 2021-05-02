import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDevelopExercise extends Command {
    convertText(text, numLines){
        for (let i = 0; i < (10 * numLines); i++)
            lines += '________';
      
        text += '\n\n' + lines;

        return definitions
    }
    execute( text ) {
        this.editor.model.change( writer => {
            this.editor.model.insertContent( writer.createElement( text ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        this.isEnabled = allowedIn !== null;
    }
}