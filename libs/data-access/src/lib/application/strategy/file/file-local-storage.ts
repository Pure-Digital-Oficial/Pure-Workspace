import { diskStorage } from 'multer';

export const FileLocalStorage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const now = new Date();
      cb(null, `${now.getTime()}_${file.originalname}`);
    },
  }),
};
