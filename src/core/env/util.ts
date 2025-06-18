export function parseCommandLineArgs() {
  const args = process.argv.slice(2);

  const values: { [key: string]: string | boolean } = {}; // Index signature

  args.forEach((arg) => {
    const [key, value] = arg.split('=');
    values[key.replace('--', '')] = value ? value : true;
  });

  // Example validation
  if (!values.env) values.env = 'test';
  else if (!['test', 'staging', 'live'].includes(values.env as string)) {
    console.error('Invalid Environment:', values.env);
    process.exit(1);
  }

  return values;
}
