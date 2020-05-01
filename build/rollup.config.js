import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only'
import cleaner from 'rollup-plugin-cleaner';
import replace from 'rollup-plugin-replace'

export default {
    input: 'src/wrapper.js', // Path relative to package.json
    
    output: {
        format: 'esm',
        file: 'dist/VuesenceBook.js',
        external: [ 'marked' ] 
    },
    plugins: [
        cleaner({ targets: ['./dist/'] }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        commonjs(),
        css({ output: 'dist/default.css' }),
        resolve({
            extensions: ['.vue', '.js']
        }),
        vue({
            css: false, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
};