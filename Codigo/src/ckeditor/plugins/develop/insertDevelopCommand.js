import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDevelopCommand extends Command {
    execute( develop ) {
        const selection = this.editor.model.document.selection;
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            let attributes = Object.fromEntries( selection.getAttributes());
            let fontType = attributes.fontFamily;
            const enunciado = writer.createElement('paragraph');
            
            writer.insertText(develop.text, enunciado);
            this.editor.model.insertContent(enunciado);
            let linea = undefined;
            for(let i = 0; i < develop.numLines; i++){
                if(!develop.extraspace)
                    linea = writer.createElement('definitionsLine');
                else
                    linea = writer.createElement('definitionsLineMore');
                this.editor.model.insertContent(linea);
            }
            const howTo = writer.createElement('paragraph');
            let endText = " ";
            if(develop.addHowToSolve){
                endText = "Escribe en las líneas la definición.";
            }
            writer.insertText(endText, howTo, "end");
            this.editor.model.insertContent(howTo,  writer.createPositionAt( linea, "after"));
            const range = writer.createRange( writer.createPositionBefore(enunciado), writer.createPositionAfter(howTo) );
            writer.setSelection( range );
            this.editor.execute('fontFamily', {value: fontType});
            writer.setSelection(howTo, 'in');
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'developPreview' );

        this.isEnabled = allowedIn !== null;
    }
}