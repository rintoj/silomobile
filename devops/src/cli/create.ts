import { sync } from 'fast-glob'
import { existsSync } from 'fs'
import { toCamelCase, toClassName, toDashedName } from 'name-util'
import { resolve } from 'path'
import { getRootDir, getSourceTemplateDir, resolveTemplate, writeFileWithTemplate } from '../util'

interface Context {
  name: string
  className: string
  camelCaseName: string
}

enum Type {
  COMPONENT = 'component',
  FEATURE = 'feature',
}

async function createComponentOrFeature(name: string, type: Type) {
  const packagePath = resolve(getRootDir(), type)
  if (existsSync(resolve(packagePath, name))) {
    throw new Error(
      `A ${type} by name "${name}" exists! Terminating script not to overwrite the existing content.`,
    )
  }

  const context: Context = {
    name: toDashedName(name),
    className: toClassName(name),
    camelCaseName: toCamelCase(name),
  }
  const sourcePath = `${getSourceTemplateDir()}/${type}-template`
  const files = sync(`${sourcePath}/**/*.tpl`)
  for (const templateFile of files) {
    const file = resolveTemplate(templateFile, context)
    const targetFile = resolve(
      packagePath,
      file.replace(resolve(sourcePath) + '/', '').replace('.tpl', ''),
    )
    await writeFileWithTemplate(templateFile, targetFile, context)
  }
}

const usage = 'Usage: yarn cli create <feature|component> <name>'

export default function create(type: Type, name: string) {
  if (!type) {
    throw new Error(`"type" is missing! \n${usage}\n`)
  }
  if (!name) {
    throw new Error(`"name" is missing! \n${usage}\n`)
  }
  if (![Type.COMPONENT, Type.FEATURE].includes(type)) {
    throw new Error(`Invalid type "${type}"! \n${usage}\n`)
  }
  return createComponentOrFeature(name, type)
}
