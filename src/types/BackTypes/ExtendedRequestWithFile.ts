import { NextApiRequest } from "next"
import { UploadedFile } from "./UploadedFile";

export type NextApiRequestWithFile = NextApiRequest & {
    file: UploadedFile
};
