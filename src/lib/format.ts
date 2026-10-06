const dateTimeFormatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' })

export const formatDateTime = (value: string | null | undefined) => {
  if (!value) return '—'
  return dateTimeFormatter.format(new Date(value))
}
