import { z } from 'zod';

export const configSchema = z
  .object({
    tailwind: z
      .object({
        css: z.string().default('src/css/tailwind.css'),
        cssVariables: z.boolean().default(true),
        prefix: z.string().optional().default(''),
      })
      .default({
        css: 'src/css/tailwind.css',
        cssVariables: true,
        prefix: '',
      }),
    aliases: z
      .object({
        utils: z.string().default('src/js/utils'),
        components: z.string().default('src/js/components'),
        ui: z.string().optional().default('src/ui'),
        lib: z.string().optional().default('src/lib'),
        hooks: z.string().optional().default('src/hook'),
      })
      .default({
        utils: 'src/js/utils',
        components: 'src/js/components',
        ui: 'src/ui',
        lib: 'src/lib',
        hooks: 'src/hook',
      }),
  })
  .default({
    tailwind: {
      css: 'src/css/tailwind.css',
      cssVariables: true,
      prefix: '',
    },
    aliases: {
      utils: 'src/js/utils',
      components: 'src/js/components',
      ui: 'src/ui',
      lib: 'src/lib',
      hooks: 'src/hook',
    },
  });
