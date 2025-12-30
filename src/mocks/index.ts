export async function enableMocking() {
  // 개발 환경이 아니면 목킹 비활성화
  if (import.meta.env.PROD) {
    return
  }

  // VITE_ENABLE_MOCKING이 'true'일 때만 목킹 활성화
  if (import.meta.env.VITE_ENABLE_MOCKING !== 'true') {
    console.log('[MSW] Mocking disabled. Set VITE_ENABLE_MOCKING=true to enable.')
    return
  }

  const { worker } = await import('./browser')

  // 서비스 워커 시작
  return worker.start({
    onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 그대로 통과
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  })
}
