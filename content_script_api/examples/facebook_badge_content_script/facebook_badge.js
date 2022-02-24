const getCount = function () {
  const count = parseInt(document.title.replace(/\D/g,''))
  return isNaN(count) ? 0 : count
}

const main = async function () {
  const permission = await window.wavebox.requestPermission()
  if (permission === 'ALLOWED') {
    const isApp = await window.wavebox.isApp()
    if (isApp) {
      let lastCount = getCount()
      await window.wavebox.setBadgeCount(lastCount)
      await window.wavebox.setTrayMessages(lastCount === 0 ? [] : [
        {
          id: 'message_id_1',
          title: 'New notifications',
          subtitle: `You have ${lastCount} notifications`,
          date: Date.now()
        }
      ])

      setInterval(async () => {
        const nextCount = getCount()
        if (lastCount !== nextCount) {
          lastCount = nextCount
          await window.wavebox.setBadgeCount(lastCount)
          await window.wavebox.setTrayMessages(lastCount === 0 ? [] : [
            {
              id: 'message_id_1',
              title: 'New notifications',
              subtitle: `You have ${lastCount} notifications`,
              date: Date.now()
            }
          ])
        }
      }, 1000)
    }
  }
}

main()