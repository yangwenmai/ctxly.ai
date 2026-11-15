import { Button } from './components/ui/button'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { SupportModal } from './components/ui/support-modal'
import { ScreenshotCarousel } from './components/ui/screenshot-carousel'

type Language = 'en' | 'zh'

const DOWNLOAD_URL = 'https://github.com/yangwenmai/ctxly.ai/releases/latest'
const RELEASES_URL = 'https://github.com/yangwenmai/ctxly.ai/releases'
const DISCUSSIONS_URL = 'https://github.com/yangwenmai/ctxly.ai/discussions'
const ISSUES_URL = 'https://github.com/yangwenmai/ctxly.ai/issues'
const BMC_BADGE_URL =
  'https://img.buymeacoffee.com/button-api/?text=&emoji=%E2%98%95&slug=maiyang&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff'

const MOCK_GOAL_SECONDS = 50 * 60
const MOCK_START_SECONDS = 37 * 60 + 12

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function App() {
  const messages = {
    en: {
      brand: 'Contextly',
      navWhy: 'Why',
      navFocus: 'Focus Mode',
      navFeatures: 'Features',
      navChangelog: 'Changelog',
      navFeedback: 'Feedback',
      download: 'Download for macOS',
      downloadShort: 'Download',
      supportAuthor: 'Support the Author',
      supportTitle: 'Buy me a coffee',
      heroBadge: 'New · Focus Mode',
      heroTitleLine1: 'Attention is broken into seconds.',
      heroTitleLine2: 'Take your focus back.',
      heroSubtitle:
        'Contextly is a quiet macOS menu bar app. The new Focus Mode locks you onto one thing and gently pulls you back when you drift, while attention stats show where your time actually fragments.',
      heroPrimary: 'Download for macOS',
      heroSecondary: 'See how Focus Mode works',
      heroMeta: ['macOS menu bar', 'Stored locally, never uploaded', 'Open feedback on GitHub'],
      mockFocusing: 'Focusing',
      mockTier: 'Strong Focus',
      mockLocked: 'Locked: current browser tab',
      mockFocusedLabel: 'Focused',
      mockGoalLabel: 'Goal 50:00',
      mockInterruptions: '0 interruptions',
      mockGlances: '2 glances',
      mockAwayTitle: 'You left your target',
      mockAwayDesc: 'Back within 10 seconds counts only as a glance',
      mockBack: 'Back to target',
      mockWindowTitle: 'draft.md — the thing that matters',
      whyEyebrow: 'The problem',
      whyTitle: 'The unit of our attention keeps shrinking.',
      scale: [
        { value: '45', unit: 'min', label: 'A class period at school' },
        { value: '25', unit: 'min', label: 'One Pomodoro' },
        { value: '1–2', unit: 'min', label: 'The rush of one short video' },
        { value: 'Seconds', unit: '', label: 'Before the next swipe' },
      ],
      whyBody:
        'Douyin, Xiaohongshu, WeChat Channels, Bilibili, X, Instagram, TikTok — each one holds you with a one-or-two-minute rush, then the next, then the next. Your thumb won’t stop, and your mind finds it harder and harder to stay with one thing.',
      whyCounter:
        'Yet anything truly good — an essay, a piece of code, an idea — is supposed to be hard. It is ground out slowly, over long stretches of time.',
      storyQuote: 'I built Contextly to save myself first.',
      storyBody:
        'It is not another productivity gadget. It is the tool I needed to pull myself out of the fragments: first see where my attention goes, then bring it back to the one thing that matters.',
      storySignature: '— Mai Yang, author of Contextly',
      focusEyebrow: 'New · Focus Mode',
      focusTitle: 'Lock onto one thing. Stay until it’s done.',
      focusSubtitle:
        'Not a stopwatch that only counts down. Focus Mode knows whether you are still on your target — and when you drift, it brings you back without lecturing you.',
      focusSteps: [
        {
          title: 'Lock with one shortcut',
          desc: 'Press ⌃⌥⌘F or choose “Start Focus” in the menu bar to lock the current window. In Chrome, Edge, Brave and Arc, it locks the exact tab.',
        },
        {
          title: 'Grace, not punishment',
          desc: 'Switch away and come back within the grace period (10 s by default, adjustable from 5 to 60 s) and it only counts as a glance.',
        },
        {
          title: 'A gentle pull back',
          desc: 'When you leave your target, a non-activating panel offers “Back to target”. The menu bar icon shows your time and changes color while you’re away.',
        },
        {
          title: 'An honest record',
          desc: 'Giving up needs a second confirmation and credits zero time, but the record stays. See today’s focus time, give-up rate, goal completion, streak days and top distracting apps.',
        },
      ],
      tiersTitle: 'Two levels, for two kinds of work',
      tiers: [
        {
          name: 'Normal Focus',
          tagline: 'For everyday deep work',
          points: [
            'Counts all the time you spend on your target',
            'Past the grace period: one interruption, your total is kept',
          ],
        },
        {
          name: 'Strong Focus',
          tagline: 'For things that must be done in one go',
          points: [
            'Only the current unbroken stretch counts',
            'Past the grace period: effective time resets to zero',
            'Optionally hide other apps when you start',
          ],
        },
      ],
      focusFootnote:
        'Locking the screen or sleeping pauses the timer. If Contextly quits unexpectedly, the session is recovered on next launch.',
      insightEyebrow: 'Always on, in the background',
      insightTitle: 'See where your attention actually goes.',
      insightSubtitle:
        'Before you can protect your focus, you need to see it. Contextly quietly measures your attention all day — no timers to start, nothing to fill in.',
      insights: [
        { title: 'Reading vs. writing', desc: 'Tells reading and writing apart from your activity, and shows the current state in the menu bar.' },
        { title: 'Context switches', desc: 'Detects every app switch and counts how often your attention is broken.' },
        { title: 'Daily metrics', desc: 'Writing time, reading time, switch count and your longest focus session for each day.' },
        { title: 'App sessions', desc: 'Session duration and switch count per app, so focus and distraction patterns become visible.' },
        { title: 'Hourly reminders', desc: 'An hourly summary with actionable insights, timed to avoid interrupting deep focus.' },
        { title: 'Data export', desc: 'Export your statistics as JSON for backup or your own analysis.' },
      ],
      advancedTitle: 'Advanced analysis (opt-in)',
      advancedItems: [
        { title: 'Enhanced Analysis', desc: 'Higher read/write detection accuracy using 30+ app behavioral profiles.' },
        { title: 'Switch Cost Analysis', desc: 'Models the cognitive cost of switching, grounded in neuroscience.' },
        { title: 'Detailed Analysis', desc: 'Personal work pattern recognition: 6 work types and a 7-day heatmap.' },
      ],
      screenshotsTitle: 'Inside the app',
      screenshots: [
        { title: 'Menu Bar Status', description: 'Real-time focus state indicator in your menu bar' },
        { title: 'Focus Metrics', description: 'Daily writing time, reading time, and context switches' },
        { title: 'Session Details', description: 'Detailed view of your longest focus sessions' },
        { title: 'Advanced Analytics', description: 'Work pattern recognition and cognitive cost analysis' },
      ],
      privacyTitle: 'Your attention data stays on your Mac.',
      privacyDesc: 'All data is stored locally. Zero upload.',
      ctaTitleLine1: 'Good work takes time.',
      ctaTitleLine2: 'Start by guarding the next 25 minutes.',
      ctaSubtitle: 'Download Contextly, press ⌃⌥⌘F, and give one thing your full attention.',
      ctaPrimary: 'Download for macOS',
      ctaSecondary: 'Share feedback',
      footerTagline: 'Take your focus back in a fragmented age.',
      footerDownload: 'Download',
      footerFeedback: 'Feedback',
      footerIssues: 'Issues',
      footerChangelog: 'Changelog',
      footerPV: 'PV',
      footerUV: 'UV',
      supportModalTitle: 'Buy me a coffee ☕',
      supportModalDesc: 'Thank you for supporting! Your encouragement helps us iterate Contextly.',
      supportModalNote: 'Choose a payment method',
      supportModalBmcBtn: 'Support on Buy Me a Coffee',
      supportModalWeChat: 'WeChat Pay',
      supportModalBmc: 'Buy Me a Coffee',
    },
    zh: {
      brand: 'Contextly',
      navWhy: '为什么',
      navFocus: 'Focus Mode',
      navFeatures: '功能',
      navChangelog: '更新日志',
      navFeedback: '反馈',
      download: '下载 macOS 版',
      downloadShort: '下载',
      supportAuthor: '支持作者',
      supportTitle: '请作者喝咖啡支持本站',
      heroBadge: '新功能 · Focus Mode',
      heroTitleLine1: '注意力碎成了秒，',
      heroTitleLine2: '把专注夺回来。',
      heroSubtitle:
        'Contextly 是一款安静的 macOS 菜单栏工具。全新的 Focus Mode 帮你锁定一件事，走神时温和地把你拉回来；后台的注意力统计，让你看清时间究竟碎在了哪里。',
      heroPrimary: '下载 macOS 版',
      heroSecondary: '看看 Focus Mode 怎么用',
      heroMeta: ['macOS 菜单栏', '数据本地存储，零上传', 'GitHub 公开反馈'],
      mockFocusing: '专注中',
      mockTier: '强专注',
      mockLocked: '锁定：当前浏览器标签页',
      mockFocusedLabel: '已专注',
      mockGoalLabel: '目标 50:00',
      mockInterruptions: '中断 0 次',
      mockGlances: '瞥一眼 2 次',
      mockAwayTitle: '你离开了目标',
      mockAwayDesc: '10 秒内回来，只算瞥一眼',
      mockBack: '回到目标',
      mockWindowTitle: 'draft.md — 真正重要的那件事',
      whyEyebrow: '问题',
      whyTitle: '注意力的刻度，正在一格一格变小。',
      scale: [
        { value: '45', unit: '分钟', label: '上学时的一堂课' },
        { value: '25', unit: '分钟', label: '一个番茄钟' },
        { value: '1–2', unit: '分钟', label: '一条短视频的爽感' },
        { value: '秒级', unit: '', label: '下一次滑动之前' },
      ],
      whyBody:
        '抖音、小红书、视频号、B 站、X、Instagram、TikTok……每一个都用 1–2 分钟的爽感把你留住，然后是下一个，再下一个。手指停不下来，脑子却越来越难在一件事上多待一会儿。',
      whyCounter: '可真正好的东西——一篇文章、一段代码、一个想法——本来就是痛苦的，是长时间一点点磨出来的。',
      storyQuote: '我做 Contextly，最初是为了救我自己。',
      storyBody:
        '它不是又一个效率神器，而是我为了把自己从碎片里捞出来而做的工具：先看清注意力去了哪里，再把它拉回到真正重要的那件事上。',
      storySignature: '—— 杨文麦，Contextly 作者',
      focusEyebrow: '新功能 · Focus Mode',
      focusTitle: '锁定一件事，直到把它做完。',
      focusSubtitle: '它不只是一个倒计时。Focus Mode 知道你是否还在目标上；当你走神时，它不说教，只是把你带回来。',
      focusSteps: [
        {
          title: '一键锁定',
          desc: '按下 ⌃⌥⌘F，或在菜单栏点“开始专注”，锁定当前窗口。在 Chrome、Edge、Brave、Arc 中可以精确到标签页。',
        },
        {
          title: '宽限，而不是惩罚',
          desc: '切走后在宽限期内回来（默认 10 秒，可在 5–60 秒间调整），只记一次“瞥一眼”。',
        },
        {
          title: '温和地拉回来',
          desc: '离开目标时浮出一个不抢焦点的提示，一键“回到目标”；菜单栏图标显示专注时间，离开时会变色。',
        },
        {
          title: '诚实的记录',
          desc: '放弃需要二次确认，计入时长为 0，但会留下记录。今日专注时长、放弃率、目标达成率、连续天数、主要分心 App，一目了然。',
        },
      ],
      tiersTitle: '两档强度，对应两种工作',
      tiers: [
        {
          name: '普通专注',
          tagline: '适合日常的深度工作',
          points: ['累计你停留在目标上的全部时间', '超过宽限期记一次中断，累计时长保留'],
        },
        {
          name: '强专注',
          tagline: '适合必须一口气完成的事',
          points: ['只算当前连续不中断的一段', '超过宽限期，有效时长清零', '可选：开始时隐藏其他 App'],
        },
      ],
      focusFootnote: '锁屏或睡眠时自动暂停计时；即使 Contextly 意外退出，下次启动也会恢复这次会话的记录。',
      insightEyebrow: '始终在后台安静运行',
      insightTitle: '看清你的注意力，到底去了哪里。',
      insightSubtitle: '想守住专注，先得看见它。Contextly 全天在后台默默度量你的注意力——不用手动计时，也不用填写任何东西。',
      insights: [
        { title: '读写识别', desc: '根据你的活动区分阅读与写作，菜单栏实时显示当前状态。' },
        { title: '上下文切换', desc: '识别每一次应用切换，统计你的注意力被打断了多少次。' },
        { title: '每日指标', desc: '每天的写作时间、阅读时间、切换次数，以及最长的一段专注。' },
        { title: '应用会话', desc: '每个应用的会话时长与切换次数，让专注和分心的模式浮出水面。' },
        { title: '每小时提醒', desc: '每小时一次附带可操作建议的摘要，并会避开深度专注时段。' },
        { title: '数据导出', desc: '将统计数据导出为 JSON，方便备份或自行分析。' },
      ],
      advancedTitle: '高级分析（按需开启）',
      advancedItems: [
        { title: 'Enhanced Analysis', desc: '基于 30+ 应用行为特征，提升读写识别准确度。' },
        { title: 'Switch Cost Analysis', desc: '基于神经科学理论，量化每次切换的认知成本。' },
        { title: 'Detailed Analysis', desc: '个人工作模式识别：6 种工作类型 + 7 天热力图。' },
      ],
      screenshotsTitle: '应用截图',
      screenshots: [
        { title: '菜单栏状态', description: '菜单栏实时显示专注状态指示器' },
        { title: '专注指标', description: '每日写作时间、阅读时间和上下文切换统计' },
        { title: '会话详情', description: '最长专注会话的详细信息展示' },
        { title: '高级分析', description: '工作模式识别和认知成本分析' },
      ],
      privacyTitle: '你的注意力数据，只留在你的 Mac 上。',
      privacyDesc: '所有数据本地存储，零上传。',
      ctaTitleLine1: '好的东西需要时间。',
      ctaTitleLine2: '先守住接下来的 25 分钟。',
      ctaSubtitle: '下载 Contextly，按下 ⌃⌥⌘F，把完整的注意力交给一件事。',
      ctaPrimary: '下载 macOS 版',
      ctaSecondary: '反馈建议',
      footerTagline: '在碎片化的时代，夺回你的专注力。',
      footerDownload: '下载',
      footerFeedback: '反馈',
      footerIssues: '问题',
      footerChangelog: '更新日志',
      footerPV: '访问量',
      footerUV: '访客数',
      supportModalTitle: '请作者喝杯咖啡 ☕',
      supportModalDesc: '感谢你的支持！你的鼓励能帮助我们持续迭代 Contextly。',
      supportModalNote: '请选择支付方式',
      supportModalBmcBtn: '去 Buy Me a Coffee 支持',
      supportModalWeChat: '微信支付',
      supportModalBmc: 'Buy Me a Coffee',
    },
  }

  const [language, setLanguage] = useState<Language>('en')
  const [supportOpen, setSupportOpen] = useState(false)
  const [focusedSeconds, setFocusedSeconds] = useState(MOCK_START_SECONDS)

  useEffect(() => {
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang')
      const saved = typeof window !== 'undefined' ? localStorage.getItem('ctxly_lang') : null
      const detected = typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
      const initial = urlLang === 'en' || urlLang === 'zh' ? (urlLang as Language) : (saved === 'en' || saved === 'zh' ? (saved as Language) : detected)
      setLanguage(initial)
    } catch {
      setLanguage('en')
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('ctxly_lang', language)
    } catch {}
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  useEffect(() => {
    const timer = setInterval(() => {
      setFocusedSeconds((previous) => (previous >= MOCK_GOAL_SECONDS ? MOCK_START_SECONDS : previous + 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const t = useMemo(() => messages[language], [language])
  const focusProgress = Math.min(100, (focusedSeconds / MOCK_GOAL_SECONDS) * 100)
  const screenshotSources = [
    '/screenshots/menubar-status.png',
    '/screenshots/focus-metrics.png',
    '/screenshots/session-details.png',
    '/screenshots/advanced-analytics.png',
  ]

  const handleOpenSupport = () => setSupportOpen(true)

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f6f2] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/80 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-6 w-6" />
            <span className="text-[15px] font-semibold tracking-tight">{t.brand}</span>
          </a>
          <nav className="flex items-center gap-1 md:gap-6">
            <a href="#why" className="hidden text-sm text-stone-400 transition-colors hover:text-white md:inline">{t.navWhy}</a>
            <a href="#focus-mode" className="hidden text-sm text-stone-400 transition-colors hover:text-white md:inline">{t.navFocus}</a>
            <a href="#features" className="hidden text-sm text-stone-400 transition-colors hover:text-white md:inline">{t.navFeatures}</a>
            <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="hidden text-sm text-stone-400 transition-colors hover:text-white lg:inline">{t.navChangelog}</a>
            <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer" className="hidden text-sm text-stone-400 transition-colors hover:text-white lg:inline">{t.navFeedback}</a>
            <div className="flex items-center gap-1.5 px-2 text-xs md:border-l md:border-white/15 md:pl-5">
              <a className={language === 'en' ? 'font-semibold text-white' : 'text-stone-500 hover:text-white'} href={window.location.pathname + '?lang=en'}>EN</a>
              <span className="text-stone-700">/</span>
              <a className={language === 'zh' ? 'font-semibold text-white' : 'text-stone-500 hover:text-white'} href={window.location.pathname + '?lang=zh'}>中文</a>
            </div>
            <Button variant="inverse" size="sm" asChild>
              <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">{t.downloadShort}</a>
            </Button>
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-stone-950 text-white">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-20%] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(234,88,12,0.22),transparent)]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <motion.a
                href="#focus-mode"
                className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-300 transition-colors hover:bg-orange-500/20"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                {t.heroBadge}
                <span aria-hidden>→</span>
              </motion.a>
              <motion.h1
                className="mt-6 text-[2.5rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <span className="block text-stone-400">{t.heroTitleLine1}</span>
                <span className="block">{t.heroTitleLine2}</span>
              </motion.h1>
              <motion.p
                className="mt-6 max-w-xl text-base leading-relaxed text-stone-400 md:text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t.heroSubtitle}
              </motion.p>
              <motion.div
                className="mt-9 flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Button variant="inverse" size="lg" asChild>
                  <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.14.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.3-3.5zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.68-.92 2.68.97.07 1.96-.5 2.56-1.23z" /></svg>
                    {t.heroPrimary}
                  </a>
                </Button>
                <Button variant="outlineInverse" size="lg" asChild>
                  <a href="#focus-mode">{t.heroSecondary}</a>
                </Button>
              </motion.div>
              <motion.ul
                className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                {t.heroMeta.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-stone-600" />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Focus Mode preview */}
            <motion.div
              className="relative mx-auto w-full max-w-md lg:max-w-none"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
              aria-hidden
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-stone-900/80 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-4 py-2 text-[11px] text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md bg-emerald-400/10 px-2 py-0.5 font-medium text-emerald-300 tabular-nums">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    {formatClock(focusedSeconds)}
                  </div>
                </div>
                <div className="px-6 pb-28 pt-5">
                  <p className="text-[11px] text-stone-500">{t.mockWindowTitle}</p>
                  <div className="mt-5 space-y-3">
                    <div className="h-2.5 w-11/12 rounded-full bg-white/10" />
                    <div className="h-2.5 w-full rounded-full bg-white/10" />
                    <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
                    <div className="h-2.5 w-2/3 rounded-full bg-white/[0.06]" />
                    <div className="!mt-7 h-2.5 w-full rounded-full bg-white/10" />
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-1/2 rounded-full bg-white/10" />
                      <div className="h-4 w-0.5 animate-pulse bg-orange-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 left-4 right-4 rounded-2xl border border-white/10 bg-stone-900/95 p-5 shadow-2xl backdrop-blur sm:left-auto sm:right-[-12px] sm:w-80">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {t.mockFocusing} · {t.mockTier}
                  </span>
                  <span className="text-[11px] text-stone-500">{t.mockGoalLabel}</span>
                </div>
                <p className="mt-3 text-[11px] text-stone-500">{t.mockFocusedLabel}</p>
                <p className="text-4xl font-semibold tracking-tight tabular-nums">{formatClock(focusedSeconds)}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full origin-left rounded-full bg-emerald-400"
                    animate={{ scaleX: focusProgress / 100 }}
                    transition={{ duration: 1, ease: 'linear' }}
                  />
                </div>
                <p className="mt-3 text-[11px] text-stone-500">{t.mockLocked}</p>
                <div className="mt-1 flex gap-4 text-[11px] text-stone-400">
                  <span>{t.mockInterruptions}</span>
                  <span>{t.mockGlances}</span>
                </div>
              </div>

              <div className="absolute -top-5 left-[-8px] hidden w-64 rounded-xl border border-orange-400/20 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:block">
                <p className="flex items-center gap-2 text-xs font-medium text-orange-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  {t.mockAwayTitle}
                </p>
                <p className="mt-1 text-[11px] text-stone-400">{t.mockAwayDesc}</p>
                <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-medium text-stone-950">{t.mockBack}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem */}
        <section id="why" className="scroll-mt-16 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{t.whyEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.whyTitle}</h2>
            </motion.div>

            <motion.ol {...reveal} className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 md:grid-cols-4">
              {t.scale.map((item, index) => (
                <li key={item.label} className="flex flex-col justify-between bg-[#f7f6f2] p-6 md:p-8">
                  <div
                    className={[
                      'h-1 rounded-full',
                      index === 0 ? 'w-full bg-stone-900' : '',
                      index === 1 ? 'w-[56%] bg-stone-700' : '',
                      index === 2 ? 'w-[12%] bg-orange-500' : '',
                      index === 3 ? 'w-[3%] bg-orange-500' : '',
                    ].join(' ')}
                  />
                  <p className="mt-10 flex items-baseline gap-1.5">
                    <span className={['text-4xl font-semibold tracking-tight md:text-5xl', index >= 2 ? 'text-orange-600' : 'text-stone-900'].join(' ')}>{item.value}</span>
                    {item.unit && <span className="text-sm text-stone-500">{item.unit}</span>}
                  </p>
                  <p className="mt-2 text-sm text-stone-600">{item.label}</p>
                </li>
              ))}
            </motion.ol>

            <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
              <motion.p {...reveal} className="text-lg leading-relaxed text-stone-600">{t.whyBody}</motion.p>
              <motion.p {...reveal} className="text-lg font-medium leading-relaxed text-stone-900">{t.whyCounter}</motion.p>
            </div>

            <motion.figure {...reveal} className="mt-20 border-l-2 border-orange-500 pl-6 md:pl-10">
              <blockquote>
                <p className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">“{t.storyQuote}”</p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600">{t.storyBody}</p>
              </blockquote>
              <figcaption className="mt-5 text-sm text-stone-500">{t.storySignature}</figcaption>
            </motion.figure>
          </div>
        </section>

        {/* Focus Mode */}
        <section id="focus-mode" className="scroll-mt-16 bg-stone-950 px-5 py-24 text-white md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">{t.focusEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.focusTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-stone-400">{t.focusSubtitle}</p>
            </motion.div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
              {t.focusSteps.map((step, index) => (
                <motion.div {...reveal} key={step.title} className="bg-stone-950 p-7 md:p-10">
                  <span className="font-mono text-xs text-stone-600">0{index + 1}</span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-stone-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.h3 {...reveal} className="mt-24 text-2xl font-semibold tracking-tight md:text-3xl">{t.tiersTitle}</motion.h3>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {t.tiers.map((tier, index) => (
                <motion.div
                  {...reveal}
                  key={tier.name}
                  className={[
                    'rounded-3xl border p-7 md:p-9',
                    index === 1 ? 'border-orange-500/40 bg-gradient-to-b from-orange-500/[0.08] to-transparent' : 'border-white/10 bg-white/[0.03]',
                  ].join(' ')}
                >
                  <p className={['text-xl font-semibold', index === 1 ? 'text-orange-300' : 'text-white'].join(' ')}>{tier.name}</p>
                  <p className="mt-1 text-sm text-stone-500">{tier.tagline}</p>
                  <ul className="mt-6 space-y-3">
                    {tier.points.map((point) => (
                      <li key={point} className="flex gap-3 text-stone-300">
                        <span className={['mt-2 h-1.5 w-1.5 shrink-0 rounded-full', index === 1 ? 'bg-orange-400' : 'bg-stone-500'].join(' ')} />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <motion.p {...reveal} className="mt-8 text-sm text-stone-500">{t.focusFootnote}</motion.p>
          </div>
        </section>

        {/* Attention insights */}
        <section id="features" className="scroll-mt-16 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">{t.insightEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.insightTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-stone-600">{t.insightSubtitle}</p>
            </motion.div>

            <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {t.insights.map((item) => (
                <motion.div {...reveal} key={item.title} className="border-t border-stone-300 pt-6">
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...reveal} className="mt-16 rounded-3xl border border-stone-200 bg-white p-7 md:p-10">
              <h3 className="text-lg font-semibold tracking-tight">{t.advancedTitle}</h3>
              <ul className="mt-6 grid gap-6 md:grid-cols-3">
                {t.advancedItems.map((item) => (
                  <li key={item.title}>
                    <p className="font-mono text-sm font-medium text-stone-900">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...reveal} className="mt-24">
              <h3 className="mb-8 text-center text-2xl font-semibold tracking-tight">{t.screenshotsTitle}</h3>
              <ScreenshotCarousel
                screenshots={t.screenshots.map((screenshot, index) => ({
                  src: screenshotSources[index],
                  alt: screenshot.title,
                  title: screenshot.title,
                  description: screenshot.description,
                }))}
                autoPlay={true}
                interval={5000}
              />
            </motion.div>

            <motion.div {...reveal} className="mt-24 flex flex-col items-start gap-4 rounded-3xl bg-stone-900 p-8 text-white md:flex-row md:items-center md:justify-between md:p-10">
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                </span>
                <p className="text-lg font-semibold tracking-tight md:text-xl">{t.privacyTitle}</p>
              </div>
              <p className="text-stone-400">{t.privacyDesc}</p>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-stone-950 px-5 py-28 text-center text-white md:px-8 md:py-36">
          <div aria-hidden className="pointer-events-none absolute bottom-[-40%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(234,88,12,0.18),transparent)]" />
          <motion.div {...reveal} className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              <span className="block text-stone-400">{t.ctaTitleLine1}</span>
              <span className="block">{t.ctaTitleLine2}</span>
            </h2>
            <p className="mt-6 text-lg text-stone-400">{t.ctaSubtitle}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="inverse" size="lg" asChild>
                <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">{t.ctaPrimary}</a>
              </Button>
              <Button variant="outlineInverse" size="lg" asChild>
                <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer">{t.ctaSecondary}</a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-stone-950 px-5 pb-10 text-sm text-stone-500 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-stone-300">
              <img src="/favicon.svg" alt="" className="h-5 w-5" />
              <span className="font-medium">{t.brand}</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-500">{t.footerTagline}</span>
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span>© 2026 Contextly</span>
              <span>{t.footerPV}: <span id="urlstat-page-pv">-</span></span>
              <span>{t.footerUV}: <span id="urlstat-page-uv">-</span></span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">{t.footerDownload}</a>
            <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">{t.footerFeedback}</a>
            <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">{t.footerIssues}</a>
            <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">{t.footerChangelog}</a>
            <button
              type="button"
              onClick={handleOpenSupport}
              title={t.supportTitle}
              aria-label={t.supportAuthor}
              className="inline-flex items-center"
            >
              <img src={BMC_BADGE_URL} alt="Buy me a coffee" className="h-8 rounded-md" />
            </button>
          </div>
        </div>
      </footer>

      <SupportModal
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
        title={t.supportModalTitle}
        description={t.supportModalDesc}
        note={t.supportModalNote}
        buttonLabel={t.supportModalBmcBtn}
        enableWeChat={true}
        wechatQrSrc={'/wechat-qr-code.png'}
        wechatTitle={t.supportModalWeChat}
        bmcTitle={t.supportModalBmc}
      />
    </div>
  )
}
