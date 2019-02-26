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

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
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

module.exports = {
  formatDate: formatDate,
  formatDisplayDate: formatDisplayDate,
  formatPickerDate: formatPickerDate,
  formatPickerTime: formatPickerTime
}