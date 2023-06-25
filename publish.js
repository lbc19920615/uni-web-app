const fse = require('fs-extra');

const srcDir = `./dist/build/h5`;
const destDir = `D:\\projects\\android\\WebApp\\app\\src\\main\\assets\\web`;

// To copy a folder or file, select overwrite accordingly
try {
  fse.copySync(srcDir, destDir, { overwrite: true | false });
  console.log('success!');
} catch (err) {
  console.error(err);
}
