import { downcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters'
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters'
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils'

export default function PlaceholderPlugin(editor) {
  editor.model.schema.register('placeholder', {
    allowWhere: '$text',
    isObject: true
  })

  editor.model.schema.extend('$text', {
    allowIn: 'placeholder'
  })

  editor.conversion.for('editingDowncast').add(
    downcastElementToElement({
      model: 'placeholder',
      view: (modelItem, viewWriter) => {
        const widgetElement = viewWriter.createContainerElement('placeholder')

        return toWidget(widgetElement, viewWriter)
      }
    })
  )

  editor.conversion.for('dataDowncast').add(
    downcastElementToElement({
      model: 'placeholder',
      view: 'placeholder'
    })
  )

  editor.conversion.for('upcast').add(
    upcastElementToElement({
      view: 'placeholder',
      model: 'placeholder'
    })
  )
}

export function insertPlaceholder(editor, text) {
  editor.model.change(writer => {
    const placeholder = writer.createElement('placeholder')
    writer.insertText(text, placeholder)

    writer.insert(placeholder, editor.model.document.selection.getFirstPosition())
  })
}