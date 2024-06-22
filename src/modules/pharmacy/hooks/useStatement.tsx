import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { statementAtom } from '../store/store.ts';
import { getStatementService } from '../services/PharmacyServices.ts';
import { useQueryParams } from '../../../hooks/useQueryParams.ts';

const useStatement = () => {
  const [loading, setLoading] = useState(true);
  const [statement, setStatement] = useRecoilState(statementAtom);
  const { searchParams } = useQueryParams();

  useEffect(() => {
    setLoading(true);
    getStatementService(searchParams.id as string)
      .then(({ data }) => {
        setStatement(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { statement, loading };
};

export default useStatement;
