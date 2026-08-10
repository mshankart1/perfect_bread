import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Load KEY=VALUE pairs from env files without overriding existing process.env.
 * Does not log values.
 */
export function loadEnvFiles(cwd = process.cwd()) {
  const candidates = ['.env', '.env.local', '.env.development', '.env.development.local']

  for (const file of candidates) {
    const path = resolve(cwd, file)
    if (!existsSync(path)) continue

    const text = readFileSync(path, 'utf8')
    for (const rawLine of text.split('\n')) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue

      const eq = line.indexOf('=')
      if (eq === -1) continue

      const key = line.slice(0, eq).trim()
      if (!key || process.env[key] !== undefined) continue

      let value = line.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      process.env[key] = value
    }
  }
}
