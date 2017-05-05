export function time_ago (s) {
    if (s < 0) 
        return "zojuist";
    if (s < 60) 
       return (s | 0) + " sec"; 
    if (s < 3600)
        return (s / 60 | 0) + " min";
    if (s < 24 * 3600)
        return (s / 3600 | 0) + " uur";
    if (s < 24 * 3600 * 7)
        return (s / ( 24 * 3600) | 0) +  " dag";
}
