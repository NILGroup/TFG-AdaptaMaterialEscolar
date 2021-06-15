import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDefinitionsCommand extends Command {
    execute(definitions) {
        const selection = this.editor.model.document.selection;
        this.editor.model.change( writer => {
            let attributes = Object.fromEntries( selection.getAttributes());
            let fontType = attributes.fontFamily;
         //   let insertPosition = this.editor.model.document.selection.getFirstPosition();
            let enunciado = writer.createElement('paragraph');
            let listType = definitions.listType === 'ul' ? 'bulletedList' : 'numberedList';

            writer.insertText("Define los siguientes conceptos: ", enunciado);
            let aux = enunciado;
            this.editor.model.insertContent(enunciado);
            let linea = undefined;

            let definition = writer.createElement('paragraph');
            writer.insertText(definitions.text[0], definition);
            writer.insert(definition, enunciado, 'after');

            for(let j = 1; j < definitions.text.size; j++){
                definition = writer.createElement('paragraph');
                writer.insertText(definitions.text[j], definition);
                writer.insert(definition, enunciado, 'after');
                
                for(let i = 0; i < definitions.numLines; i++){
                    if(definitions.extraspace){
                        linea = writer.createElement('definitionsLineMore');
                    }
                    else
                        linea = writer.createElement('definitionsLine');
                    writer.append(linea, definition);
                }

                writer.setSelection( definition, 'in');
                this.editor.execute( listType);
                enunciado = definition;
            }
            definitions.text.forEach(t => {
                definition = writer.createElement('paragraph');
                writer.insertText(t, definition);
                writer.insert(definition, enunciado, 'after');

                for(let i = 0; i < definitions.numLines; i++){
                    if(definitions.extraspace){
                        linea = writer.createElement('definitionsLineMore');
                    }
                    else
                        linea = writer.createElement('definitionsLine');
                    writer.append(linea, definition);
                }
                writer.setSelection( definition, 'in');
                this.editor.execute( listType);
                enunciado = definition;
            });

            let howTo = writer.createElement('paragraph');
            if(definitions.addHowToSolve){
                writer.insertText("Cómo resolver el ejercicio: Primero busca una de las palabras en la sopa de letras. Ten en cuenta que las palabras pueden estar escondidas en vertical, horizontal y/o diagonal, y es posible que algunas estén escritas al revés. Cuando hayas encontrado la palabra, rodéala.", howTo, "end");
            }
            writer.insert(howTo, enunciado, 'after');
            const range = writer.createRange( writer.createPositionBefore(aux), writer.createPositionAfter(howTo) );
            writer.setSelection( range );
            this.editor.execute('fontFamily', {value: fontType});
            writer.setSelection(howTo, 'end');
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'definitionsPreview' );

        this.isEnabled = allowedIn !== null;
    }
}