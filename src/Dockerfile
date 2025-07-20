# ----------- Build backend -----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend
WORKDIR /app

# העתקת קבצי ה-API
COPY ExchangeRatesApi/*.csproj ./ExchangeRatesApi/
RUN dotnet restore ExchangeRatesApi/ExchangeRatesApi.csproj

COPY ExchangeRatesApi/. ./ExchangeRatesApi/
WORKDIR /app/ExchangeRatesApi
RUN dotnet publish -c Release -o /app/publish

# ----------- Build frontend -----------
FROM node:18 AS build-frontend
WORKDIR /app

# העתקת קבצי הפרונטאנד
COPY currency-app/package*.json ./
RUN npm install

COPY currency-app/. ./
RUN npm run build

# ----------- Final image -----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# העתקת ה-API המוכנה
COPY --from=build-backend /app/publish .

# העתקת הפרונטאנד הבנוי לתיקיית wwwroot בתוך ה-API (להגשה סטטית)
COPY --from=build-frontend /app/dist ./wwwroot

# חשיפת הפורט שהאפליקציה רצה עליו
EXPOSE 5000
EXPOSE 5001

# הפעלת ה-API כשמתחילים את הקונטיינר
ENTRYPOINT ["dotnet", "ExchangeRatesApi.dll"]
