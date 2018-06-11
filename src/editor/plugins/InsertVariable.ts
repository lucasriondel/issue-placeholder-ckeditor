import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import Collection from '@ckeditor/ckeditor5-utils/src/collection'
import Model from '@ckeditor/ckeditor5-ui/src/model'

// inspired from https://github.com/ckeditor/ckeditor5-heading/blob/master/src/headingui.js
export default class InsertVariable extends Plugin {
  public editor?: any
  public listenTo?: any

  public init() {
    const editor = this.editor
    const t = editor.t
    const defaultTitle = t('Insérer Variable')
    const dropdownTooltip = t('Insérer Variable')

    editor.ui.componentFactory.add('insertVariable', locale => {
      const dropdownView = createDropdown(locale)

      const items = new Collection()

      const var1 = new Model({ label: 'Variable1', idVariable: 'var1' })
      items.add(var1)
      const var2 = new Model({ label: 'Variable2', idVariable: 'var2' })
      items.add(var2)

      addListToDropdown(dropdownView, items)

      dropdownView.buttonView.set({
        label: defaultTitle,
        isOn: false,
        withText: true,
        tooltip: dropdownTooltip
      })

      dropdownView.extendTemplate({
        attributes: {
          class: ['ck-heading-dropdown']
        }
      })

      this.listenTo!(dropdownView, 'execute', evt => {
        editor.model.change(writer => {
          const placeholder = writer.createElement('placeholder')
          writer.insertText(evt.source.label, placeholder)
      
          writer.insert(placeholder, editor.model.document.selection.getFirstPosition())
        })

        // old code, decomment if you want to use Variable insted of Placeholder
        // editor.model.change(writer => {
        //   const variableElement = writer.createElement('variable', {
        //     id: evt.source.idVariable
        //   })

        //   writer.insertText(evt.source.label, variableElement, 'end')

        //   editor.model.insertContent(variableElement, editor.model.document.selection)
        // })
        // editor.editing.view.focus()
      })

      return dropdownView
    })
  }
}
