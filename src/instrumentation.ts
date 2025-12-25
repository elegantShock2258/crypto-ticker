type EnvVar = {
  key: string;
  required?: boolean;
  description?: string;
};

const ENV_VARS: EnvVar[] = [
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    required: true,
    description: "Supabase project URL",
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    required: true,
    description: "Supabase public anon key",
  },
  {
    key: "APPLITOOLS_API_KEY",
    required: false,
    description: "Applitools visual regression testing",
  },
  {
    key: "VISUAL_TEST",
    required: false,
    description: "Disables realtime updates during visual tests",
  },
  {
    key: "LIGHTHOUSE_URL",
    required: false,
    description: "URL used for Lighthouse audits",
  },
];

const color = {
  green: (msg: string) => `\x1b[32m${msg}\x1b[0m`,
  yellow: (msg: string) => `\x1b[33m${msg}\x1b[0m`,
  red: (msg: string) => `\x1b[31m${msg}\x1b[0m`,
};

function checkEnvVariables() {
  console.log("Environment variable check====================\n");

  let hasMissingRequired = false;

  for (const { key, required, description } of ENV_VARS) {
    const value = process.env[key];

    if (value) {
      console.log(
        color.green(`✔ ${key} is set`) +
          (description ? ` — ${description}` : ""),
      );
    } else if (required) {
      hasMissingRequired = true;
      console.error(
        color.red(`✖ ${key} is MISSING`) +
          (description ? ` — ${description}` : ""),
      );
    } else {
      console.warn(
        color.yellow(`⚠ ${key} is not set`) +
          (description ? ` — ${description}` : ""),
      );
    }
  }

  console.log("");

  return hasMissingRequired;
}

export async function register() {
  if (process.env.NEXT_RUNTIME === "edge") return;

  if ((globalThis as any).__ENV_CHECKED__) return;
  (globalThis as any).__ENV_CHECKED__ = true;

  const hasMissingRequired = checkEnvVariables();

  if (hasMissingRequired && process.env.NODE_ENV !== "production") {
    console.error(
      color.red(
        "Required environment variables are missing. Fix them before continuing.\n",
      ),
    );
  }
}
