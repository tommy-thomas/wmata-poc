<?php
// src/Service/WMATAService.php
namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class WMATAService
{
    private HttpClientInterface $client;
    private string $apiKey;

    //WMAT Api URL
    const API_URL = 'https://api.wmata.com/';
    
    public function __construct(HttpClientInterface $client, string $ApiKey)
    {
        $this->client = $client;
        $this->apiKey = $ApiKey;
    }
    
    public function getStations(): array
    {
        $response = $this->client->request('GET', 
            self::API_URL.'Rail.svc/json/jStations',
            [
                'headers' => [
                    'api_key' => $this->apiKey
                ]
            ]
        );
        
        return $response->toArray()['Stations'];
    }
    
    public function getArrivals(string $stationCode): array
    {
        $response = $this->client->request('GET',
            self::API_URL.'StationPrediction.svc/json/GetPrediction/'.$stationCode.'/',
            [
                'headers' => [
                    'api_key' => $this->apiKey
                ]
            ]
        );
        
        return $response->toArray()['Trains'];

    }
}