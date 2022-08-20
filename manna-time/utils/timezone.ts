const timezoneOffset = new Date().getTimezoneOffset() * 60000

// dateformat : yyyy-mm-dd as string
export const getUTCDate = (inputDate: string) => {
    var localeDate = new Date(inputDate);
    var utcDate = new Date(localeDate.getTime() + timezoneOffset);

    return utcDate
}