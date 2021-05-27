import Command from '@ckeditor/ckeditor5-core/src/command';


export default class InsertWordSearchCommand extends Command {
    execute(characters) {
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            let enumPhrase = "Encuentra " + characters.words.length + " palabras escondidas en la sopa de letras.";
            if(characters.showWords){
                enumPhrase = "Busca en la sopa de letras las siguientes palabras: ";
                characters.words.forEach((value, i) => {
                    if(i !== characters.words.length - 1)
                        enumPhrase += " " + value.clean + ", ";
                    else
                    enumPhrase += " " + value.clean;
                });
            }

            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            const enunciado = writer.createElement('paragraph', insertPosition);
            
            writer.insertText(enumPhrase, enunciado);
            
            this.editor.model.insertContent(enunciado);
            
            const simpleBox = writer.createElement( 'wordSearchPreview' , {characters});
          /*  characters.grid.forEach(row => {
                const simpleBoxTitle = writer.createElement( 'wordSearchRow' );
                row.forEach(cell =>{
                    const simpleBoxCell = writer.createElement( 'wordSearchCell', {name: cell} );
                    writer.append( simpleBoxCell, simpleBoxTitle );
                });
                writer.append( simpleBoxTitle, simpleBox );
            });*/
            this.editor.model.insertContent( simpleBox );     
            
            const howTo = writer.createElement('paragraph');
            let endText = " ";
            if(characters.addHowToSolve){
                endText = "Cómo resolver el ejercicio: Primero busca una de las palabras en la sopa de letras. Ten en cuenta que las palabras pueden estar escondidas en vertical, horizontal y/o diagonal, y es posible que algunas estén escritas al revés. Cuando hayas encontrado la palabra, rodéala.";
            }
            writer.insertText(endText, howTo, "end");
            this.editor.model.insertContent(howTo,  writer.createPositionAt( simpleBox, "after"));
        } );


    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'wordSearchPreview' );

        this.isEnabled = allowedIn !== null;
    }
}