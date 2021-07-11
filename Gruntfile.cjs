const {readFileSync} = require("fs");
const loadGruntTasks = require("load-grunt-tasks");
const {
  reactApp,
  reactAppOptionsHelper,
  reactAppDynamicTasks,
  getOpts,
  OptType,
} = require("@cley_faye/boilerplate/grunt.js");

const licenseJS = [
  "/*!",
  " * @license",
  " * @preserve",
  ...readFileSync("LICENSE", "utf8").split("\n")
    .map(c => ` * ${c}`.trimEnd()),
  " */",
].join("\n");

const clean = {
  build: [
    "build",
    "dist",
  ],
  cache: [
    ".tsbuildinfo",
    "**/.cache",
  ],
};

const shell = {
  build: {
    command: "npm exec tsc",
    stdout: true,
    stderr: true,
  },
};

const usebanner = {
  options: {banner: licenseJS},
  build: {
    files: [{
      expand: true,
      cwd: "lib",
      src: ["**/*.js"],
    }],
  },
};

const getOptions = grunt => getOpts(
  grunt,
  {
    "prod": {
      description: "Build the webapp for production",
      type: OptType.BOOLEAN,
      defaultValue: false,
    },
  },
) ?? {};

const baseCfg = {
  clean,
  shell,
  usebanner,
};

const configReactApp = (baseGruntConfig, opts) => {
  const reactAppConfigBase = {
    pug: {},
    image: {},
    webpack: {},
    sass: {},
    copy: {},
  };
  const requiredTasks = reactApp(
    baseGruntConfig,
    "pocoma",
    reactAppOptionsHelper(
      {
        production: opts.prod,
        watch: true,
      },
      reactAppConfigBase,
    ),
  );
  return requiredTasks;
};

const registerTasks = (grunt, requiredTasks) => {
  grunt.registerTask(
    "buildJS",
    "Build the application from TypeScript",
    [
      "shell:build",
      "usebanner:build",
    ],
  );

  grunt.registerTask(
    "buildWebapp",
    "Build the webapp from the JavaScript source (after TypeScript)",
    requiredTasks,
  );

  grunt.registerTask(
    "build",
    "Build the full app",
    [
      "buildJS",
      "buildWebapp",
    ],
  );

  grunt.registerTask(
    "default",
    ["build"],
  );
};

module.exports = grunt => {
  loadGruntTasks(grunt);
  const opts = getOptions(grunt);
  const baseGruntConfig = baseCfg;
  const requiredTasks = configReactApp(baseGruntConfig, opts);

  grunt.initConfig(baseGruntConfig);
  reactAppDynamicTasks(grunt, baseGruntConfig);

  registerTasks(grunt, requiredTasks);
};
