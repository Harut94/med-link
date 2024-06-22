import { useState } from 'react';
import { downloadStatementFileService } from '../services/PharmacyServices.ts';

const useDownloadStatement = () => {
  const [loading, setLoading] = useState(true);

  const downloadStatement = (requesId: number) => {
    setLoading(true);
    downloadStatementFileService(requesId)
      .then((response) => {
        const fileBlob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(fileBlob);

        const contentDisposition = response?.headers?.['content-disposition'];
        let fileName = 'Statement.pdf'; // Default file name

        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?([^"]*)"?/);

          if (fileNameMatch?.[1]) {
            fileName = fileNameMatch[1];
          }
        }

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.setAttribute('download', fileName);
        downloadLink.click();
        downloadLink.remove();

        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { downloadStatement, loading };
};

export default useDownloadStatement;
