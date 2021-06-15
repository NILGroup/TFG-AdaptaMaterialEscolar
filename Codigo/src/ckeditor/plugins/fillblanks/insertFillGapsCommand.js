import Command from '@ckeditor/ckeditor5-core/src/command';
import Range from '@ckeditor/ckeditor5-engine/src/view/range';

export default class InsertFillGapsCommand extends Command {
    execute( truefalse ) {
        const selection = this.editor.model.document.selection;
        this.editor.model.change( writer => {
            let attributes = Object.fromEntries( selection.getAttributes());
            this.editor.model.insertContent(writer.createElement('paragraph'));
            let title = "Rellena los huecos:";
            let text = "";
            truefalse.text.forEach(t => {
                text+= t + " ";
            })
            
            let fontType = attributes.fontFamily;
            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            
            let enunciado = writer.createElement('paragraph');
            writer.insertText(title, enunciado);
            this.editor.model.insertContent(enunciado);
            this.editor.execute('enter');
            let phrase = writer.createElement('paragraph');
            writer.insertText(text, phrase);
            this.editor.model.insertContent(phrase);

            this.editor.execute('enter');
        //    this.editor.execute( 'fontFamily', hola.fontFamily);
         //   writer.setSelection( enunciado, 'in');
       //     this.editor.execute( 'fontFamily' );
       const howTo = writer.createElement('paragraph');
       let endText = "";
            if(truefalse.addHowToSolve){
                endText = "Cómo resolver el ejercicio: introduce las palabras correctas dentro de los huecos subrayados.";
            }
            writer.insertText(endText, howTo, "end");
            this.editor.model.insertContent(howTo);
            const range = writer.createRange( writer.createPositionBefore(enunciado), writer.createPositionAfter(howTo) );
            writer.setSelection( range );
            this.editor.execute('fontFamily', {value: fontType});
            writer.setSelection(howTo, 'end');
            this.editor.execute('fontFamily', {value: fontType});
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'trueFalsePreview' );

        this.isEnabled = allowedIn !== null;
    }
}