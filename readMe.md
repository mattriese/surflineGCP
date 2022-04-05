crontabguru

google cloud scheduler

https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=61d4d151c15a827dc58364ec&days=16&intervalHours=1&maxHeights=false&accesstoken=c2c5d829090dece94ff0bee6dae31cdd2db810b2

surfline-d39be@appspot.gserviceaccount.com

file id
1cJKNWsSeiT2gMNt7B-HMwHMdhMt7iEHtGX-jSCV0Mes


GOAL:
hosted function (cloud function or heroku/netlify server?) that calls the surfline page every day, saves the response as a giant object, parses it into a giant map of
{<timestamp: 12:01:0000>: [min, max]}, maybe with header properties of : spot name, request timestamp (all we need to know is where to start pasting)
or maybe [{timestamp: 12:01:0000, min: x, max: y}, ...]

then send a batch update to the google sheet

Problem: If they get the 10ft surf hight perfect, but the timing off by 1 day, my algo would say they were super wrong, when really they were right.

I could track 'swell events': check if I am at a local maximum (average of beg and end of local max), if so, give this a 'swellId' and a peak: dateTime. Then I can track the evolution of this swell event's height, and dateTime. that's ultimately what I want to track:
1. accuracy/confidence interval for each day of the forecast range 1-16
2. accuracy of the height for each swell event
3. accuracy of the timing of each swell event.

In the end, I should have 2 sheets for each spot. One that only shows 8 cells for each day (for human visual analysis / readability), and another that shows 24 cells for each day (for programmatic analysis)

Database could track swell events: {
  spotName: string,
  swellId: number,

}

How to discern swells?
- count and label all the peaks.
- group together the peaks that are separated by less than 12(?) hours into one swell.
- BUT how would I know that this swell event today is the same one from yesterday. What if one swell drops and just looks like a long tail of the previous swell?
- Until I master data science, I might have to manually track the swell events in google sheets and have some other code or sheet formula that figures out swell event accuracy.

How to average over 3 hours?
- while loopring through, save 3 variables and a counter, then when counter reaches 3, calculate avg of the 3 vars, save that avg min and max with the timestamp, and reset counter.
