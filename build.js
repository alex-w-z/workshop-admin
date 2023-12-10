import fs from 'fs';
import path from 'path';
import { CRX_OUTDIR,CRX_CONTENT_OUTDIR,CRX_BACKGROUND_OUTDIR } from './globalConfig.js';

// copy the files from the dir
const copyDirectory = (src, dest) => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    if (fs.existsSync(src)) {
        fs.readdirSync(src).forEach((file) => {
            const curPath = path.join(src, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                copyDirectory(curPath, path.join(dest, file));
            } else {
                if (fs.existsSync(curPath)) {
                    fs.copyFileSync(curPath, path.join(dest, file));
                }
            }
        });
    }
}

// remove the dir
const deteleDirectory = (dir) => {
    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file) => {
            const curPath = path.join(dir, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deteleDirectory(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dir);
    }
}

// content script 临时生成目录
const contentOutDir = path.resolve(process.cwd(), CRX_CONTENT_OUTDIR);
// background script 临时生成目录
const backgroundOutDir = path.resolve(process.cwd(), CRX_BACKGROUND_OUTDIR);
// 最终生成目录
const outDir = path.resolve(process.cwd(), CRX_OUTDIR);
//将复制元目录内的文件和目录全部复制到目录目录中
copyDirectory(contentOutDir, outDir);
copyDirectory(backgroundOutDir, outDir);
//删除临时目录
deteleDirectory(contentOutDir);
deteleDirectory(backgroundOutDir);