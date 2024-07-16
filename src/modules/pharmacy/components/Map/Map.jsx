import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
// import MapInputs from '../MapInputs/MapInputs';
import { useTranslation } from 'react-i18next';
import './index.scss';
import MInput from '../../../../components/FormControls/MInput/MInput';
import MButton from '../../../../components/FormControls/MButton/MButton';
import usePharmacies from '../../hooks/usePharmacies';
import { PharmacyFields } from '../../data/pharmacyEnums';
import alphaPharm from '/public/images/alfa-pharm.svg';
import asteria from '/public/images/asteria.svg';
import nataliPharm from '/public/images/natali-pharm.svg';
import userMarker from '/public/images/user-location-marker.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPaths } from '../../../../constants/constants';
import { langKeyAdapter } from '../../../../utils/normalizers';
import { useRecoilState } from 'recoil';
import { addressSearchValueAtom, centerAtom, selectedPharmacyAtom } from '../../store/store';
import MapLoader from '../../../../components/MapLoader/MapLoader';
import PharmacyNotFound from '../PharmacyNotFound/PharmacyNotFound';
// import '@googlemaps/extended-component-library/place_overview.js';

const containerStyle = {
  width: '100%',
  height: 'calc(100dvh - 209px)',
};

const defaultMapCenter = {
  lat: 40.2057999,
  lng: 44.5062259,
};

const pharmacyMarkers = {
  1: alphaPharm,
  2: asteria,
  3: nataliPharm,
};

const placesLibrary = ['places', 'geometry'];

const Map = ({ onMapClose }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-Map-script',
    googleMapsApiKey: 'AIzaSyDsEB2SSc6_rM8DWdgASoBI-VdYTGKCwBI',
    libraries: placesLibrary,
  });
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { pharmacies, getPharmacies, loading, setLoading } = usePharmacies();

  const [searchResult, setSearchResult] = useState(null);
  const [center, setCenter] = useRecoilState(centerAtom);
  const [map, setMap] = useState(null);
  const [distanceAndDuration, setDistanceAndDuration] = useState({ distance: '', duration: '' });
  const [searchValue, setSearchValue] = useRecoilState(addressSearchValueAtom);
  const [selectedPharmacy, setSelectedPharmacy] = useRecoilState(selectedPharmacyAtom);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // // console.log(bounds);
    //
    // if (Map) {
    //   // Map.fitBounds?.(bounds);
    // }

    setMap(map);
  }, []);

  useEffect(() => {
    if (map) {
      // Map.addEventListener('click', () => infowindow.close());
      // const infowindow = new google.maps.InfoWindow({
      //   content: '<div><div>asdf</div> <div>dsa</div></div>',
      //   ariaLabel: 'Uluru',
      // });
      // const marker = new google.maps.Marker({
      //   position: center,
      //   Map,
      //   title: 'Uluru (Ayers Rock)',
      // });
      // console.log(marker);
      // marker.addListener('click', () => {
      //   infowindow.open({
      //     anchor: marker,
      //     Map,
      //   });
      // });
    }
  }, [map]);

  useEffect(() => {
    if (center && !pharmacies.length) {
      getPharmacies();
    }
  }, [center]);

  useEffect(() => {
    setSelectedPharmacy({});
  }, []);

  const onAutocompleteLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onPlaceChanged = async () => {
    setCenter(null);

    if (searchResult != null) {
      const place = await searchResult.getPlace();

      if (!place) {
        return;
      }

      const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      const formattedAddress = place.formatted_address;
      //
      setSearchValue(formattedAddress);
      setSelectedMarker(null);
      getPharmacies();

      //TODO workaround, fix it
      setTimeout(() => setCenter(location));
    }
  };

  const onCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location = { lat: position.coords.latitude, lng: position.coords.longitude };

        setCenter(location);
      },
      async () => {
        setCenter(defaultMapCenter);
      },
    );
  };

  const onMapClick = async (data) => {
    const location = { lat: data.latLng.lat(), lng: data.latLng.lng() };

    setSelectedMarker(null);
    // await setMarkerAndSearchValue(location);
  };

  const onMarkerClick = async (data) => {
    setSelectedMarker(data);
  };

  // const calculateRoute = async (data) => {
  //   const directionsService = new window.google.maps.DirectionsService();
  //   console.log(data);
  //   const results = await directionsService.route({
  //     origin: defaultMapCenter,
  //     destination: {
  //       lat: 40.20485139881773,
  //       lng: 44.50442165136337,
  //     },
  //     travelMode: window.google.maps.TravelMode.WALKING,
  //   });
  //   console.log(results);
  //   Map.fitBounds(results.routes[0].bounds);
  //   createPolyline(results);
  //   setDirections(results);
  // };

  // const setMarkerAndSearchValue = async (location) => {
  //   setSelectedMarker(location);
  //
  //   const geocoder = new window.google.maps.Geocoder();
  //   const places = new window.google.maps.places.PlacesService();
  //   const address = await geocoder.geocode({ location });
  //
  //   const response = await new Promise((resolve, reject) => {
  //     geocoder.geocode({ location }, (results, status) => {
  //       if (status === 'OK') {
  //         resolve(results);
  //       } else {
  //         reject(status);
  //       }
  //     });
  //   });
  //
  //   // Extract place information from response
  //   const placeInfo = response[0];
  //   // fetchPlaceDetails(placeInfo.place_id);
  //   setSearchValue(address.results[0].formatted_address);
  // };

  const onBack = () => {
    onMapClose();
  };

  // const fetchPlaceDetails = async (placeId) => {
  //   try {
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=AIzaSyCpxA1IDdW1WyAkV6G_3uePmAdGnW8LOM4`,
  //     );
  //
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch place details');
  //     }
  //
  //     const data = await response.json();
  //   } catch (error) {
  //     console.error('Error fetching place details:', error);
  //   }
  // };

  const calculateDistance = async () => {
    const distanceMatrixService = new window.google.maps.DistanceMatrixService();

    const distance = await distanceMatrixService.getDistanceMatrix({
      destinations: [center],
      origins: [selectedMarker],
      travelMode: window.google.maps.TravelMode.WALKING,
    });
    const distanceInMetres = distance?.rows[0]?.elements[0]?.distance?.value;
    const durationInSeconds = distance?.rows[0]?.elements[0]?.duration?.value;

    setDistanceAndDuration({ distance: distanceInMetres, duration: Math.ceil(durationInSeconds / 60) });
  };

  useEffect(() => {
    // onCurrentLocationClick();
  }, []);

  useEffect(() => {
    if (selectedMarker) {
      void calculateDistance();
    }
  }, [selectedMarker]);

  // const createPolyline = (directionResult) => {
  //   let line = new window.google.maps.Polyline({
  //     path: directionResult.routes[0].overview_path,
  //     strokeColor: '#102191',
  //     strokeOpacity: 0.5,
  //     strokeWeight: 4,
  //   });
  //
  //   line.setMap(Map);
  //
  //   for (var i = 0; i < line.getPath().length; i++) {
  //     var marker = new window.google.maps.Marker({
  //       icon: {
  //         path: window.google.maps.SymbolPath.CIRCLE,
  //         scale: 3,
  //       },
  //       position: line.getPath().getAt(i),
  //       Map,
  //     });
  //   }
  // };

  // if (!isLoaded) {
  //   return <MapLoader loading={!isLoaded} />;
  // }

  return isLoaded ? (
    <div className="map-container">
      <MapLoader loading={loading || !isLoaded} />
      <header className="map-header">
        <div className="map-title-container">
          <div className="map-titles flex space-between">
            <img
              src="/images/back.svg"
              alt=""
              className="p-r-6"
              onClick={() => navigate(`/${AppPaths.prescriptions}/${id}`)}
            />
            <div>{t('pharmacies')}</div>
            <div className="width-26"></div>
          </div>
        </div>
        <div className="map-input-container">
          <div className="map-input-description">{t('writeYourAddress')}</div>
          <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onAutocompleteLoad}>
            <MInput
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder={t('yourAddress')}
            />
          </Autocomplete>
        </div>
      </header>
      {/*<gmpx-api-loader*/}
      {/*  key="AIzaSyCpxA1IDdW1WyAkV6G_3uePmAdGnW8LOM4"*/}
      {/*  solution-channel="GMP_DOCS_placeoverview_v1"*/}
      {/*></gmpx-api-loader>*/}
      {/*<gmpx-place-overview place="ChIJVVVVnvlHDW0Rwyod-_ddhAw"></gmpx-place-overview>*/}
      {center && !loading ? (
        <div className="map-wrapper">
          {pharmacies.length && center ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center || defaultMapCenter}
              zoom={13}
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={onMapClick}
              mapTypeControl={false}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: [
                  {
                    featureType: 'all',
                    elementType: 'labels',
                    stylers: [
                      {
                        visibility: 'off',
                      },
                    ],
                  },
                  {
                    featureType: 'road',
                    elementType: 'labels',
                    stylers: [
                      { visibility: 'on' }, // Show road labels (street names)
                    ],
                  },
                  {
                    featureType: 'transit',
                    stylers: [
                      { visibility: 'on' }, // Hide transit lines and stations
                    ],
                  },
                  {
                    featureType: 'administrative',
                    stylers: [
                      { visibility: 'on' }, // Hide administrative labels
                    ],
                  },
                  {
                    featureType: 'water',
                    stylers: [
                      { visibility: 'on' }, // Hide water features
                    ],
                  },
                ],
              }}
            >
              {pharmacies.map((pharmacy) => (
                <Marker
                  icon={{
                    url: pharmacyMarkers[pharmacy[PharmacyFields.branch][PharmacyFields.pharmacyId]],
                    scale: 7,
                    labelOrigin: new window.google.maps.Point(130, 35),
                  }}
                  label={{ text: pharmacy.label, className: 'marker-label' }}
                  position={pharmacy}
                  key={pharmacy.lat}
                  onClick={() => onMarkerClick(pharmacy)}
                />
              ))}
              {center ? (
                <Marker
                  position={center}
                  icon={{
                    url: userMarker,
                    scale: 7,
                  }}
                />
              ) : null}
              {/*<DirectionsRenderer directions={directions} />*/}
              {selectedMarker ? (
                <InfoWindow
                  position={selectedMarker}
                  onCloseClick={() => setSelectedMarker(null)}
                  options={{ pixelOffset: new window.google.maps.Size(0, -42) }}
                >
                  <div className="info-window">
                    <div className="info-pharmacy">
                      {selectedMarker[PharmacyFields.branch]?.[PharmacyFields.pharmacy]}
                    </div>
                    <div className="info-address">
                      {selectedMarker[PharmacyFields.branch]?.[PharmacyFields.address]?.[langKeyAdapter[i18n.language]]}
                    </div>
                    <div className="info-road p-b-6">
                      <img src="/images/human.svg" alt="" />
                      <span className="info-road-text">
                        {t('route')} | {t('time', { time: distanceAndDuration.duration })},{' '}
                        {t('distance', { distance: distanceAndDuration.distance })}
                      </span>
                    </div>
                    <div className="info-road">
                      <img src="/images/clock.svg" alt="flag" />
                      <span className="info-road-text">
                        {selectedMarker[PharmacyFields.branch]?.[PharmacyFields.workingHours]}
                      </span>
                    </div>
                    <MButton
                      text="chooseAndContinue"
                      className="w-100 m-t-12"
                      onClick={() => {
                        setSelectedPharmacy(selectedMarker);
                        navigate(`/${AppPaths.pharmacyOffers}/${id}`);
                      }}
                    />
                  </div>
                </InfoWindow>
              ) : null}
            </GoogleMap>
          ) : (
            <PharmacyNotFound />
          )}
        </div>
      ) : null}
    </div>
  ) : (
    <></>
  );
};

export default Map;
