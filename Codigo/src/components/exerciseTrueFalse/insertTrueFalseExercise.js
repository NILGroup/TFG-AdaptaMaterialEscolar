import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertTrueFalseExercise extends Command {
    convertText(sentences){
        sentences = sentences.split('\n');
        sentences.forEach(function(element, counter = 1) {
            contador + ". " + element + "\n";
            counter++;
        });

        return sentences
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