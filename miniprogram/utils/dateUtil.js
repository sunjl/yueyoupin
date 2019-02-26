const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const milliseconds = date.getMilliseconds()
  return [year, month, day, hour, minute, second, milliseconds].map(formatNumber).join('-')
}

const formatDisplayDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const displayDate = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分"
  return displayDate
}

const formatPickerDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatPickerTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join('-')
}

const concatDateTime = (date, time) => {
  const splitDate = date.split('-')
  const year = splitDate[0]
  const month = splitDate[1] - 1
  const day = splitDate[2]
  const splitTime = time.split(':')
  const hour = splitTime[0]
  const minute = splitTime[1]
  const dateTime = new Date(year, month, day, hour, minute, 0, 0)
  return dateTime
}

module.exports = {
  formatDate: formatDate,
  formatDisplayDate: formatDisplayDate,
  formatPickerDate: formatPickerDate,
  formatPickerTime: formatPickerTime,
  concatDateTime: concatDateTime
}