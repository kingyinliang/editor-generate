const KoaBody = require('koa-body');
const path = require('path');

module.exports = {
  picture: [KoaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFileSize: 20 * 1024 * 1024,
      onFileBegin(name, file) {
        const fileTypes = ['image/jpeg', 'image/png'];
        if (!fileTypes.includes(file.mimetype)) {
          ctx.fail({
            data: '不支持文件格式'
          })
        } else {
          file.filepath = path.join(process.cwd(), 'public/upload/picture', file.newFilename);
        }
      },
      onError: (err) => {
        ctx.fail({
          data: err
        })
      }
    }
  }), async ctx => {
    const file = ctx.request.files.file;

    ctx.success({
      path: file.filepath,
      url: `${ctx.origin}/upload/picture/${path.basename(file.filepath)}`
    })
  }],
}