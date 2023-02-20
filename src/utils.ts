import cpy from 'cpy';
import { mkdirSync, readdir, readFile, statSync, writeFileSync } from 'fs';
import path, { dirname, resolve } from 'path';

/**
 * 批量生成 react-svg 组件
 * @param param0
 * @returns
 */
export async function reactSVGGeneratorFromSVGDir({ output, entry }) {
  ensure(output);
  const write = (data, flag = 'a+') => {
    writeFileSync(resolve(output, 'svg.tsx'), data, {
      flag,
    });
  };

  readSvgs(entry)
    .then((data: string[]) => {
      write(`import React from 'react';\nexport default {`, 'w+');
      data.forEach((item: string) => {
        Object.keys(item).forEach((key, i) => {
          write(`${convertStringToCamelCase(key)}: (props: any) => (`);
          const str = item[key];
          const reg = /([a-z])-([a-z])/g;
          const content = str
            .replace(/<svg(.*?)>/, `<svg$1 {...props}>`)
            .replace(reg, (words) => {
              const [$1, , $2] = words.split('');
              return $1 + $2.toUpperCase();
            });
          write(Buffer.from(content));
          write('),');
        });
      });
      write('}');
    })
    .catch((err) => {
      console.log(err);
    });

  await copySVGComponents({ output: output });
}

// 读取SVG文件夹下所有svg
function readSvgs(SVGPath) {
  return new Promise((resolve, reject) => {
    readdir(SVGPath, function (err, files) {
      if (err) reject(err);
      Promise.all(files.map((filename) => readfile(SVGPath, filename)))
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  });
}

// 读取单个文件
function readfile(SVGPath, filename) {
  return new Promise((resolve, reject) => {
    readFile(path.join(SVGPath, filename), 'utf-8', function (err, data) {
      if (err) reject(err);
      if (data) {
        resolve({
          [filename.slice(0, filename.lastIndexOf('.'))]: data,
        });
      }
    });
  });
}

export function ensure(filepath: string, next: string[] = []) {
  try {
    statSync(filepath);
    if (next.length !== 0) {
      mkdirSync(next.pop() as string);
      ensure(filepath, next);
    }
  } catch {
    const needToCreate = dirname(filepath);
    ensure(needToCreate, next.concat(filepath));
  }
}

async function copySVGComponents({ output }: { output: string }) {
  await cpy(resolve(__dirname, './index.tsx.tpl'), output, {
    rename: (path) => {
      return path.replace('.tsx.tpl', '.tsx');
    },
  });
}

function convertStringToCamelCase(sentence: string) {
  return sentence.replace(
    /(?:^\w|[A-Z]|\b\w|\s+)/g,
    function (camelCaseMatch, i) {
      if (+camelCaseMatch === 0) return '';
      return i === 0
        ? camelCaseMatch.toLowerCase()
        : camelCaseMatch.toUpperCase();
    },
  );
}
