import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters'
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils'

function downcastInsertVariable(options: { asWidget?: boolean } = {}) {
  return dispatcher =>
    dispatcher.on(
      'insert:variable',
      (evt, data, conversionApi) => {
        const variable = data.item

        if (!conversionApi.consumable.consume(variable, 'insert')) {
          return
        }

        conversionApi.consumable.consume(variable, 'attribute:id:variable')
        const asWidget = options && options.asWidget
        const variableElement = conversionApi.writer.createContainerElement('variable')
        let variableWidget = null

        if (asWidget) {
          variableWidget = toWidget(variableElement, conversionApi.writer)
        }

        const viewPosition = conversionApi.mapper.toViewPosition(data.range.start)

        conversionApi.mapper.bindElements(variable, asWidget ? variableWidget : variableElement)
        conversionApi.writer.insert(viewPosition, asWidget ? variableWidget : variableElement)
      },
      { priority: 'normal' }
    )
}

export default class Variable extends Plugin {
  public editor?: any
  
  public init() {
    const editor = this.editor

    // register a new element, variable, and tells the editor how it should behave with other elements
    // see https://docs.ckeditor.com/ckeditor5/latest/api/module_engine_model_schema-Schema.html
    editor.model.schema.register('variable', {
      inheritAllFrom: '$text',
      allowAttributes: ['id'],
      isObject: true
    })

    editor.model.schema.extend('$text', {
      allowIn: 'variable'
    })

    // for the following, you might want to take a look at https://docs.ckeditor.com/ckeditor5/latest/framework/guides/architecture/editing-engine.html#conversion

    // upcasting is the conversion from the data to the editor
    editor.conversion.for('upcast').add(upcastElementToElement({ model: 'variable', view: 'div' }))

    // editing downcast is the conversion to the editing view (the view used by the editor)
    editor.conversion.for('editingDowncast').add(downcastInsertVariable({ asWidget: true }))

    // data downcast used for outputting the data (editor.getData())
    editor.conversion.for('dataDowncast').add(downcastInsertVariable())

    // mapping attributes
    editor.conversion.attributeToAttribute({ model: 'id', view: 'id' })
  }
}
