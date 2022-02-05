import { utilService } from '../services/util.service';

export const ForecastList = ({ forecasts, timeZone }) => {
  if (!forecasts || !timeZone) return <></>;
  const timeZoneHours = utilService.getTimeZoneHours(timeZone);
  const timeOfDay = timeZoneHours >= 18 || timeZoneHours <= 5 ? 'Night' : 'Day';
  return forecasts.map((forecast, idx) => {
    const forecastImgNum =
      forecast[timeOfDay].Icon.toString().length === 1
        ? `0${forecast[timeOfDay].Icon.toString()}`
        : `${forecast[timeOfDay].Icon.toString()}`;
    return (
      <div key={utilService.makeId()} className={`forecast forecast${idx}`}>
        <img
          className={`forecast${idx}-img`}
          src={`https://developer.accuweather.com/sites/default/files/${forecastImgNum}-s.png`}
        />
        <h2 className={`forecast-date${idx}`}>
          {utilService.fixTimestamp(forecast.Date)}
        </h2>
        <h3 className={`forecast-status${idx}`}>
          {forecast[timeOfDay].IconPhrase}
        </h3>
        <h3 className={`forecast-temp${idx}`}>
          {Math.floor((forecast.Temperature.Maximum.Value +
            forecast.Temperature.Minimum.Value)) /
            2}{' '}
          °C
        </h3>
      </div>
    );
  });
};
