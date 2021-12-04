import Papa, { ParseError, ParseResult } from "papaparse";
import { Link } from "../entities/form";

export type ParseCsv = (
  file: File,
  handleResult: (data: Link[]) => void
) => Promise<Link[]>;

export const parseCsv: ParseCsv = (file, handleResult) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (result: ParseResult<Link>) => {
        const { data } = result;

        handleResult(data);
        resolve(result.data);
      },
      header: true,
      error: (error: ParseError) => reject(error.message),
    });
  });
};
