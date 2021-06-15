import Command from '@ckeditor/ckeditor5-core/src/command';
import Range from '@ckeditor/ckeditor5-engine/src/view/range';

export default class InsertFillGapsCommand extends Command {
    execute( truefalse ) {
        const selection = this.editor.model.document.selection;
        this.editor.model.change( writer => {
     
            let text = "";
            truefalse.text.forEach(t => {
                text+= t + " ";
            })
            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            let hola = Object.fromEntries( selection.getAttributes())
            let enunciado = writer.createElement('paragraph');
        
            writer.insertText(text, enunciado);
            
            this.editor.model.insertContent(enunciado);
            writer.setSelection( enunciado, 'on' );

            
        //    this.editor.execute( 'fontFamily', hola.fontFamily);
         //   writer.setSelection( enunciado, 'in');
       //     this.editor.execute( 'fontFamily' );
            if(truefalse.addHowToSolve){
                const howTo = writer.createElement('paragraph');
                writer.insertText("Cómo resolver: rellenar los huecos....", howTo, "end");
            }
       //     this.editor.execute('shiftEnter');
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'trueFalsePreview' );

        this.isEnabled = allowedIn !== null;
    }
}