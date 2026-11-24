import { Button } from './components/ui/button'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ScreenshotCarousel } from './components/ui/screenshot-carousel'
import { SupportModal } from './components/ui/support-modal'

type Language = 'en' | 'zh'
type CapabilityId = 'menu' | 'focus' | 'note'

type Threshold = {
  value: string
  unit: string
  body: string
}

type Capability = {
  id: CapabilityId
  shortcut: string
  title: string
  body: readonly string[]
  handoff: string
}

type TogetherStep = {
  title: string
  body: string
}

type ScaleMark = {
  value: string
  unit: string
  label: string
}

type ScreenshotCopy = {
  title: string
  description: string
}

type Copy = {
  pageTitle: string
  description: string
  brand: string
  navHow: string
  navTogether: string
  navChangelog: string
  navFeedback: string
  download: string
  downloadShort: string
  supportAuthor: string
  supportTitle: string
  heroKicker: string
  heroTitleLine1: string
  heroTitleLine2: string
  heroTitleLine3: string
  heroSubtitle: string
  heroPrimary: string
  heroSecondary: string
  heroMeta: readonly string[]
  storyEyebrow: string
  storyTitle: string
  storyScale: readonly ScaleMark[]
  storyPlatforms: string
  storyCounter: string
  storyQuote: string
  storyNote: string
  storySignature: string
  screenshotsTitle: string
  screenshots: readonly ScreenshotCopy[]
  mockCaption: string
  mockStatus: string
  mockSegment: string
  mockRibbon: readonly string[]
  mockFocusTier: string
  mockFocused: string
  mockGoal: string
  mockTarget: string
  mockNoteShortcut: string
  mockNoteBody: string
  mockNoteSource: string
  whyEyebrow: string
  whyTitle: string
  whyBody: string
  thresholds: readonly Threshold[]
  loopEyebrow: string
  loopTitle: string
  loopSubtitle: string
  capabilities: readonly Capability[]
  togetherEyebrow: string
  togetherTitle: string
  togetherSubtitle: string
  together: readonly TogetherStep[]
  privacyTitle: string
  privacyDesc: string
  ctaTitle: string
  ctaSubtitle: string
  ctaPrimary: string
  ctaSecondary: string
  footerTagline: string
  footerDownload: string
  footerFeedback: string
  footerIssues: string
  footerChangelog: string
  footerPV: string
  footerUV: string
  supportModalTitle: string
  supportModalDesc: string
  supportModalNote: string
  supportModalBmcBtn: string
  supportModalWeChat: string
  supportModalWeChatHint: string
  supportModalBmc: string
  supportModalBmcHint: string
  closeLabel: string
}

const DOWNLOAD_URL = 'https://github.com/yangwenmai/ctxly.ai/releases/latest'
const RELEASES_URL = 'https://github.com/yangwenmai/ctxly.ai/releases'
const DISCUSSIONS_URL = 'https://github.com/yangwenmai/ctxly.ai/discussions'
const ISSUES_URL = 'https://github.com/yangwenmai/ctxly.ai/issues'
const BMC_BADGE_URL =
  'https://img.buymeacoffee.com/button-api/?text=&emoji=%E2%98%95&slug=maiyang&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff'

const ribbonBars = ['bg-[#D97A2B]', 'bg-[#1F9A8A]', 'bg-[#E5484D]', 'bg-[#8E8E96]'] as const
const ribbonWidths = ['w-[46%]', 'w-[28%]', 'w-[8%]', 'w-[18%]'] as const
const scaleBars = ['w-full bg-[#1B1B1F]', 'w-[56%] bg-[#5B5BD6]', 'w-[14%] bg-[#D97A2B]', 'w-[4%] bg-[#E5484D]'] as const
const screenshotSources = [
  '/screenshots/menubar-status.png',
  '/screenshots/focus-metrics.png',
  '/screenshots/session-details.png',
  '/screenshots/advanced-analytics.png',
] as const

const messages: Record<Language, Copy> = {
  en: {
    pageTitle: 'Contextly. Attention breaks in under a second.',
    description:
      'Contextly is a macOS menu bar app. It counts a switch only after the previous app has stayed, Focus Mode locks one thing, and Quick Note catches the thought that shows up. Data stays on this Mac.',
    brand: 'Contextly',
    navHow: 'Three parts',
    navTogether: 'One session',
    navChangelog: 'Changelog',
    navFeedback: 'Feedback',
    download: 'Download for macOS',
    downloadShort: 'Download',
    supportAuthor: 'Support the author',
    supportTitle: 'Buy me a coffee',
    heroKicker: 'macOS menu bar',
    heroTitleLine1: 'Attention breaks in under a second.',
    heroTitleLine2: 'Write it down.',
    heroTitleLine3: 'Lock the one thing.',
    heroSubtitle:
      'Contextly lives in the menu bar. It counts a switch only after the previous app has stayed. Focus Mode locks the tab, window, or app you mean to keep. Quick Note catches the thought that shows up, and that note does not count as leaving.',
    heroPrimary: 'Download for macOS',
    heroSecondary: 'See the three parts',
    heroMeta: ['macOS menu bar', 'Data stays on this Mac', 'English and 中文'],
    storyEyebrow: 'The problem',
    storyTitle: 'The unit of our attention keeps shrinking.',
    storyScale: [
      { value: '45', unit: 'min', label: 'A class period at school' },
      { value: '25', unit: 'min', label: 'One Pomodoro' },
      { value: '1–2', unit: 'min', label: 'The rush of one short video' },
      { value: 'Seconds', unit: '', label: 'Before the next swipe' },
    ],
    storyPlatforms:
      'Douyin, Xiaohongshu, WeChat Channels, Bilibili, X, Instagram, TikTok — each one holds you with a one-or-two-minute rush, then the next, then the next. Your thumb won’t stop, and your mind finds it harder and harder to stay with one thing.',
    storyCounter:
      'Yet anything truly good — an essay, a piece of code, an idea — is supposed to be hard. It is ground out slowly, over long stretches of time.',
    storyQuote: 'I built Contextly to save myself first.',
    storyNote:
      'It is not another productivity gadget. It is the tool I needed to pull myself out of the fragments: first see where my attention goes, then bring it back to the one thing that matters.',
    storySignature: '— Mai Yang, author of Contextly',
    screenshotsTitle: 'App Screenshots',
    screenshots: [
      { title: 'Menu Bar Status', description: 'Real-time focus state indicator in your menu bar' },
      { title: 'Focus Metrics', description: 'Daily writing time, reading time, and context switches' },
      { title: 'Session Details', description: 'Detailed view of your longest focus sessions' },
      { title: 'Advanced Analytics', description: 'Work pattern recognition and cognitive cost analysis' },
    ],
    mockCaption: 'An example, not your data',
    mockStatus: 'Writing in Notes',
    mockSegment: 'This stretch 06:12 · since 09:41',
    mockRibbon: ['Writing', 'Reading', 'Switches', 'Idle'],
    mockFocusTier: 'Normal Focus',
    mockFocused: '18:40',
    mockGoal: '25:00',
    mockTarget: 'Target',
    mockNoteShortcut: '⌥⌘N',
    mockNoteBody: 'Jot down your thought…',
    mockNoteSource: 'Notes',
    whyEyebrow: 'The second',
    whyTitle: 'Contextly reports a switch only after the previous app stayed at least 0.5 seconds.',
    whyBody:
      'The menu bar watches the frontmost app. Focus Mode is what locks a tab. A stretch is writing when keystrokes take more than a fifth of it. Input Monitoring sees timing. It does not record the characters.',
    thresholds: [
      { value: '0.5', unit: 'sec', body: 'A frontmost app that stays under 0.5 seconds is not reported as a switch.' },
      { value: '0.8', unit: 'sec', body: 'A stretch is saved at 0.8 seconds. Reading totals count only those stretches.' },
      { value: '20', unit: '%', body: 'Keystrokes over 20% of the stretch mark it as writing.' },
      { value: '60', unit: 'sec', body: 'The writing or reading label waits 60 seconds, so the icon does not flicker.' },
    ],
    loopEyebrow: 'Three parts',
    loopTitle: 'The menu bar, Focus Mode, and Quick Note.',
    loopSubtitle: 'Each one has a job. The next section is how a single focus session uses all three.',
    capabilities: [
      {
        id: 'menu',
        shortcut: 'Always on',
        title: 'The menu bar sees the second first',
        body: [
          'The icon reads "Writing in Notes", "Reading in Safari", or "Contextly · Idle". When the screen locks, the icon dims and tracking stops. The tooltip is "Contextly · Screen locked (not tracking)".',
          'Open the popover for effective focus today, and for "vs this time yesterday". The context ribbon splits into Writing, Reading, Switches, and Idle. Four numbers sit under it: writing time, reading time, switch count with times per hour, and longest focus. The Top apps row lists at most three. Those apps hide while Focus Mode is running.',
          'Quick Note is ⌥⌘N. Note Pool is ⌥⌘M. Detailed Stats is ⌘D.',
        ],
        handoff: 'To pull the day onto one thing, choose Start Focus in that popover, or press ⌃⌥⌘F.',
      },
      {
        id: 'focus',
        shortcut: '⌃⌥⌘F',
        title: 'Focus Mode locks one thing',
        body: [
          'The panel asks "What will you focus on?". Chrome, Edge, Brave, and Arc can lock the current tab. Safari is approximate. Other browsers lock the window. With no window, Focus Mode locks the app. You can also name something that is not on screen. That path is Normal Focus only, and switching apps does not count as leaving.',
          'Past the grace period, Normal Focus records one interruption and keeps the time already counted. Strong Focus resets effective time to zero. Grace defaults to 10 seconds. The other choices are 5, 15, 30, and 60. A goal can be 25, 50, or 90 minutes, or none.',
          'About 3 seconds after you leave, a panel that does not take focus offers "Back to target" and "Just a glance". Strong Focus can hide other apps when it starts. That switch defaults to off. Focus Mode does not pull focus back by itself. Lock and sleep pause the timer. After more than 30 minutes, it asks whether to continue or finish.',
        ],
        handoff: 'When a thought shows up, press ⌥⌘N. A Quick Note during the session does not count as leaving, and the timer keeps going. Close the note and you return to the target.',
      },
      {
        id: 'note',
        shortcut: '⌥⌘N',
        title: 'Quick Note catches the thought',
        body: [
          'Press ⌥⌘N in any app. The placeholder is "Jot down your thought…". The note stores the current app and window title. In Safari, Chrome, Firefox, Edge, Brave, Arc, and Opera it can also store the URL. The URL needs Automation permission, and macOS asks the first time.',
          'Notes are stored as plain text, and you can preview Markdown. There are six paper colors. ⌘↩ archives the note into the Note Pool. ⌥⌘M opens the pool. If you turn on Obsidian sync, each note is also a Markdown file in a folder you choose.',
        ],
        handoff: 'Non-empty notes taken during the session are counted as "Ideas captured" when it ends. "Note where I stopped" on the summary is not one of those.',
      },
    ],
    togetherEyebrow: 'One session',
    togetherTitle: 'Four beats, one locked thing.',
    togetherSubtitle:
      'You start by locking a target. If you leave, Contextly asks you back. If a thought shows up, you write it down and the session keeps counting. At the end you see the time this round actually kept.',
    together: [
      {
        title: 'Start',
        body: 'Press ⌃⌥⌘F, or choose Start Focus. The lock is the current tab, the window, or the whole app.',
      },
      {
        title: 'Leave',
        body: 'A reminder appears after about 3 seconds. The default grace is 10 seconds. Coming back inside it is one glance. Normal Focus then records an interruption and keeps the accumulated time. Strong Focus resets effective time.',
      },
      {
        title: 'Write',
        body: 'Press ⌥⌘N. While the note is in front, the grace timer does not run and no interruption is recorded. The focus time still counts. Closing or archiving the note returns you to the target.',
      },
      {
        title: 'Finish',
        body: 'Reaching the goal plays the system Glass sound and ends the round. The summary offers Another round, or Note where I stopped. Abandon asks a second time, credits zero, and keeps the record.',
      },
    ],
    privacyTitle: 'The record stays on this Mac.',
    privacyDesc:
      'Nothing is uploaded. Accessibility permission is how Contextly sees which app and window you switched to. Input Monitoring sees keystroke timing so it can tell writing from reading. It does not record what you typed.',
    ctaTitle: 'Let the menu bar see the next switch.',
    ctaSubtitle: 'Download Contextly. Press ⌃⌥⌘F when you are ready. Press ⌥⌘N when a thought shows up, then go back.',
    ctaPrimary: 'Download for macOS',
    ctaSecondary: 'Share feedback',
    footerTagline: 'Count the switch. Lock the one thing.',
    footerDownload: 'Download',
    footerFeedback: 'Feedback',
    footerIssues: 'Issues',
    footerChangelog: 'Changelog',
    footerPV: 'PV',
    footerUV: 'UV',
    supportModalTitle: 'Buy me a coffee',
    supportModalDesc: 'Thank you for supporting. Your encouragement helps Contextly keep going.',
    supportModalNote: 'Choose a payment method',
    supportModalBmcBtn: 'Support on Buy Me a Coffee',
    supportModalWeChat: 'WeChat Pay',
    supportModalWeChatHint: 'Scan with WeChat. Add a note, or add me on WeChat: mai_yang',
    supportModalBmc: 'Buy Me a Coffee',
    supportModalBmcHint: 'Credit card or PayPal',
    closeLabel: 'Close',
  },
  zh: {
    pageTitle: 'Contextly。注意力碎在不到一秒的切换里。',
    description:
      'Contextly 是 macOS 菜单栏应用。前台 App 停留够久才记一次切换。专注模式锁住一件事。Quick Note 接住闪过的念头。数据留在本机。',
    brand: 'Contextly',
    navHow: '三个部分',
    navTogether: '同一次专注',
    navChangelog: '更新日志',
    navFeedback: '反馈',
    download: '下载 macOS 版',
    downloadShort: '下载',
    supportAuthor: '支持作者',
    supportTitle: '请作者喝咖啡',
    heroKicker: 'macOS 菜单栏',
    heroTitleLine1: '注意力碎在不到一秒的切换里。',
    heroTitleLine2: '记下来。',
    heroTitleLine3: '再锁住这一件。',
    heroSubtitle:
      'Contextly 待在菜单栏里。前台 App 停留够久，才记一次切换。专注模式锁住你要守住的标签页、窗口或 App。念头闪过时，Quick Note 接住它，这不算离开。',
    heroPrimary: '下载 macOS 版',
    heroSecondary: '看看这三个部分',
    heroMeta: ['macOS 菜单栏', '数据留在本机', '中文 / English'],
    storyEyebrow: '问题',
    storyTitle: '注意力的刻度，正在一格一格变小。',
    storyScale: [
      { value: '45', unit: '分钟', label: '上学时的一堂课' },
      { value: '25', unit: '分钟', label: '一个番茄钟' },
      { value: '1–2', unit: '分钟', label: '一条短视频的爽感' },
      { value: '秒级', unit: '', label: '下一次滑动之前' },
    ],
    storyPlatforms:
      '抖音、小红书、视频号、B 站、X、Instagram、TikTok……每一个都用 1–2 分钟的爽感把你留住，然后是下一个，再下一个。手指停不下来，脑子却越来越难在一件事上多待一会儿。',
    storyCounter: '可真正好的东西——一篇文章、一段代码、一个想法——本来就是痛苦的，是长时间一点点磨出来的。',
    storyQuote: '我做 Contextly，最初是为了救我自己。',
    storyNote:
      '它不是又一个效率神器，而是我为了把自己从碎片里捞出来而做的工具：先看清注意力去了哪里，再把它拉回到真正重要的那件事上。',
    storySignature: '—— 杨文麦，Contextly 作者',
    screenshotsTitle: '应用截图',
    screenshots: [
      { title: '菜单栏状态', description: '菜单栏实时显示专注状态指示器' },
      { title: '专注指标', description: '每日写作时间、阅读时间和上下文切换统计' },
      { title: '会话详情', description: '最长专注会话的详细信息展示' },
      { title: '高级分析', description: '工作模式识别和认知成本分析' },
    ],
    mockCaption: '示意，不是你的数据',
    mockStatus: '正在备忘录中写作',
    mockSegment: '本段 06:12 · 自 09:41',
    mockRibbon: ['写作', '阅读', '切换', '空闲'],
    mockFocusTier: '普通专注',
    mockFocused: '18:40',
    mockGoal: '25:00',
    mockTarget: '锁定目标',
    mockNoteShortcut: '⌥⌘N',
    mockNoteBody: '记下你的想法…',
    mockNoteSource: '备忘录',
    whyEyebrow: '这一秒',
    whyTitle: '前台 App 至少停留 0.5 秒，才记一次切换。',
    whyBody:
      '菜单栏看的是前台 App。标签页由专注模式来锁。一段里按键时间超过两成，记为写作。输入监控只看按键节奏，不记录你打了什么字。',
    thresholds: [
      { value: '0.5', unit: '秒', body: '前台 App 停留短于 0.5 秒，不记为一次切换。' },
      { value: '0.8', unit: '秒', body: '一段停留满 0.8 秒才写入记录。阅读只计这样的段。' },
      { value: '20', unit: '%', body: '这段时间里按键超过 20%，记为写作。' },
      { value: '60', unit: '秒', body: '写作或阅读的菜单栏文字，要这段满 60 秒才出现，免得图标一直跳。' },
    ],
    loopEyebrow: '三个部分',
    loopTitle: '菜单栏、专注模式、Quick Note。',
    loopSubtitle: '每一件有自己的位置。下一节是同一次专注里，这三件怎么接上。',
    capabilities: [
      {
        id: 'menu',
        shortcut: '一直开着',
        title: '菜单栏先看见这一秒',
        body: [
          '图标会写成「正在备忘录中写作」「正在 Safari 中阅读」，或「Contextly · 空闲」。锁屏时图标变暗，记录停止。提示是「Contextly · 已锁屏（暂停记录）」。',
          '打开弹窗，可以看到今日的有效专注，以及「较昨日此时」。上下文色带分成写作、阅读、切换、空闲。下面四格是写作时长、阅读时长、切换次数和每小时次数、最长专注。「常用应用」最多三个。专注进行时，常用应用会藏起来。',
          'Quick Note 是 ⌥⌘N。便签池是 ⌥⌘M。详细统计是 ⌘D。',
        ],
        handoff: '要把这一天收回一件事上，就在这张弹窗里点「开始专注」，或按 ⌃⌥⌘F。',
      },
      {
        id: 'focus',
        shortcut: '⌃⌥⌘F',
        title: '专注模式锁住一件事',
        body: [
          '面板先问「这次专注什么？」。Chrome、Edge、Brave、Arc 可以锁住当前标签页。Safari 做近似识别。其他浏览器锁窗口。拿不到窗口时，锁整个 App。你也可以写下一件不在屏幕上的事。那一条只走普通专注，切到别的 App 不算离开。',
          '超过宽限期，普通专注记一次中断，已经累计的时长留下。强专注把有效时长清零。宽限期默认 10 秒，也可以改成 5、15、30 或 60 秒。目标可以是 25、50、90 分钟，或不设目标。',
          '离开大约 3 秒后，一块不抢焦点的卡片给出「回到目标」和「只是瞥一眼」。强专注可以在开始时隐藏其他 App，这个开关默认关着。它不会自己把焦点抢回去。锁屏和睡眠会暂停计时。停超过 30 分钟再解锁，会问你继续还是完成。',
        ],
        handoff: '念头来了，按 ⌥⌘N。专注中的 Quick Note 不算离开，时间继续走。关上便签，回到锁住的目标。',
      },
      {
        id: 'note',
        shortcut: '⌥⌘N',
        title: 'Quick Note 接住闪过的念头',
        body: [
          '在任何 App 里按 ⌥⌘N。占位文字是「记下你的想法…」。便签记下当前 App 和窗口标题。在 Safari、Chrome、Firefox、Edge、Brave、Arc、Opera 里还可以记下网址。网址需要自动化权限，第一次使用时系统会问。',
          '便签以纯文本保存，可以预览 Markdown。纸色有六种。⌘↩ 把这条归档进便签池。⌥⌘M 打开便签池。如果打开 Obsidian 同步，每条便签也会写成你选定目录里的一个 Markdown 文件。',
        ],
        handoff: '这次专注里写下的非空便签，结束时记为「灵光一闪」。「记下停在哪」不计入这个数。',
      },
    ],
    togetherEyebrow: '同一次专注',
    togetherTitle: '四步，锁的是同一件。',
    togetherSubtitle:
      '你先锁定目标。离开时它提醒你回去。念头闪过就先写下来，这一轮的时间继续算。结束时你看到这一轮实际留下的时间。',
    together: [
      {
        title: '开始',
        body: '按 ⌃⌥⌘F，或点「开始专注」。锁的是当前标签页、窗口，或整个 App。',
      },
      {
        title: '离开',
        body: '大约 3 秒后出现提醒。宽限期默认 10 秒。期内回来只算一次「只是瞥一眼」。之后普通专注记一次中断，累计时长留下。强专注把有效时长清零。',
      },
      {
        title: '记下',
        body: '按 ⌥⌘N。便签在前台时不走宽限倒计时，也不记中断。专注时间照常计入。关上或归档之后，回到锁住的目标。',
      },
      {
        title: '结束',
        body: '到达目标会播放系统 Glass 提示音，并结束这一轮。总结里可以「再来一轮」，或「记下停在哪」。放弃要再确认一次，计入时长为 0，记录留下。',
      },
    ],
    privacyTitle: '这些记录留在这台 Mac 上。',
    privacyDesc:
      '不会上传。辅助功能权限用来看你切到了哪个 App、哪一个窗口。输入监控只看按键节奏，用来区分写作和阅读，不记录你打了什么字。',
    ctaTitle: '让菜单栏看见下一次切换。',
    ctaSubtitle: '下载 Contextly。准备开始时按 ⌃⌥⌘F。念头来了按 ⌥⌘N，写完回到目标。',
    ctaPrimary: '下载 macOS 版',
    ctaSecondary: '反馈建议',
    footerTagline: '记下这一次切换，锁住这一件。',
    footerDownload: '下载',
    footerFeedback: '反馈',
    footerIssues: '问题',
    footerChangelog: '更新日志',
    footerPV: '访问量',
    footerUV: '访客数',
    supportModalTitle: '请作者喝杯咖啡',
    supportModalDesc: '感谢你的支持。你的鼓励能让 Contextly 继续做下去。',
    supportModalNote: '请选择支付方式',
    supportModalBmcBtn: '去 Buy Me a Coffee 支持',
    supportModalWeChat: '微信支付',
    supportModalWeChatHint: '使用微信扫一扫进行支持（写备注或加我微信：mai_yang）',
    supportModalBmc: 'Buy Me a Coffee',
    supportModalBmcHint: '支持信用卡 / PayPal',
    closeLabel: '关闭',
  },
}

function detectLanguage(): Language {
  try {
    const urlLang = new URLSearchParams(window.location.search).get('lang')
    if (urlLang === 'en' || urlLang === 'zh') return urlLang
    const saved = localStorage.getItem('ctxly_lang')
    if (saved === 'en' || saved === 'zh') return saved
    return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
  } catch {
    return 'en'
  }
}

function persistLanguage(language: Language): void {
  try {
    localStorage.setItem('ctxly_lang', language)
  } catch {
    return
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(detectLanguage)
  const [supportOpen, setSupportOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const t = useMemo(() => messages[language], [language])

  useEffect(() => {
    persistLanguage(language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title = t.pageTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description)
  }, [language, t])

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.45, ease: 'easeOut' as const },
      }

  const handleSelectLanguage = (next: Language) => {
    setLanguage(next)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', next)
    window.history.replaceState({}, '', url)
  }

  const handleOpenSupport = () => setSupportOpen(true)

  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#1B1B1F]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F4F4F1]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <img src="/favicon.svg" alt="" className="h-6 w-6" />
            {t.brand}
          </a>
          <nav className="flex items-center gap-2 md:gap-5">
            <a href="#how" className="hidden text-sm text-[#6B6B73] hover:text-[#1B1B1F] md:inline">
              {t.navHow}
            </a>
            <a href="#together" className="hidden text-sm text-[#6B6B73] hover:text-[#1B1B1F] lg:inline">
              {t.navTogether}
            </a>
            <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="hidden text-sm text-[#6B6B73] hover:text-[#1B1B1F] lg:inline">
              {t.navChangelog}
            </a>
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                aria-pressed={language === 'en'}
                className={language === 'en' ? 'font-semibold' : 'text-[#6B6B73] hover:text-[#1B1B1F]'}
                onClick={() => handleSelectLanguage('en')}
              >
                EN
              </button>
              <span className="text-[#A3A3AB]">/</span>
              <button
                type="button"
                aria-pressed={language === 'zh'}
                className={language === 'zh' ? 'font-semibold' : 'text-[#6B6B73] hover:text-[#1B1B1F]'}
                onClick={() => handleSelectLanguage('zh')}
              >
                中文
              </button>
            </div>
            <button type="button" onClick={handleOpenSupport} title={t.supportTitle} aria-label={t.supportAuthor} className="hidden sm:inline-flex">
              <img src={BMC_BADGE_URL} alt="" className="h-8 w-[150px] rounded-md object-contain" />
            </button>
            <Button size="sm" asChild>
              <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                {t.downloadShort}
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <motion.p
              className="text-xs font-semibold text-[#6B6B73]"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {t.heroKicker}
            </motion.p>
            <motion.h1
              className="mt-4 text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.25rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.45 }}
            >
              <span className="block">{t.heroTitleLine1}</span>
              <span className="mt-3 block text-[#5B5BD6]">{t.heroTitleLine2}</span>
              <span className="block text-[#5B5BD6]">{t.heroTitleLine3}</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-[#6B6B73] md:text-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
            >
              {t.heroSubtitle}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.45 }}
            >
              <Button size="lg" asChild>
                <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                  {t.heroPrimary}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#how">{t.heroSecondary}</a>
              </Button>
            </motion.div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#6B6B73]">
              {t.heroMeta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <figure className="w-full" aria-label={t.mockCaption}>
            <figcaption className="mb-3 text-xs text-[#6B6B73]">{t.mockCaption}</figcaption>
            <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_24px_60px_-36px_rgba(27,27,31,0.45)]">
              <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#D97A2B]" />
                  {t.mockStatus}
                </p>
                <p className="text-xs text-[#6B6B73]">{t.mockSegment}</p>
              </div>
              <div className="px-4 py-4">
                <div className="flex h-2 overflow-hidden rounded-full bg-[#F4F4F1]">
                  {ribbonBars.map((color, index) => (
                    <div key={t.mockRibbon[index]} className={[ribbonWidths[index], color].join(' ')} />
                  ))}
                </div>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B6B73]">
                  {t.mockRibbon.map((label, index) => (
                    <li key={label} className="flex items-center gap-1.5">
                      <span className={['h-1.5 w-1.5 rounded-full', ribbonBars[index]].join(' ')} />
                      {label}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-[18px] bg-[#5B5BD6] px-4 py-4 text-white">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span>{t.mockFocusTier}</span>
                    <span>{t.mockGoal}</span>
                  </div>
                  <p className="mt-2 text-4xl font-semibold tracking-tight tabular-nums">{t.mockFocused}</p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/25">
                    <div className="h-full w-[75%] rounded-full bg-white" />
                  </div>
                  <p className="mt-3 text-xs text-white/80">{t.mockTarget}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 overflow-hidden rounded-[14px] border border-black/10 bg-[#FBE7A1] text-[#241F17]">
              <div className="h-1.5 bg-[#A86F00]" />
              <div className="px-4 py-3">
                <p className="font-mono text-xs">{t.mockNoteShortcut}</p>
                <p className="mt-2 text-sm font-medium">{t.mockNoteBody}</p>
                <p className="mt-2 text-xs text-[#241F17]/70">{t.mockNoteSource}</p>
              </div>
            </div>
          </figure>
        </section>

        <section id="story" className="scroll-mt-20 border-t border-black/10 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="text-xs font-semibold text-[#6B6B73]">{t.storyEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.storyTitle}</h2>
            </motion.div>
            <ol className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[22px] border border-black/10 bg-black/10 md:grid-cols-4">
              {t.storyScale.map((item, index) => (
                <motion.li {...reveal} key={item.label} className="flex flex-col justify-between bg-white p-6">
                  <div className="h-1 rounded-full bg-[#F4F4F1]">
                    <div className={['h-full rounded-full', scaleBars[index]].join(' ')} />
                  </div>
                  <p className="mt-8 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight">{item.value}</span>
                    {item.unit ? <span className="text-sm text-[#6B6B73]">{item.unit}</span> : null}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B6B73]">{item.label}</p>
                </motion.li>
              ))}
            </ol>
            <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-16">
              <motion.p {...reveal} className="text-lg leading-relaxed text-[#6B6B73]">
                {t.storyPlatforms}
              </motion.p>
              <motion.p {...reveal} className="text-lg font-medium leading-relaxed">
                {t.storyCounter}
              </motion.p>
            </div>
            <motion.figure {...reveal} className="mt-16 border-l-2 border-[#5B5BD6] pl-6 md:pl-10">
              <blockquote>
                <p className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">“{t.storyQuote}”</p>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6B6B73]">{t.storyNote}</p>
              </blockquote>
              <figcaption className="mt-5 text-sm text-[#6B6B73]">{t.storySignature}</figcaption>
            </motion.figure>
          </div>
        </section>

        <section className="border-t border-black/10 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="text-xs font-semibold text-[#6B6B73]">{t.whyEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.whyTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#6B6B73]">{t.whyBody}</p>
            </motion.div>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
              {t.thresholds.map((item) => (
                <motion.div {...reveal} key={item.value} className="bg-[#F4F4F1] p-6">
                  <dt className="flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight tabular-nums">{item.value}</span>
                    <span className="text-sm text-[#6B6B73]">{item.unit}</span>
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[#6B6B73]">{item.body}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>

        <section id="how" className="scroll-mt-20 border-t border-black/10 bg-white px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="text-xs font-semibold text-[#6B6B73]">{t.loopEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.loopTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#6B6B73]">{t.loopSubtitle}</p>
            </motion.div>
            <ol className="mt-6">
              {t.capabilities.map((item, index) => (
                <motion.li {...reveal} key={item.id} className="grid gap-4 border-t border-black/10 py-12 md:grid-cols-[11rem_1fr] md:gap-10">
                  <div>
                    <p className="font-mono text-sm text-[#5B5BD6]">0{index + 1}</p>
                    <p className="mt-3 font-mono text-sm text-[#6B6B73]">{item.shortcut}</p>
                  </div>
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-semibold tracking-tight">{item.title}</h3>
                    {item.body.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-relaxed text-[#6B6B73]">
                        {paragraph}
                      </p>
                    ))}
                    <p className="mt-5 border-l-2 border-[#5B5BD6] pl-4 text-base font-medium leading-relaxed">{item.handoff}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        <section id="together" className="scroll-mt-20 border-t border-black/10 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.div {...reveal} className="max-w-3xl">
              <p className="text-xs font-semibold text-[#6B6B73]">{t.togetherEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.togetherTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#6B6B73]">{t.togetherSubtitle}</p>
            </motion.div>
            <ol className="mt-12 grid gap-4 md:grid-cols-2">
              {t.together.map((step, index) => (
                <motion.li {...reveal} key={step.title} className="rounded-[18px] border border-black/10 bg-white p-6">
                  <p className="font-mono text-sm text-[#5B5BD6]">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B6B73]">{step.body}</p>
                </motion.li>
              ))}
            </ol>
            <motion.div {...reveal} className="mt-8 rounded-[18px] bg-[#1B1B1F] p-6 text-white md:p-8">
              <h3 className="text-xl font-semibold tracking-tight">{t.privacyTitle}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">{t.privacyDesc}</p>
            </motion.div>
          </div>
        </section>

        <section id="screenshots" className="scroll-mt-20 border-t border-black/10 bg-white px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <motion.h2 {...reveal} className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
              {t.screenshotsTitle}
            </motion.h2>
            <motion.div {...reveal} className="mt-10">
              <ScreenshotCarousel
                screenshots={screenshotSources.map((src, index) => ({
                  src,
                  alt: t.screenshots[index].title,
                  title: t.screenshots[index].title,
                  description: t.screenshots[index].description,
                }))}
                autoPlay={!reduceMotion}
                interval={5000}
              />
            </motion.div>
          </div>
        </section>

        <section className="border-t border-black/10 px-5 py-20 text-center md:px-8 md:py-28">
          <motion.div {...reveal} className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl">{t.ctaTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-[#6B6B73]">{t.ctaSubtitle}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                  {t.ctaPrimary}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer">
                  {t.ctaSecondary}
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-black/10 px-5 py-8 text-sm text-[#6B6B73] md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="flex flex-wrap items-center gap-2 text-[#1B1B1F]">
              <img src="/favicon.svg" alt="" className="h-5 w-5" />
              <span className="font-medium">{t.brand}</span>
              <span className="text-[#A3A3AB]">·</span>
              <span className="text-[#6B6B73]">{t.footerTagline}</span>
            </p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <span>© 2026 Contextly</span>
              <span>
                {t.footerPV}: <span id="urlstat-page-pv">-</span>
              </span>
              <span>
                {t.footerUV}: <span id="urlstat-page-uv">-</span>
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B1B1F]">
              {t.footerDownload}
            </a>
            <a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B1B1F]">
              {t.footerFeedback}
            </a>
            <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B1B1F]">
              {t.footerIssues}
            </a>
            <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#1B1B1F]">
              {t.footerChangelog}
            </a>
            <button type="button" onClick={handleOpenSupport} title={t.supportTitle} aria-label={t.supportAuthor} className="inline-flex sm:hidden">
              <img src={BMC_BADGE_URL} alt="" className="h-8 w-[150px] rounded-md object-contain" />
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
        wechatHint={t.supportModalWeChatHint}
        bmcTitle={t.supportModalBmc}
        bmcHint={t.supportModalBmcHint}
        closeLabel={t.closeLabel}
      />
    </div>
  )
}
