import STATES from '../utils/states'

const domain = 'https://beacon-v2.helpscout.net'

const loadScript = () => {
  if (window.Beacon) return

  !(function(e, t, n) {
    function a() {
      var e = t.getElementsByTagName('script')[0],
        n = t.createElement('script')
      ;(n.async = !0), (n.src = domain), e.parentNode.insertBefore(n, e)
    }
    if (
      ((e.Beacon = n = function(t, n, a) {
        e.Beacon.readyQueue.push({ method: t, options: n, data: a })
      }),
      (n.readyQueue = []),
      'complete' === t.readyState)
    )
      return a()
    e.attachEvent
      ? e.attachEvent('onload', a)
      : e.addEventListener('load', a, !1)
  })(window, document, window.Beacon || function() {})
}

const load = ({ providerKey, setState }) => {
  loadScript()
  if(window.Beacon !== undefined) {
    window.Beacon('init', providerKey)
  }
  setTimeout(() => setState(STATES.COMPLETE), 2000)
}

const open = () => window.Beacon('open')
const close = () => window.Beacon('close')
const destroy = () => window.Beacon('destroy')
const suggest = () => window.Beacon('suggest')

export default {
  domain,
  destroy,
  load,
  open,
  close,
  suggest
}
