import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { prescriptionsAtom } from '../store/store.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { AppPaths } from '../../../constants/constants.ts';
import { getPrescriptionsService } from '../services/PharmacyServices.ts';

const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useRecoilState(prescriptionsAtom);

  const [loading, setLoading] = useState(!prescriptions.length);
  const { id } = useParams();
  const navigate = useNavigate();

  const getAllPrescriptions = () => {
    if (!prescriptions.length) {
      setLoading(true);
      getPrescriptionsService(id as string)
        .then(({ data }) => {
          setPrescriptions(data);
        })
        .catch((error) => {
          console.error(error);

          if (error.response.status === 500) {
            navigate(`/${AppPaths.notFound}`);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  // useEffect(() => {
  //   if (!prescriptions.length) {
  //     setLoading(true);
  //     getPrescriptions(id as string)
  //       .then(({ data }) => {
  //         setPrescriptions(data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //
  //         if (error.response.status === 500) {
  //           navigate(`/${AppPaths.notFound}`);
  //         }
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }
  // }, []);

  return { getAllPrescriptions, prescriptions, loading };
};

export default usePrescriptions;
