import axios from "axios"

export async function scrapeSurfline() {
    let resp: any;
    try {
        resp = await axios.get("https://services.surfline.com/kbyg/spots/forecasts/wave?spotId=61d4d151c15a827dc58364ec&days=16&intervalHours=1&maxHeights=false&accesstoken=c2c5d829090dece94ff0bee6dae31cdd2db810b2")
    } catch (error) {
        console.error(error)
    }
    const waves: any[] = resp.data.data.wave
    // const utcOffsetInSeconds = resp.data.associated.utcOffset * 60 * 60
    const parsedWaveData = waves.map((wave: any) => {
        return [wave.surf.min, wave.surf.max]
    })
    return parsedWaveData;
}
