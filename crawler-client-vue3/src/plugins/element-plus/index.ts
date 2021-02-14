import {
  ElButton,
  ElSelect,
  ElMenu, ElSubmenu, ElMenuItem,
  ElInput,
} from 'element-plus'
import { App } from 'vue'
import './theme/index.css'

export default function initElementPlus (app: App) {
  app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 10 }
  app.component(ElButton.name, ElButton)
  app.component(ElSelect.name, ElSelect)
  app.component(ElMenu.name, ElMenu)
  app.component(ElSubmenu.name, ElSubmenu)
  app.component(ElMenuItem.name, ElMenuItem)
  app.component(ElInput.name, ElInput)
}
