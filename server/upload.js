import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path"

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AES_REGION,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read',
        key: function( req, file, cb) {
            const folder = file.fieldname === 'mainImage' ? 'main' : (file.fieldname === 'recipe' ? 'recipeImage' : file.fieldname === 'bannerImage' ? 'banner' : 'attachments');
            const decodedName = Buffer.from(file.originalname, 'latin1').toString('utf8');
            cb(null, `${folder}/${Date.now()}_${path.basename(decodedName)}`)
        },
        contentType: multerS3.AUTO_CONTENT_TYPE, // 파일 타입 자동감지
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});

export { s3 };
export default upload;