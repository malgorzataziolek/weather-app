import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
	const [weather, setWeather] = useState('');
	const [status, setStatus] = useState('off');
	const handleCityChange = useCallback(city => {
		setStatus('loading');
		fetch(
			`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9ac1d7a4387202679f6c0f9328ca9715&units=metric`
		).then(res => {
			if (res.status === 200) {
				return res.json().then(data => {
					setWeather({
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
					});
					setStatus('ready');
					console.log(data);
				});
			} else {
				setStatus('error');
			}
		});
	}, []);

	return (
		<section>
			<PickCity action={handleCityChange} />
			{weather && status === 'ready' && <WeatherSummary {...weather} />}
			{status === 'loading' && <Loader />}
			{status === 'error' && <ErrorBox>No city found !</ErrorBox>}
		</section>
	);
};
  
export default WeatherBox;
