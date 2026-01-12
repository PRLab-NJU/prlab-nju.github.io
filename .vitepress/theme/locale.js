import { reactive } from 'vue'

export const locale = reactive({
  currentLang: 'zh', 
  toggleLang() {
    this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh'
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', this.currentLang)
    }
  }
})

if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('locale')
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    locale.currentLang = savedLang
  }
}

