export const getFormattedDate = (date: string) => {
   const temp = new Date(date)
   let result = ''
   if (temp.getDate() < 10) result += '0' + temp.getDate()
   else result += temp.getDate()
   result += '.'
   if (temp.getMonth() < 10) result += '0' + temp.getMonth()
   else result += temp.getMonth()
   result += '.' + temp.getFullYear()
   return result
}
