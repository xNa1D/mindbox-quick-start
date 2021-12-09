import Papa, { LocalFile } from "papaparse";
import { Link } from "../entities/form";

export type ParseCsv = (
  file: LocalFile,
  handleResult: (data: Link[]) => void
) => Promise<Link[]>;

export const parseCsv: ParseCsv = (file, handleResult) => {
  return new Promise((resolve, reject) => {
    const config = {
      complete: (result: { data: any; }) => {
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
