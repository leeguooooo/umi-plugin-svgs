import cpy from 'cpy';
import { mkdirSync, readdir, readFile, statSync, writeFileSync } from 'fs';
import path, { dirname, resolve } from 'path';
import { SVGGeneratorOptions } from './types';

/**
 * 批量生成 react-svg 组件
 * @param param0
 * @returns
 */
export async function reactSVGGeneratorFromSVGDir({ output, entry }: SVGGeneratorOptions) {
  ensure(output);
  const write = (data: string | Buffer, flag = 'a+') => {
    writeFileSync(resolve(output, 'svg.tsx'), data, {
      flag,
    });
  };

  readSvgs(entry)
    .then((data) => {
      write(`import React from 'react';\nexport const TYPE_SVG_MAP = {`, 'w+');
      data.forEach((item) => {
        Object.keys(item).forEach((key, i) => {
          write(`${convertStringToCamelCase(key)}: (props: any) => (`);
          const str = item[key];
          const reg = /([a-z])-([a-z])/g;
          const content = str
            .replace(/<svg(.*?)>/, `<svg$1 {...props}>`)
            .replace(reg, (words: string) => {
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
function readSvgs(SVGPath: string): Promise<Record<string, string>[]> {
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
function readfile(SVGPath: string, filename: string): Promise<Record<string, string>> {
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

export function convertStringToCamelCase(sentence: string): string {
  // Replace hyphens and spaces with camelCase
  return sentence
    .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
    .replace(/^./, str => str.toLowerCase());
}
