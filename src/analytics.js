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
  }

  sendData() {
    this.beaconsData.sendDate = new Date().getTime()
    navigator.sendBeacon(this.baseURL, JSON.stringify(this.beaconsData));
  }

  setLocalStorage() {
    if (!this.privacy && !this.withoutcookies) {
      let randomUser = Math.random().toString(36).substring(2);
      localStorage.setItem("GlowAnalytics", `ga_${randomUser}`)
    }
  }

  addListener() {
    let blockFunc = false
    const blockFunction = () => {
      blockFunc = true
      setTimeout(() => { blockFunc = false }, 500)
    }

    this.sendDataPageHide = () => {
      if (!blockFunc) {
        this.sendData()
        blockFunction()
      }
    }

    this.sendDataVisibilityHide = () => {
      if (!blockFunc) {
        if (document.visibilityState === 'hidden') {
          this.sendData()
        } else if (document.visibilityState === 'visible') {
          this.sendTempData()
        }
      }
      blockFunction()
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