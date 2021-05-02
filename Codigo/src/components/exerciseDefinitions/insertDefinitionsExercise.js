import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDefinitionsExercise extends Command {
    convertText(definitions, numLines){
        sentences = sentences.split(',');
        sentences.forEach(function(element, counter = 1) {
            contador + ". " + element + " :";
            line = "";
            for (let i = 0; i < (10 * numLines); i++){
                line += '________';
            }
            sentences += '\n';
            counter++;
        });
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