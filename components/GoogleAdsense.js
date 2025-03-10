import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function GoogleAdsense() {
  const initGoogleAdsense = () => {
    setTimeout(() => {
      const ads = document.getElementsByClassName('adsbygoogle')
      const adsbygoogle = window.adsbygoogle
      if (ads.length > 0) {
        for (let i = 0; i <= ads.length; i++) {
          try {
            adsbygoogle.push(ads[i])
            console.log('adsbygoogle', i, ads[i], adsbygoogle)
          } catch (e) {

          }
        }
      }
    }, 100)
  }

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', initGoogleAdsense)
    return () => {
      router.events.off('routeChangeComplete', initGoogleAdsense)
    }
  }, [router])

  return null
}

/**
 * 文章内嵌广告单元
 * 请在GoogleAdsense后台配置创建对应广告，并且获取相应代码
 * 修改下面广告单元中的 data-ad-slot data-ad-format data-ad-layout-key(如果有)
 * 添加 可以在本地调试
 */
const AdSlot = ({ type = 'show' }) => {
  if (!BLOG.ADSENSE_GOOGLE_ID) {
    return null
  }
  // 文章内嵌广告
  if (type === 'in-article') {
    return <ins className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
            data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
            data-ad-slot="2899380798"></ins>
  }

  // 信息流广告
  if (type === 'flow') {
    return <ins className="adsbygoogle"
            data-ad-format="fluid"
            data-ad-layout-key="-5j+cz+30-f7+bf"
            style={{ display: 'block' }}
            data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
            data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
            data-ad-slot="7030197499"></ins>
  }

  // 原生广告
  if (type === 'native') {
    return <ins className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-format="autorelaxed"
            data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
            data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
            data-ad-slot="4980048999"></ins>
  }

  //  展示广告
  return <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={BLOG.ADSENSE_GOOGLE_ID}
        data-adtest={BLOG.ADSENSE_GOOGLE_TEST ? 'on' : 'off'}
        data-ad-slot="8395250050"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
}

export { AdSlot }
