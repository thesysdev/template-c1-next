import type { JSONSchema } from "openai/lib/jsonschema.mjs";
import type { RunnableToolFunctionWithParse } from "openai/lib/RunnableFunction.mjs";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { createToolErrorMessage } from "./utils/toolErrorHandler";

function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "foggy",
    48: "foggy with frost",
    51: "light drizzle",
    53: "moderate drizzle",
    55: "heavy drizzle",
    61: "light rain",
    63: "moderate rain",
    65: "heavy rain",
    71: "light snow",
    73: "moderate snow",
    75: "heavy snow",
    95: "thunderstorm",
  };

  return weatherCodes[code] || "unknown";
}

export const weatherTool: RunnableToolFunctionWithParse<{ location: string }> =
  {
    type: "function",
    function: {
      name: "weather",
      description: "Get the weather for the given location",
      parse: (input) => {
        return JSON.parse(input) as { location: string };
      },
      parameters: zodToJsonSchema(
        z.object({
          location: z.string().describe("location for weather"),
        }),
      ) as JSONSchema,
      function: async ({ location }: { location: string }) => {
        try {
          const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
              location,
            )}&count=1`,
          );

          if (!geoResponse.ok) {
            return createToolErrorMessage("Failed to geocode location", {
              action: "looking up location data",
              userFriendlyContext: `for "${location}"`,
              suggestion:
                "Please try a different location name or check the spelling.",
            });
          }

          const geoData = await geoResponse.json();
          if (!geoData.results?.[0]) {
            return createToolErrorMessage("Location not found", {
              action: "finding the location",
              userFriendlyContext: `"${location}"`,
              suggestion:
                "Please try a different location name or check the spelling.",
            });
          }

          const { latitude, longitude } = geoData.results[0];

          const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
          );

          if (!weatherResponse.ok) {
            return createToolErrorMessage("Failed to fetch weather data", {
              action: "retrieving weather data",
              userFriendlyContext: `for "${location}"`,
              suggestion:
                "The weather service may be temporarily unavailable. Please try again later.",
            });
          }

          const weatherData = await weatherResponse.json();
          const temp = Math.round(weatherData.current.temperature_2m);
          const weatherCode = weatherData.current.weather_code;

          const weatherDesc = getWeatherDescription(weatherCode);

          return `The weather in ${location} is ${weatherDesc} with a temperature of ${temp}°C`;
        } catch (error) {
          return createToolErrorMessage(error, {
            action: "fetching weather data",
            userFriendlyContext: `for "${location}"`,
            suggestion:
              "Please check your internet connection and try again with a different location if needed.",
          });
        }
      },
      strict: true,
    },
  };
