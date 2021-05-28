import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertFillGapsCommand extends Command {
    execute( truefalse ) {
        this.editor.model.change( writer => {
     
            let text = "";
            truefalse.text.forEach(t => {
                text+= t + " ";
            })
            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            const enunciado = writer.createElement('paragraph', insertPosition);
            
            writer.insertText(text, enunciado);
            this.editor.model.insertContent(enunciado);
            if(truefalse.addHowToSolve){
                const howTo = writer.createElement('paragraph');
                writer.insertText("Cómo resolver: rellenar los huecos....", howTo, "end");
            }
            this.editor.execute('shiftEnter');
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'trueFalsePreview' );

        this.isEnabled = allowedIn !== null;
    }
}