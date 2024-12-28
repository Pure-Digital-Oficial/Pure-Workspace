import multer from 'multer';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { BadRequestException } from '@nestjs/common';
import { FileNotAllowed, FileTypes } from '@pure-workspace/domain';

const uploadedFileNames: string[] = [];

const memoryStorage = multer.memoryStorage();

const fileFilter = (
  req: Request<ParamsDictionary, unknown, unknown, ParsedQs>,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (FileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new FileNotAllowed();
    cb(
      new BadRequestException({
        error: {
          name: error.name,
          message: error.message,
        },
      })
    );
  }
};

const upload = multer({
  storage: memoryStorage,
  fileFilter: fileFilter,
});

export const FileS3Storage = {
  Storage: memoryStorage,
  getUploadedFileNames: () => {
    const names = [...uploadedFileNames];
    uploadedFileNames.length = 0;
    return names;
  },
  fileFilter: fileFilter,
  upload: upload,
};
