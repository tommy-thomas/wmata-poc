<?php

namespace App\Controller;

use App\Service\WMATAService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Attribute\Route;

#[AsController]
class StationController
{
    #[Route('/api/stations')]
    public function getStations(WMATAService $service) : JsonResponse
    {
        return new JsonResponse($service->getStations());
    }

    #[Route('/api/stations/{stationCode}')]
    public function getArrivals(WMATAService $service, string $stationCode) : JsonResponse
    {
        return new JsonResponse($service->getArrivals($stationCode));
    }   
}