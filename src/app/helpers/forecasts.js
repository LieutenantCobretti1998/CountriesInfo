

export default function dailyForecasts(forecasts) {
    const dailyForecasts = {};

    forecasts.forEach(forecast => {
        const dateTime = forecast.dt_txt;
        const date =  dateTime.split(' ')[0];

        if(!dailyForecasts[date]){
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(forecast);
    });

    const oneForecastPerDay = Object.keys(dailyForecasts).map(date => {
        const entries = dailyForecasts[date];
        let selectedEntry = entries[0];
        let targetTime = "12:00:00";
        entries.forEach(entry => {
            const entryTime = entry.dt_txt.split(' ')[1];
            // Compare difference with target "12:00:00" to find the closest
            if (Math.abs(timeDifference(entryTime, targetTime)) < Math.abs(timeDifference(selectedEntry.dt_txt.split(' ')[1], targetTime))) {
                selectedEntry = entry;
            }
        });

        return selectedEntry;
    });
    return oneForecastPerDay;
};

function timeDifference(date1, date2) {
    const [h1, m1, s1] = date1.split(':').map(Number);
    const [h2, m2, s2] = date1.split(':').map(Number);

    const totalMins1 = h1 * 60 + m1 + s1/60;
    const totalMins2 = h2 * 60 + m2 + s2/60;

    return totalMins1 - totalMins2;
}