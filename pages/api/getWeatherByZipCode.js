const API_KEY = process.env.API_KEY

export default async function handler(req, res) {
    if(req.method==="POST"){
        const { zipCode } = req.body;
        if(zipCode.lenght<4){
            res.status(404).json({
                success:false,
                message:'INVALID_CODE'
            })
        }else{
            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/find?q=${zipCode}&appid=${process.env.API_KEY}&exclude=minutely&units=metric`
            );
            let data = await response.json()
           res.status(200).json(data)
        }
    }
}