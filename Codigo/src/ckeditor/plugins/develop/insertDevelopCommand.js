import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDevelopCommand extends Command {
    execute( develop ) {
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            const enunciado = writer.createElement('paragraph', insertPosition);
            
            writer.insertText(develop.text, enunciado);
            this.editor.model.insertContent(enunciado);
            let linea = undefined;
            for(let i = 0; i < develop.numLines; i++){
                linea = writer.createElement('definitionsLine');
                this.editor.model.insertContent(linea);
            }
            const howTo = writer.createElement('paragraph');
            let endText = " ";
            if(develop.addHowToSolve){
                endText = "Cómo resolver el ejercicio: Primero busca una de las palabras en la sopa de letras. Ten en cuenta que las palabras pueden estar escondidas en vertical, horizontal y/o diagonal, y es posible que algunas estén escritas al revés. Cuando hayas encontrado la palabra, rodéala.";
            }
            writer.insertText(endText, howTo, "end");
            this.editor.model.insertContent(howTo,  writer.createPositionAt( linea, "after"));
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'developPreview' );

        this.isEnabled = allowedIn !== null;
    }
}