import Papa, { LocalFile } from "papaparse";

export const parseCsv = <ReturnValue>(
  file: LocalFile,
  handleResult: (data: ReturnValue) => void
) => {
  return new Promise<ReturnValue>((resolve, reject) => {
    const config = {
      complete: (result: { data: any }) => {
        const { data } = result;

        handleResult(data);
        resolve(result.data);
      },
      header: true,
      error: (error: Error) => reject(error.message),
    };

    Papa.parse<typeof config>(file, config);
  });
};
