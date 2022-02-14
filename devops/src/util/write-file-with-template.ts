import { ensureDir, readFile, writeFile } from 'fs-extra'
import { compile } from 'handlebars'
import { dirname } from 'path'

export function resolveTemplate(template: string, data: Record<string, any>) {
  return compile(template)(data)
}

export async function writeFileWithTemplate(
  templateFile: string,
  targetFile: string,
  data: Record<string, any>,
) {
  const template = await readFile(templateFile, 'utf8')
  const content = resolveTemplate(template, data)
  await ensureDir(dirname(targetFile))
  await writeFile(targetFile, content, 'utf8')
}
