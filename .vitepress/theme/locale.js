import { reactive } from 'vue'

export const locale = reactive({
  currentLang: 'en',
  toggleLang() {
    this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh'
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', this.currentLang)
    }
  }
})
