const dater = new Intl.DateTimeFormat('en-EN', {
  dateStyle: 'medium',
})

export function getDate(value: string) {
  if (!value) {
    return ''
  }

  return dater.format(new Date(value))
}
