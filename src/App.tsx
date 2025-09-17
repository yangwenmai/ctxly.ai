import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { SupportModal } from './components/ui/support-modal'
import { ScreenshotCarousel } from './components/ui/screenshot-carousel'

export default function App() {
  const messages = {
    en: {
      brand: 'Contextly',
      navFeatures: 'Features',
      navChangelog: 'Changelog',
      navFeedback: 'Feedback',
      supportAuthor: 'Support the Author',
      heroTitle: 'Stay in Flow. Know Your Context.',
      heroSubtitle:
        'A lightweight macOS menu bar app that helps knowledge workers quantify and optimize attention to stay focused and productive.',
      download: 'Download for macOS',
      giveFeedback: 'Give Feedback',
      featuresTitle: 'Core Features',
      features: [
        { title: '🧠 Intelligent Monitoring', desc: 'Detect read/write states and context switches accurately.' },
        { title: '⏱️ Real‑time Feedback', desc: 'Menu bar shows current focus state (📝 writing, 👁️ reading).' },
        { title: '📈 Data Metrics', desc: 'Today’s writing time, reading time, switch count, longest focus session.' },
        { title: '🎯 Focus Session Details', desc: 'Record and display your longest focus session (app, period, mode, duration).' },
        { title: '🔔 Periodic Reminders', desc: 'Hourly focus summary notifications.' },
        { title: '🔒 Privacy‑first', desc: 'All data stored locally, zero upload.' }
      ],
      advancedTitle: '🎛️ Advanced Analysis (opt‑in)',
      advancedNote: 'Enable corresponding switches to view analysis data.',
      advancedItems: [
        { title: '🔍 Enhanced Analysis', desc: 'Higher read/write detection accuracy using 30+ app behavioral features.' },
        { title: '💰 Switch Cost Analysis', desc: 'Cognitive switch cost modeling grounded in neuroscience.' },
        { title: '🎯 Detailed Analysis', desc: 'Personal work pattern recognition (6 work types + 7‑day heatmap).' }
      ],
      footerDownload: 'Download',
      footerFeedback: 'Feedback',
      footerIssues: 'Issues',
      footerChangelog: 'Changelog',
      footerSupport: 'Support',
      supportModalTitle: 'Buy me a coffee ☕',
      supportModalDesc: 'Thank you for supporting! Your encouragement helps us iterate Contextly.',
      supportModalNote: 'Choose a payment method',
      supportModalBmcBtn: 'Support on Buy Me a Coffee',
      supportModalWeChat: 'WeChat Pay',
      supportModalBmc: 'Buy Me a Coffee',
      screenshotsTitle: 'App Screenshots',
      screenshots: [
        {
          title: 'Menu Bar Status',
          description: 'Real-time focus state indicator in your menu bar'
        },
        {
          title: 'Focus Metrics',
          description: 'Daily writing time, reading time, and context switches'
        },
        {
          title: 'Session Details',
          description: 'Detailed view of your longest focus sessions'
        },
        {
          title: 'Advanced Analytics',
          description: 'Work pattern recognition and cognitive cost analysis'
        }
      ],
    },
    zh: {
      brand: 'Contextly',
      navFeatures: '功能',
      navChangelog: '更新日志',
      navFeedback: '反馈',
      supportAuthor: '支持作者',
      heroTitle: '保持心流，知晓你的上下文。',
      heroSubtitle:
        'Contextly 是一款轻量级的 macOS 菜单栏应用，帮助知识型工作者量化并优化注意力管理，提升专注与生产力。',
      download: '下载 macOS 版',
      giveFeedback: '反馈建议',
      featuresTitle: '核心功能',
      features: [
        { title: '🧠 智能监测', desc: '区分读写状态，精准识别上下文切换。' },
        { title: '⏱️ 实时反馈', desc: '菜单栏图标显示当前专注状态（📝写作 👁️阅读）。' },
        { title: '📈 数据统计', desc: '今日写作时间、阅读时间、切换次数、最长专注时长。' },
        { title: '🎯 专注会话详情', desc: '记录并显示最长专注会话（应用、时间段、读写模式、时长）。' },
        { title: '🔔 定期提醒', desc: '每小时专注度概况通知。' },
        { title: '🔒 隐私优先', desc: '所有数据本地存储，零上传。' }
      ],
      advancedTitle: '🎛️ 高级分析功能（按需开启）',
      advancedNote: '需手动开启对应开关后可查看分析数据。',
      advancedItems: [
        { title: '🔍 Enhanced Analysis', desc: '增强读写识别准确度（30+ 应用行为特征）。' },
        { title: '💰 Switch Cost Analysis', desc: '认知切换成本分析（神经科学理论）。' },
        { title: '🎯 Detailed Analysis', desc: '个人工作模式识别（6 种工作类型 + 7 天热力图）。' }
      ],
      footerDownload: '下载',
      footerFeedback: '反馈',
      footerIssues: '问题',
      footerChangelog: '更新日志',
      footerSupport: '支持作者',
      supportModalTitle: '请作者喝杯咖啡 ☕',
      supportModalDesc: '感谢你的支持！你的鼓励能帮助我们持续迭代 Contextly。',
      supportModalNote: '请选择支付方式',
      supportModalBmcBtn: '去 Buy Me a Coffee 支持',
      supportModalWeChat: '微信支付',
      supportModalBmc: 'Buy Me a Coffee',
      screenshotsTitle: '应用截图',
      screenshots: [
        {
          title: '菜单栏状态',
          description: '菜单栏实时显示专注状态指示器'
        },
        {
          title: '专注指标',
          description: '每日写作时间、阅读时间和上下文切换统计'
        },
        {
          title: '会话详情',
          description: '最长专注会话的详细信息展示'
        },
        {
          title: '高级分析',
          description: '工作模式识别和认知成本分析'
        }
      ],
    }
  }

  const [language, setLanguage] = useState<'en' | 'zh'>('en')
  const [supportOpen, setSupportOpen] = useState(false)

  useEffect(() => {
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang')
      const saved = typeof window !== 'undefined' ? localStorage.getItem('ctxly_lang') : null
      const detected = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
      const initial = urlLang === 'en' || urlLang === 'zh' ? (urlLang as 'en' | 'zh') : (saved === 'en' || saved === 'zh' ? (saved as 'en' | 'zh') : detected)
      setLanguage(initial)
    } catch {
      setLanguage('en')
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('ctxly_lang', language)
    } catch {}
  }, [language])

  const t = useMemo(() => messages[language], [language])

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-bold">{t.brand}</h1>
        <nav className="space-x-4 flex items-center">
          <a href="#features" className="text-sm hover:underline">{t.navFeatures}</a>
          <a href="https://github.com/yangwenmai/ctxly.ai/releases" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">{messages[language].navChangelog}</a>
          <a href="https://github.com/yangwenmai/ctxly.ai/discussions" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">{messages[language].navFeedback}</a>
          <button
            type="button"
            onClick={() => setSupportOpen(true)}
            title={language === 'zh' ? '请作者喝咖啡支持本站' : 'Buy me a coffee'}
            className="ml-2 inline-flex items-center"
          >
            <img
              src="https://img.buymeacoffee.com/button-api/?text=&emoji=%E2%98%95&slug=maiyang&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
              alt="Buy me a coffee"
              className="h-8 rounded-md"
            />
          </button>
          <div className="pl-4 ml-2 border-l border-gray-200 flex items-center space-x-2">
            <a className={['text-sm', language === 'en' ? 'font-semibold' : 'opacity-60', 'hover:underline'].join(' ')} href={window.location.pathname + '?lang=en'}>EN</a>
            <span className="text-gray-300">|</span>
            <a className={['text-sm', language === 'zh' ? 'font-semibold' : 'opacity-60', 'hover:underline'].join(' ')} href={window.location.pathname + '?lang=zh'}>中文</a>
          </div>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {messages[language].heroTitle}
        </motion.h2>
        <motion.p className="text-lg text-gray-600 max-w-2xl mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          {messages[language].heroSubtitle}
        </motion.p>
        <div className="flex space-x-4 mb-16">
          <Button size="lg" asChild>
            <a href="https://github.com/yangwenmai/ctxly.ai/releases/latest" target="_blank" rel="noopener noreferrer">{messages[language].download}</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/yangwenmai/ctxly.ai/discussions" target="_blank" rel="noopener noreferrer">{messages[language].giveFeedback}</a>
          </Button>
          <Button variant="outline" size="lg" onClick={() => setSupportOpen(true)}>
            {language === 'zh' ? '支持作者' : 'Support the Author'}
          </Button>
        </div>

        {/* Screenshots Section */}
        <motion.section 
          className="w-full max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-8">{messages[language].screenshotsTitle}</h3>
          <ScreenshotCarousel
            screenshots={[
              {
                src: '/screenshots/menubar-status.png',
                alt: messages[language].screenshots[0].title,
                title: messages[language].screenshots[0].title,
                description: messages[language].screenshots[0].description
              },
              {
                src: '/screenshots/focus-metrics.png',
                alt: messages[language].screenshots[1].title,
                title: messages[language].screenshots[1].title,
                description: messages[language].screenshots[1].description
              },
              {
                src: '/screenshots/session-details.png',
                alt: messages[language].screenshots[2].title,
                title: messages[language].screenshots[2].title,
                description: messages[language].screenshots[2].description
              },
              {
                src: '/screenshots/advanced-analytics.png',
                alt: messages[language].screenshots[3].title,
                title: messages[language].screenshots[3].title,
                description: messages[language].screenshots[3].description
              }
            ]}
            autoPlay={true}
            interval={5000}
            className="mb-8"
          />
        </motion.section>
      </main>

      <section id="features" className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">{messages[language].featuresTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {messages[language].features.map((f, idx) => (
            <Card key={idx} className="rounded-2xl shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="rounded-2xl shadow-sm md:col-span-3">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-center">{messages[language].advancedTitle}</h3>
              <ul className="text-gray-700 space-y-2 max-w-3xl mx-auto">
                {messages[language].advancedItems.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-medium">{item.title}</span>
                    <span className="ml-1 text-gray-600">{item.desc}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 text-center mt-4">⚠️ {messages[language].advancedNote}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© 2025 Contextly</p>
        <div className="space-x-4">
          <a href="https://github.com/yangwenmai/ctxly.ai/releases/latest" target="_blank" rel="noopener noreferrer" className="hover:underline">{messages[language].footerDownload}</a>
          <a href="https://github.com/yangwenmai/ctxly.ai/discussions" target="_blank" rel="noopener noreferrer" className="hover:underline">{messages[language].footerFeedback}</a>
          <a href="https://github.com/yangwenmai/ctxly.ai/issues" target="_blank" rel="noopener noreferrer" className="hover:underline">{messages[language].footerIssues}</a>
          <a href="https://github.com/yangwenmai/ctxly.ai/releases" target="_blank" rel="noopener noreferrer" className="hover:underline">{messages[language].footerChangelog}</a>
          <button
            type="button"
            onClick={() => setSupportOpen(true)}
            title={language === 'zh' ? '请作者喝咖啡支持本站' : 'Buy me a coffee'}
            className="inline-flex items-center align-middle"
          >
            <img
              src="https://img.buymeacoffee.com/button-api/?text=&emoji=%E2%98%95&slug=maiyang&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
              alt="Buy me a coffee"
              className="h-8 rounded-md"
            />
          </button>
        </div>
      </footer>
      <SupportModal
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
        title={messages[language].supportModalTitle}
        description={messages[language].supportModalDesc}
        note={messages[language].supportModalNote}
        buttonLabel={messages[language].supportModalBmcBtn}
        enableWeChat={true}
        wechatQrSrc={'/wechat-qr-code.png'}
        wechatTitle={messages[language].supportModalWeChat}
        bmcTitle={messages[language].supportModalBmc}
      />
    </div>
  )
}


