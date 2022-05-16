let weather={
    apiKey:"0231eefe2a2777b0eb2745d6a95d3e2c",
    fetchWeather: function (city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+ this.apiKey)
        .then((res)=>{
            if(!res.ok){
                alert("No weather found.");
                throw new Error("No weather found");
            }
            return res.json();
        })
        .then((data)=> this.displayWeather(data));
    },

    displayWeather: function (data){
        const { name } = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity}= data.main;
        const { speed }= data.wind;
        document.querySelector(".city").innerText= "Weather in "+name;
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText= description;
        document.querySelector(".temp").innerText= temp+"°C";
        document.querySelector(".humidity").innerText= "Humidity: "+ humidity+"%";
        document.querySelector(".wind").innerText= "Wind Speed: "+speed+" km/hr";
        document.body.style.backgroundImage= "url('https://source.unsplash.com/1600x900/?" + name + "')";
        document.querySelector(".search-bar").value="";
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}



document.querySelector(".search button").addEventListener("click",()=>{
    weather.search();
    
});

document.querySelector(".search-bar").addEventListener("keyup",(event)=>{
    if(event.key=="Enter"){
        weather.search();
    }
})


weather.fetchWeather("Kathmandu");