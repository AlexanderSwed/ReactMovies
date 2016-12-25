export const API_KEY = "c9896ecb76fe40c3c3c6c3f897eb4325";

export const fetchData = (url) => fetch(url, { method: 'GET', mode: 'cors' }).then(res => res.json());

export const getDate = (release_date) =>
    {
        let date = release_date.split('-'),
            dateObj = new Date(date[0], date[1] - 1, date[2]),
            month = dateObj.toLocaleString("en-us", { month: "short" });
        return {
                    year: date[0],
                    month: month,
                    day: date[2]
                };
    };

export const sortCredits = (a, b) =>
    {
        let date_a = a.release_date ? a.release_date : a.first_air_date,
            date_b = b.release_date ? b.release_date : b.first_air_date;
        if (!date_a) return -1; if (!date_b) return 1;
        let is_newest = new Date(date_a) < new Date(date_b) ? 1 : -1;
        return is_newest;
    };

export const FB_TOKEN = "339366889778907|b0JXwmrjvk5O9kdMiKateIhrNws";

export const toggleReveal = (e) => {
    let parent = e.target.parentElement.parentElement;
    parent.classList.toggle("reveal-shown");
}