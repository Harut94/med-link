import { useTranslation } from 'react-i18next';
import './index.scss';
import { type FC } from 'react';

interface IMapLoader {
  loading: boolean;
}

const MapLoader: FC<IMapLoader> = ({ loading }) => {
  const { t } = useTranslation();

  if (!loading) {
    return null;
  }

  return (
    <div className="map-loader">
      <iframe
        src="https://lottie.host/embed/45e96dab-31ce-48ef-865c-643d01be702a/TqNTOUkE3K.json"
        style={{ border: 0, width: 184, height: 120, overflow: 'auto' }}
        title="map-loader"
      />
      <div className="text">{t('mapLoaderDescription')}</div>
    </div>
  );
};

export default MapLoader;
