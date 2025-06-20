import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'

dayjs.extend(relativeTime)
dayjs.locale('ja')

export const timeAgo = (date: string) => {
  return dayjs(date).fromNow()
}
