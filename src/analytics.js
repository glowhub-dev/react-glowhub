// Glow Analytics
// ===================================================

export default class glowAnalytics {
  constructor(clientID, privacy = false, cookies = false, event = 'pageView') {
    this.baseURL = `https://api.glowhub.dev/analytics/new/view`
    this.clientIdLocalStorage = localStorage.getItem("GlowAnalytics") || undefined
    this.privacy = privacy
    this.withoutcookies = cookies

    this.beaconsData = {
      clientID: clientID,
      user_id: this.clientIdLocalStorage || Math.random().toString(36).substring(2),
      viewTempID: Math.random().toString(36).substring(2),
      webEvent: event,
      title: document.title,
      referrer: document.referrer,
      location: window.location,
      domain: document.domain,
      cookiesEnabled: navigator.cookieEnabled,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      loadedDate: new Date().getTime(),
      sendDate: undefined,
      performance: performance,
    }

    this.sendDataVisibilityHide = undefined
    this.sendDataPageHide = undefined
    this.sendTempDataVisible = undefined
  }

  start() {
    !this.clientIdLocalStorage && this.setLocalStorage()
    if (this.beaconsData.clientID) {
      this.sendTempData()
      this.addListener()
    }
  }

  sendTempData() {
    this.beaconsData.sendDate = this.beaconsData.loadedDate
    navigator.sendBeacon(`${this.baseURL}?temp=true`, JSON.stringify(this.beaconsData));
    console.log('=================')
    console.log('MANDO TEMP DATA:')
    console.log('USER_ID', this.beaconsData.user_id)
    console.log('WIEW:ID', this.beaconsData.viewTempID)
    console.log('=================')
  }

  sendData() {
    this.beaconsData.sendDate = new Date().getTime()
    navigator.sendBeacon(this.baseURL, JSON.stringify(this.beaconsData));
    console.log('=================')
    console.log('MANDO DATA FINAL')
    console.log('USER_ID', this.beaconsData.user_id)
    console.log('WIEW:ID', this.beaconsData.viewTempID)
    console.log('=================')
  }

  setLocalStorage() {
    if (!this.privacy && !this.withoutcookies) {
      let randomUser = Math.random().toString(36).substring(2);
      localStorage.setItem("GlowAnalytics", `ga_${randomUser}`)
      console.log('INSTALO LOCALSTORAGE')
    }
  }

  addListener() {
    this.sendDataPageHide = () => { this.sendData() }
    this.sendDataVisibilityHide = () => {
      if (document.visibilityState === 'hidden') {
        this.sendData()
      } else if (document.visibilityState === 'visible') {
        this.sendTempData()
      }
    }

    document.addEventListener('visibilitychange', this.sendDataVisibilityHide)
    window.addEventListener('pagehide', this.sendDataPageHide)
    window.addEventListener('beforeunload', this.sendDataPageHide)
  }

  deleteListeners() {
    document.removeEventListener('visibilitychange', this.sendDataVisibilityHide)
    window.removeEventListener('pagehide', this.sendDataPageHide)
    window.removeEventListener('beforeunload', this.sendDataPageHide)
  }
}