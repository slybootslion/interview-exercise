import initElementPlus from './element-plus'
import { App } from 'vue'
import './style/reset.scss'

export default function initPlugin (app: App) {
  initElementPlus(app)
}
