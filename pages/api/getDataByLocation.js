const API_KEY = process.env.API_KEY

export default async function handler(req, res) {
    if(req.method==='GET'){
        try {
            const { lat, lon } = req.query
            if (lat===undefined || lon===undefined) res.status(404).json({success:false,message:'INVALID_LOCATION'})
            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
            );
            let data = await response.json()
            res.status(200).json(data)
        } catch (error) {
            res.status(404).json({
                success:false,
                message:'INVALID_LOCATION'
            })
        }
            
    }
}