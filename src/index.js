import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import glowAnalytics from './analytics'
import { getAccountConfig } from './account-config'
import './glowhub.css'

export const GlowHubLoader = ({ clientID }) => {
  const { listen } = useHistory()
  const [open, setOpen] = useState(false)
  const [accountConfig, setAccountConfig] = useState()
  const [analyticsInstance, setAnalyticsInstance] = useState(null)

  useEffect(() => {
    getAccountConfig(clientID).then(data => setAccountConfig(data))
  }, [clientID])

  useEffect(() => {
    if (!analyticsInstance && accountConfig?.analytics) {
      setAnalyticsInstance(new glowAnalytics(clientID))
    }
  }, [clientID, analyticsInstance, accountConfig])

  useEffect(() => {
    return listen(() => {
      if (analyticsInstance) {
        analyticsInstance.sendData()
        analyticsInstance.deleteListeners()
      }
    })
  }, [listen, analyticsInstance])

  const changeOpen = () => setOpen(!open)

  const acceptCookies = () => {
    localStorage.setItem("GlowCookies", '1')
    changeOpen(false)
    analyticsInstance?.start()
  }

  const rejectCookies = () => {
    localStorage.setItem("GlowCookies", '0')
    changeOpen(false)
  }

  useEffect(() => {
    const localData = localStorage.getItem("GlowCookies")

    if (localData === '1') {
      setOpen(false)
      analyticsInstance?.start()
    } else if (localData === '0') {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [analyticsInstance])

  return (
    accountConfig && open
      ? <div
        id="glowCookies-banner"
        className={`glowCookies__banner glowCookies__banner__${accountConfig.cookies?.bannerStyle} glowCookies__${accountConfig.cookies?.border} glowCookies__left`}
        style={{ backgroundColor: accountConfig.cookies?.background }}
      >
        <h3 style={{ color: accountConfig.cookies?.color }}>{accountConfig.cookies?.heading}</h3>
        <p style={{ color: accountConfig.cookies?.color }}>
          {accountConfig.cookies?.description}
          <a
            href={accountConfig.cookies?.policyLink}
            target="_blank"
            rel="noreferrer"
            className="read__more"
            style={{ color: accountConfig.cookies?.color }}
          >{accountConfig.cookies?.policyLinkText}
          </a>
        </p>
        <div className="btn__section">

          <button
            type="button"
            id="acceptCookies"
            className="btn__accept accept__btn__styles"
            onClick={acceptCookies}
            style={{
              color: accountConfig.cookies?.acceptBtnColor,
              backgroundColor: accountConfig.cookies?.acceptBtnBackground
            }}>
            {accountConfig.cookies?.acceptBtnText}
          </button>

          <button
            type="button"
            id="rejectCookies"
            className="btn__settings settings__btn__styles"
            onClick={rejectCookies}
            style={{
              color: accountConfig.cookies?.rejectBtnColor,
              backgroundColor: accountConfig.cookies?.rejectBtnBackground
            }}>
            {accountConfig.cookies?.rejectBtnText}
          </button>

        </div>
      </div>
      : null
  )
}
