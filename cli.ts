import { Command, program } from 'commander';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';
import { configSchema } from './src/configSchema';
import { promptConfig } from './src/promptConfig';

function loadConfig(configPath?: string) {
  const resolvedPath = configPath
    ? path.resolve(configPath)
    : path.join(process.cwd(), 'config.json');
  try {
    const configRaw = fs.readFileSync(resolvedPath, 'utf-8');
    const configJson = JSON.parse(configRaw);
    return configSchema.parse(configJson);
  } catch (err) {
    console.error('Failed to load or parse config:', err);
    process.exit(1);
  }
}

program.option(
  '-c, --config <path>',
  'Path to config JSON file (default: ./config.json)',
  path.join(process.cwd(), 'config.json'),
);

program.command('init').action(async function () {
  const opts = this.parent ? this.parent.opts() : program.opts();
  const config = await promptConfig();
  // Transform flat answers to nested object
  const finalConfig = {
    tailwind: {
      config: config['tailwind.config'],
      css: config['tailwind.css'],
      baseColor: config['tailwind.baseColor'],
      cssVariables: config['tailwind.cssVariables'],
      ...(config['tailwind.prefix'] && { prefix: config['tailwind.prefix'] }),
    },
    aliases: {
      utils: config['aliases.utils'],
      components: config['aliases.components'],
      ...(config['aliases.ui'] && { ui: config['aliases.ui'] }),
      ...(config['aliases.lib'] && { lib: config['aliases.lib'] }),
      ...(config['aliases.hooks'] && { hooks: config['aliases.hooks'] }),
    },
  };
  // Validate with zod
  const parsed = configSchema.parse(finalConfig);
  // Write to config.json
  fs.writeFileSync(opts.config, JSON.stringify(parsed, null, 2));
  console.log('Config written to', opts.config);
});

program.command('add').action(function () {
  const opts = this.parent ? this.parent.opts() : program.opts();
  const config = loadConfig(opts.config);
  // ...existing code for add...
});

program.command('scaffold <name>').action(function (name: string) {
  const opts = this.parent ? this.parent.opts() : program.opts();
  const config = loadConfig(opts.config);
  // ...existing code for scaffold...
});

program.parse(process.argv);
