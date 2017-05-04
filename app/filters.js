export function time_ago (time) {
    var s = (new Date().getTime() - new Date(time).getTime()) / 1000;
    if (s < 60) 
       return ((s | 0) + " sec"); 
    if (s < 3600)
        return ((s / 60 | 0) + " min");
    if (s < 24 * 3600)
        return ((s / 3600 | 0) + "uur");
    return new Date(time).toDateString();
}
