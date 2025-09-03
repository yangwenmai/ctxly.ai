import React from 'react'

type SupportModalProps = {
  open: boolean
  onClose: () => void
  bmcUrl?: string
  title?: string
  description?: string
  note?: string
  buttonLabel?: string
  enableWeChat?: boolean
  wechatQrSrc?: string
  wechatTitle?: string
  bmcTitle?: string
}

export const SupportModal: React.FC<SupportModalProps> = ({
  open,
  onClose,
  bmcUrl = 'https://www.buymeacoffee.com/maiyang',
  title = '请作者喝杯咖啡 ☕',
  description = '感谢你的支持！你的鼓励能帮助我们持续迭代 Contextly。',
  note = '请选择支付方式',
  buttonLabel = '去 Buy Me a Coffee 支持',
  enableWeChat = true,
  wechatQrSrc = '/wechat-qr-code.png',
  wechatTitle = '微信支付',
  bmcTitle = 'Buy Me a Coffee',
}) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-sm text-gray-500 mb-6">{note}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enableWeChat && (
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-sm font-semibold mb-3">{wechatTitle}</div>
                <img src={wechatQrSrc} alt="WeChat Pay" className="max-w-full h-auto mx-auto rounded" />
                <p className="text-xs text-gray-500 mt-2">使用微信扫一扫进行支持<br />（写备注或加我微信：mai_yang）</p>
              </div>
            )}

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-sm font-semibold mb-3">{bmcTitle}</div>
              <a
                href={bmcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md px-4 py-2 transition-colors"
                onClick={() => onClose()}
              >
                {buttonLabel}
              </a>
              <p className="text-xs text-gray-500 mt-2">支持信用卡 / PayPal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportModal


