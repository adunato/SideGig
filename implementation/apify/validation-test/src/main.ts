import { Actor } from 'apify';

type ValidationInput = {
  name?: string;
};

await Actor.init();

try {
  const input = (await Actor.getInput<ValidationInput>()) ?? {};
  const result = {
    message: `Hello ${input.name ?? 'Apify'}`,
    timestamp: new Date().toISOString(),
  };

  await Actor.pushData(result);
  console.log('Prerequisites validation result:', result);
} finally {
  await Actor.exit();
}
