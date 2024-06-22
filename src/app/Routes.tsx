import { Outlet, Route, Routes as BaseRoutes } from 'react-router-dom';
import PharmacyRoutes from '../modules/pharmacy/routes/PharmacyRoutes.tsx';
import useBreakpoint from '../hooks/useBreakpoint.ts';
import DesktopInformation from '../components/DesktopInformation/DesktopInformation.tsx';

const Routes = () => {
  const currentBreakpoint = useBreakpoint();

  if (currentBreakpoint !== 'small') {
    return <DesktopInformation />;
  }

  return (
    <BaseRoutes>
      <Route
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route path="/*" element={<PharmacyRoutes />} />
      </Route>
    </BaseRoutes>
  );
};

export default Routes;
