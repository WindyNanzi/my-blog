export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const linkHoverClass = $computed(() => unref(isDark) ? 'hover-text-light' : 'hover-text-gray-700')

watchEffect(() => {
  if (unref(isDark))
    document.body.setAttribute('arco-theme', 'dark')
  else
    document.body.removeAttribute('arco-theme')
})
