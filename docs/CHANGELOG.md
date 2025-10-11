# Changelog

All notable changes to Contextly will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-10-11

### Added
- **应用会话统计** - 新增应用级别的会话持续时间和切换次数统计展示
  - 在统计详情页面显示每个应用的会话数量和总持续时间
  - 支持识别和统计应用切换行为模式
  - 增强应用使用数据的颗粒度分析 (Sources/AppUsage.swift, StatsView.swift:deb312e)

- **数据导出功能** - 支持将统计视图数据导出为 JSON 格式
  - 一键导出完整的每日统计数据，包括专注时间、应用使用、切换链等
  - 方便数据备份和外部分析工具集成
  - 导出数据包含完整的上下文切换分析结果 (Sources/SocialShareGenerator.swift:9dbcbbb)

- **改进的每小时通知** - 优化每小时专注摘要通知的内容和时机
  - 更准确的专注状态提醒
  - 改善通知内容的可读性和实用性 (Sources/NotificationManager.swift:8450a66)

### Fixed
- **应用切换计数优化** - 修复应用切换次数统计的准确性问题
  - 改进切换检测逻辑，减少误报
  - 优化系统应用过滤机制 (Sources/AppMonitor.swift:231a5eb)

- **午夜统计问题** - 修复跨越午夜时的统计数据异常
  - 确保日期边界的正确处理
  - 解决时区转换导致的数据错位 (Sources/StatsManager.swift:ca16f48)

- **统计详情窗口显示** - 修复统计详情窗口在某些情况下无法正确显示的问题
  - 改进窗口状态管理
  - 优化视图刷新机制 (Sources/StatsView.swift:96dca0b)

### Improved
- 应用切换统计的性能和准确性
- 数据分析的可靠性和一致性
- 用户体验和交互流畅度

---

## [1.1.0] - 2025-09-17

### Added
- **自动报告生成** - 实现每小时自动生成专注报告功能
  - 定时生成统计摘要
  - 支持手动触发今日数据重新生成 (./force_regen_today.sh)
  - 后台自动化数据处理 (Sources/ReportGenerator.swift:7eb0ccd)

- **应用图标集成** - 添加专业的 Contextly 应用图标
  - 512x512 高清图标资源
  - 完整的 .icns 图标集
  - 自动集成到构建流程 (Contextly.icns, create_app_icon.swift:0a6518b)

### Fixed
- **Bundle ID 配置** - 修复 Bundle ID 更改导致的应用无法启动问题
  - 统一使用 com.yangwenmai.contextly
  - 优化代码签名流程 (run_contextly.sh, app_info.sh:95034ba)

- **上下文链数据一致性** - 修复分享预览和详细视图的上下文链显示不一致问题
  - 统一数据源为 ContextAnalyzer
  - 分享卡片仅显示认知负荷最高的 Top1 链
  - 解决 CoreData 线程安全问题 (Sources/SocialShareGenerator.swift:50e0ed7)

### Improved
- 构建脚本的图标集成流程
- 应用安装和启动的可靠性
- 上下文切换分析的数据完整性

---

## [1.0.0] - 2025-09-03

### Added
- **核心专注跟踪功能** - 基础的应用切换和键盘活动监控
  - 实时检测应用切换行为
  - 区分读/写状态（基于键盘活动）
  - 菜单栏实时状态显示

- **每日统计仪表板** - 专业的统计数据可视化界面
  - 专注时间、阅读/写作时间统计
  - 应用使用排名和时长分布
  - 最长专注会话记录
  - 上下文切换次数分析

- **高级分析功能** (可选开关)
  - **增强活动分析**: 30+ 应用配置文件，改进读/写分类准确性
  - **切换成本分析**: 基于神经科学的认知负荷量化
  - **详细分析**: 7天活动热力图和个人工作模式识别

- **社交分享系统** - 可分享的专注成果卡片
  - 4种视觉模板（现代、渐变、简约、俏皮）
  - 5种智能文案风格
  - 多平台分享支持（微信、Twitter、剪贴板）
  - 上下文切换链 Top1 展示

- **权限管理系统** - 智能的系统权限请求和指导
  - 分步权限配置引导
  - 自动权限状态检测
  - 直达系统设置的便捷链接

- **数据持久化** - 基于 CoreData 的本地数据存储
  - 应用使用会话记录
  - 每日统计数据聚合
  - 历史数据查询和分析

### Security
- 所有数据完全本地存储，无云同步
- 仅跟踪键盘活动频率，不记录内容
- 系统进程自动过滤（25+ 系统应用）
- 用户隐私保护优先设计

---

## Version Naming Convention

- **Major version (x.0.0)**: 重大功能变更或架构调整
- **Minor version (1.x.0)**: 新功能添加、重要改进
- **Patch version (1.0.x)**: Bug 修复、小优化

## Links

- **开发仓库**: https://github.com/yangwenmai/contextly
- **发布仓库**: https://github.com/yangwenmai/ctxly.ai
- **官方网站**: https://ctxly.ai
- **问题反馈**: https://github.com/yangwenmai/ctxly.ai/issues
