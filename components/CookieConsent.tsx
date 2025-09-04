'use client'

import { useEffect, useState } from 'react'
import { clsxm } from '@zolplay/utils'
import Script from 'next/script'

// Google Analytics 测量ID
const GA_MEASUREMENT_ID = 'G-FCRC3MY2NH';

export function CookieConsent() {
  // Banner 显示和状态管理
  const [isVisible, setIsVisible] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 初始化
  useEffect(() => {
    // 延迟执行提高初始加载速度
    const timer = setTimeout(() => {
      const consentSaved = localStorage.getItem('cookieConsent');
      
      // 只在首次访问时显示横幅
      if (!consentSaved) {
        setIsVisible(true);
      }
      
      setIsLoaded(true);
    }, 2000); // 更长的延迟，让网站核心内容先加载
    
    return () => clearTimeout(timer);
  }, []);

  // 接受所有 Cookie
  const acceptAll = () => {
    window.gtag?.('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    
    localStorage.setItem('cookieConsent', 'all');
    setIsVisible(false);
    setShowManager(false);
  };

  // 拒绝非必要 Cookie
  const rejectAll = () => {
    window.gtag?.('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    
    localStorage.setItem('cookieConsent', 'none');
    setIsVisible(false);
    setShowManager(false);
  };

  // 管理 Cookie 首选项
  const manageCookies = () => setShowManager(true);

  // 按钮样式复用
  const primaryButtonStyle = clsxm(
    'inline-flex items-center gap-2 justify-center rounded-lg py-2 px-3 text-sm outline-offset-2 transition',
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300'
  );

  const secondaryButtonStyle = clsxm(
    'inline-flex items-center gap-2 justify-center rounded-lg py-2 px-3 text-sm outline-offset-2 transition',
    'bg-zinc-200 font-semibold text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600'
  );

  const manageButtonStyle = clsxm(
    'text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 underline',
    'absolute right-2 bottom-2 md:right-4 md:bottom-4'
  );

  // 应用已保存的同意状态
  const initGtag = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    
    gtag('set', 'url_passthrough', true);
    gtag('set', 'ads_data_redaction', true);
    
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent === 'all') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted'
      });
    }
  `;

  return (
    <>
      {/* 初始化 Google Consent Mode - 使用 next/script 代替内联script */}
      <Script id="google-consent-init" strategy="lazyOnload">
        {initGtag}
      </Script>
      
      {/* Google Analytics 脚本 - 延迟加载 */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
        strategy="lazyOnload" 
        onLoad={() => {
          window.gtag('js', new Date());
          window.gtag('config', GA_MEASUREMENT_ID);
        }}
      />
      
      {/* Cookie 同意横幅 - 仅在页面加载后显示 */}
      {isLoaded && isVisible && !showManager && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-lg p-4 md:p-6 animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Cookie Consent</h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={acceptAll} className={primaryButtonStyle}>
                  Accept All
                </button>
                <button onClick={rejectAll} className={secondaryButtonStyle}>
                  Reject All
                </button>
                <button
                  onClick={manageCookies}
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 underline"
                >
                  Customize Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 详细的 Cookie 管理面板 */}
      {isLoaded && showManager && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Cookie Preferences</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Choose which cookies you want to accept. Your choice will be saved for one year.
            </p>
            
            <div className="mt-6 space-y-4">
              <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Essential Cookies</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  These cookies are necessary for the website to function and cannot be switched off.
                </p>
                <div className="mt-2 flex items-center">
                  <input type="checkbox" checked disabled className="rounded border-zinc-300 text-lime-600 focus:ring-lime-500" />
                  <span className="ml-2 text-sm text-zinc-600 dark:text-zinc-400">Always Active</span>
                </div>
              </div>
              
              <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Analytics Cookies</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
                </p>
              </div>
              
              <div className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Marketing Cookies</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  These cookies may be set through our site by our advertising partners to build a profile of your interests.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={acceptAll} className={primaryButtonStyle}>
                Accept All
              </button>
              <button onClick={rejectAll} className={secondaryButtonStyle}>
                Reject All
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 小型管理按钮 - 仅在同意设置已保存时显示 */}
      {isLoaded && !isVisible && !showManager && (
        <button onClick={manageCookies} className={manageButtonStyle}>
          Cookie Settings
        </button>
      )}
    </>
  );
}

// 全局类型声明
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
} 