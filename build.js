import fs from 'fs';
import path from 'path';
import { CRX_OUTDIR,CRX_CONTENT_OUTDIR,CRX_BACKGROUND_OUTDIR } from './globalConfig.js';

// 拷贝目录文件
const copyDirectory = (srcDir, destDir) => {
    // 判断目标目录是否存在，不存在则创建
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir)
    }

    fs.readdirSync(srcDir).forEach((file) => {
        const srcPath = path.join(srcDir, file)
        const destPath = path.join(destDir, file)

        if (fs.lstatSync(srcPath).isDirectory()) {
            // 递归复制子目录
            copyDirectory(srcPath, destPath)
        } else {
            // 复制文件
            fs.copyFileSync(srcPath, destPath)
        }
    })
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