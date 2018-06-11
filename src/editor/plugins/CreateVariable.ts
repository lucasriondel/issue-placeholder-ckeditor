import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils'
import Collection from '@ckeditor/ckeditor5-utils/src/collection'
import Model from '@ckeditor/ckeditor5-ui/src/model'

// inspired from https://github.com/ckeditor/ckeditor5-heading/blob/master/src/headingui.js
export default class CreateVariable extends Plugin {
  public editor?: any
  public listenTo?: any

  public init() {
    const editor = this.editor
    const t = editor.t
    const defaultTitle = t('Créer Variable')
    const dropdownTooltip = t('Créer Variable')

    editor.ui.componentFactory.add('createVariable', locale => {
      const dropdownView = createDropdown(locale)

      const items = new Collection()

      // TODO: replace idVariable with BaseVariable enum from the variable branch when merged
      items.add(new Model({ label: 'QCM', idVariable: 'qcm' }))
      items.add(new Model({ label: 'QCU', idVariable: 'qcu' }))
      items.add(new Model({ label: 'Texte', idVariable: 'text' }))
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
        console.log('Create variable of type ', evt.source.label)
      })

      return dropdownView
    })
  }
}
