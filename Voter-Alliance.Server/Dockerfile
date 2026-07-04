FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Restore backend dependencies
COPY Voter-Alliance.Server/Voter-Alliance.Server.csproj Voter-Alliance.Server/
RUN dotnet restore Voter-Alliance.Server/Voter-Alliance.Server.csproj

# Copy source and publish backend
COPY . .
RUN dotnet publish Voter-Alliance.Server/Voter-Alliance.Server.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENV ASPNETCORE_ENVIRONMENT=Production
ENV DOTNET_RUNNING_IN_CONTAINER=true

EXPOSE 8080

COPY --from=build /app/publish .

# Ensure SPA bundle path expected by Program.cs exists in production image.
COPY voter-alliance.client/dist /voter-alliance.client/dist

ENTRYPOINT ["dotnet", "Voter-Alliance.Server.dll"]
