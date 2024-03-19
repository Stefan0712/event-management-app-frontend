const formatDbDate = (date) =>{
    const day = date.substring(8, 10);
    const month = date.substring(5, 7);
    const year = date.substring(0, 4);

    return `${day}.${month}.${year}`;
}

const formatDateForEventBody = (date)=>{
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = months[date.substring(5, 7) -1];
    const dayNumber = date.substring(8, 10);
    const dayIndex = new Date(date)
    const dayOfWeekIndex = dayIndex.getUTCDay();
    const day = days[dayOfWeekIndex];
    const hours = date.substring(11, 13);
    const minutes = date.substring(14, 16);
    
    return {month, day, dayNumber, hours, minutes};
}




export {formatDbDate, formatDateForEventBody};

