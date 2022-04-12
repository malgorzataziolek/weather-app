import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';

const WeatherBox = props => {
	const [weather, setWeather] = useState('');
	const handleCityChange = useCallback(city => {
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ac1d7a4387202679f6c0f9328ca9715&units=metric`
		)
			.then(res => res.json())
			.then(data => {
				setWeather({
					city: data.name,
					temp: data.main.temp,
					icon: data.weather[0].icon,
					description: data.weather[0].main,
				});
				console.log(data);
			});
	}, []);

	return (
		<section>
			<PickCity action={handleCityChange} />
			<WeatherSummary {...weather} />
			<Loader />
		</section>
	);
};

export default WeatherBox;
