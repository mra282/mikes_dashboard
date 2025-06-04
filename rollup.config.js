import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

const config = {
  input: 'src/mikes-dashboard.js',
  output: {
    file: 'custom_components/mikes_dashboard/www/mikes-dashboard.js',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
};

export default config;
