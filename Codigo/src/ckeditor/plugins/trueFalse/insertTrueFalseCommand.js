import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertTrueFalseCommand extends Command {
    execute( truefalse ) {
        this.editor.model.change( writer => {
     

            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            const enunciado = writer.createElement('paragraph', insertPosition);
            
            writer.insertText("Responde con V si es verdadero o con F si es falso las siguientes frases: ", enunciado);
            
            this.editor.model.insertContent(enunciado);

            this.editor.model.insertContent( writer.createElement( 'trueFalseBox' ) , writer.createPositionAfter(enunciado));

            if(truefalse.addHowToSolve){
                const howTo = writer.createElement('paragraph');
                writer.insertText("Cómo resolver el ejercicio:</u> Primero lee detenidamente cada frase. Después escribe en el recuadro una V si crees que la frase es verdadera o una F si crees que es falsa.", howTo, "end");
             //   this.editor.model.insertContent(howTo, writer.createPositionAfter(linea));
            }
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'trueFalsePreview' );

        this.isEnabled = allowedIn !== null;
    }
}