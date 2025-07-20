# ----------- Build backend (ASP.NET Core API) -----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend
WORKDIR /app

# Copy API project file and restore dependencies
COPY ExchangeRatesApi/*.csproj ./ExchangeRatesApi/
RUN dotnet restore ExchangeRatesApi/ExchangeRatesApi.csproj

# Copy all API source files
COPY ExchangeRatesApi/. ./ExchangeRatesApi/
WORKDIR /app/ExchangeRatesApi

# Publish the API in Release mode
RUN dotnet publish -c Release -o /app/publish

# ----------- Build frontend (Angular app) -----------
FROM node:18 AS build-frontend
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY currency-app/package*.json ./
RUN npm install

# Copy all frontend source files
COPY currency-app/. ./

# Build the Angular app
RUN npm run build

# ----------- Final image (runtime environment) -----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published API from the backend build stage
COPY --from=build-backend /app/publish .

# Copy the built frontend into wwwroot to serve it statically
COPY --from=build-frontend /app/dist ./wwwroot

# Expose ports (optional)
EXPOSE 5000
EXPOSE 5001

# Run the API when the container starts
ENTRYPOINT ["dotnet", "ExchangeRatesApi.dll"]
