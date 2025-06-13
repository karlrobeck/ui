import inquirer from 'inquirer';

export async function promptConfig() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'tailwind.css',
      message: 'Path to Tailwind CSS:',
      default: 'src/css/tailwind.css',
    },
    {
      type: 'confirm',
      name: 'tailwind.cssVariables',
      message: 'Enable CSS variables?',
      default: true,
    },
    {
      type: 'input',
      name: 'tailwind.prefix',
      message: 'Tailwind prefix (optional):',
      default: '',
    },
    {
      type: 'input',
      name: 'aliases.utils',
      message: 'Path for alias "utils":',
      default: 'src/js/utils',
    },
    {
      type: 'input',
      name: 'aliases.components',
      message: 'Path for alias "components":',
      default: 'src/js/components',
    },
    {
      type: 'input',
      name: 'aliases.ui',
      message: 'Path for alias "ui" (optional):',
      default: 'src/ui',
    },
    {
      type: 'input',
      name: 'aliases.lib',
      message: 'Path for alias "lib" (optional):',
      default: 'src/lib',
    },
    {
      type: 'input',
      name: 'aliases.hooks',
      message: 'Path for alias "hooks" (optional):',
      default: 'src/hook',
    },
  ]);
}
