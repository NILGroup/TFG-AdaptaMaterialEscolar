import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDefinitionsCommand extends Command {
    execute(definitions) {
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            const enunciado = writer.createElement('paragraph', insertPosition);
            
            writer.insertText("Define los siguientes conceptos: ", enunciado);
            
            this.editor.model.insertContent(enunciado);
            let definition;
            let linea = undefined;
            definitions.text.forEach(t => {
                definition = writer.createElement('paragraph');
                writer.insertText(t, definition);
                if(linea === undefined)
                    this.editor.model.insertContent(definition, writer.createPositionAfter(enunciado));
                else
                    this.editor.model.insertContent(definition, writer.createPositionAfter(linea));

                for(let i = 0; i < definitions.numLines; i++){
                    linea = writer.createElement('definitionsLine');
                    this.editor.model.insertContent(linea, writer.createPositionAfter(definition));
                }

            });

            if(definitions.addHowToSolve){
                const howTo = writer.createElement('paragraph');
                writer.insertText("Cómo resolver el ejercicio: Tienes que definir cada concepto usando como máximo " + definitions.numLines + " líneas para cada uno de ellos (no es necesario rellenar todas)", howTo, "end");
                this.editor.model.insertContent(howTo, writer.createPositionAfter(linea));
            }

        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'definitionsPreview' );

        this.isEnabled = allowedIn !== null;
    }
}