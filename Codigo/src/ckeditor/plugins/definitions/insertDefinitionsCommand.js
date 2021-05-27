import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertDefinitionsCommand extends Command {
    execute(definitions) {
        this.editor.model.change( writer => {
            // Insert <productPreview id="...">*</productPreview> at the current selection position
            // in a way which will result in creating a valid model structure.
            let insertPosition = this.editor.model.document.selection.getFirstPosition();
            const enunciado = writer.createElement('paragraph', insertPosition);
            writer.insertText("Define los siguientes conceptos: ", enunciado);
            writer.insertText("Cómo resolver el ejercicio: Tienes que definir cada concepto usando como máximo\n", enunciado, "end");
            this.editor.model.insertContent(enunciado);
            definitions.text.forEach(t => {
                let definition = writer.createElement('paragraph');
                writer.insertText(t, definition);
                this.editor.model.insertContent(definition, writer.createPositionAfter(enunciado));
                for(let i = 0; i < definitions.numLines; i++){
                    let linea = writer.createElement('definitionsLine');
                    this.editor.model.insertContent(linea, writer.createPositionAfter(definition));
                }

            });

            
           // this.editor.model.insertContent(writer.createElement( 'definitionsSameLine', this.editor.model.document.selection.getLastPosition()));
            
        //    this.editor.model.insertContent( writer.createElement( 'definitionsPreview', { definitions } ), insertPosition );

        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'definitionsPreview' );

        this.isEnabled = allowedIn !== null;
    }
}