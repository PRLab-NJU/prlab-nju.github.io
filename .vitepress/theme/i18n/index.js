import { computed } from 'vue'
import { locale } from '../locale.js'
import Home from './Home.js'
import HomeButtons from './HomeButtons.js'
import NJU from './NJU.js'
import Research from './Research.js'
import Team from './Team.js'
import Papers from './Papers.js'
import Contact from './Contact.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'
import PersonDetail from './PersonDetail.js'

const i18nFiles = {
  Home,
  HomeButtons,
  NJU,
  Research,
  Team,
  Papers,
  Contact,
  NavBar,
  Footer,
  PersonDetail
}

export function useI18n(componentName) {
  const i18nData = i18nFiles[componentName]
  if (!i18nData) {
    console.warn(`i18n data not found for component: ${componentName}`)
    return computed(() => ({}))
  }
  
  return computed(() => {
    return i18nData[locale.currentLang] || i18nData.en || {}
  })
}

export function getCurrentLang() {
  return locale.currentLang
}

