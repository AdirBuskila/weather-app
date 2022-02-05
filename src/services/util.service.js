export const utilService = {
    fixTimestamp,
    getTimeZoneHours,
    makeId,
  }
  

  function fixTimestamp(timestamp) {
    var day = new Date(timestamp).getDate();
    const Day = new Date(timestamp).getDay();
    if (day < 10) day = '0' + day;
    var month = new Date(timestamp).getMonth() + 1;
    if (month < 10) month = '0' + month;
    var year = new Date(timestamp).getFullYear();
    const date = day + '/' + month + '/' + year;
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    return days[Day] + ' ' + date;
  }

  function getTimeZoneHours(timeZone) {
    const timeZoneDate = new Date().toLocaleString('en-US',{timeZone}).split('PM')
    let hours
    if (timeZoneDate.length === 2) {
        hours = parseInt(new Date().toLocaleString('en-US',{timeZone}).split(',')[1].split(':')[0]) + 12
        return hours
    } else {
        hours = parseInt(new Date().toLocaleString('en-US',{timeZone}).split(',')[1].split(':')[0]) 
        return hours
    }
  }
  

  function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}
