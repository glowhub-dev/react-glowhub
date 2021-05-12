// Glow Analytics
// ===================================================

class glowAnalytics {
  constructor(clientID, privacy = false, cookies = false, event = 'pageView') {
    this.baseURL = `https://api.glowhub.dev/analytics/new/view`
    this.clientIdLocalStorage = localStorage.getItem("GlowAnalytics") || undefined
    this.privacy = privacy
    this.withoutcookies = cookies

    this.beaconsData = {
      clientID: clientID,
      user_id: this.clientIdLocalStorage || null,
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
      console.log('Instalo localstorage')
    }
  }

  addListener() {
    const sendDataVisibilityHide = () => { document.visibilityState === 'hidden' && this.sendData() }
    const sendDataPageHide = () => { this.sendData() }
    const sendTempDataVisible = () => { document.visibilityState === 'visible' && this.sendTempData() }

    document.addEventListener('visibilitychange', sendDataVisibilityHide)
    document.addEventListener('visibilitychange', sendTempDataVisible)
    window.addEventListener('pagehide', sendDataPageHide)
    window.addEventListener('beforeunload', sendDataPageHide)
  }
}

module.exports = { glowAnalytics }