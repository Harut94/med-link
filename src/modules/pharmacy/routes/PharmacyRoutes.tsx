import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Prescriptions from '../containers/Prescriptions.tsx';
import { AppPaths } from '../../../constants/constants.ts';
import { useEffect } from 'react';
import Pharmacies from '../containers/Pharmacies.tsx';
import PharmacyOffers from '../containers/PharmacyOffers.tsx';
import PaymentSuccess from '../containers/PaymentSuccess.tsx';
import NotFound from '../../../components/NotFound/NotFound.tsx';

const PharmacyRoutes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route index element={<Navigate to={AppPaths.prescriptions} />} />
      <Route path={AppPaths.prescriptions}>
        <Route path=":id" element={<Prescriptions />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path={AppPaths.pharmacies}>
        <Route path=":id" element={<Pharmacies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path={AppPaths.pharmacyOffers}>
        <Route path=":id" element={<PharmacyOffers />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<PaymentSuccess />} path={AppPaths.payment} />
      <Route path="*" element={<NotFound />} />
      <Route path="notFound" element={<NotFound />} />
    </Routes>
  );
};

export default PharmacyRoutes;
