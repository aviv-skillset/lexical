/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { replaceCodePlugin } from 'vite-plugin-replace';
import dts from 'vite-plugin-dts';
import babel from '@rollup/plugin-babel';




const moduleResolution = [
  {
    find: /lexical$/,
    replacement: path.resolve('node_modules/lexical/Lexical.js'),
  },
  {
    find: '@lexical/clipboard',
    replacement: path.resolve('node_modules/@lexical/clipboard/LexicalClipboard.js'),
  },
  {
    find: '@lexical/selection',
    replacement: path.resolve('node_modules/@lexical/selection/LexicalSelection.js'),
  },
  {
    find: '@lexical/text',
    replacement: path.resolve('node_modules/@lexical/text/LexicalText.js'),
  },
  {
    find: '@lexical/headless',
    replacement: path.resolve('node_modules/@lexical/headless/LexicalHeadless.js'),
  },
  {
    find: '@lexical/html',
    replacement: path.resolve('node_modules/@lexical/html/LexicalHtml.js'),
  },
  {
    find: '@lexical/hashtag',
    replacement: path.resolve('node_modules/@lexical/hashtag/LexicalHashtag.js'),
  },
  {
    find: '@lexical/history',
    replacement: path.resolve('node_modules/@lexical/history/LexicalHistory.js'),
  },
  {
    find: '@lexical/list',
    replacement: path.resolve('node_modules/@lexical/list/LexicalList.js'),
  },
  {
    find: '@lexical/file',
    replacement: path.resolve('node_modules/@lexical/file/LexicalFile.js'),
  },
  {
    find: '@lexical/table',
    replacement: path.resolve('node_modules/@lexical/table/LexicalTable.js'),
  },
  {
    find: '@lexical/offset',
    replacement: path.resolve('node_modules/@lexical/offset/LexicalOffset.js'),
  },
  {
    find: '@lexical/utils',
    replacement: path.resolve('node_modules/@lexical/utils/LexicalUtils.js'),
  },
  {
    find: '@lexical/code',
    replacement: path.resolve('node_modules/@lexical/code/LexicalCode.js'),
  },
  {
    find: '@lexical/plain-text',
    replacement: path.resolve('node_modules/@lexical/plain-text/LexicalPlainText.js'),
  },
  {
    find: '@lexical/rich-text',
    replacement: path.resolve('node_modules/@lexical/rich-text/LexicalRichText.js'),
  },
  {
    find: '@lexical/dragon',
    replacement: path.resolve('node_modules/@lexical/dragon/LexicalDragon.js'),
  },
  {
    find: '@lexical/link',
    replacement: path.resolve('node_modules/@lexical/link/LexicalLink.js'),
  },
  {
    find: '@lexical/overflow',
    replacement: path.resolve('node_modules/@lexical/overflow/LexicalOverflow.js'),
  },
  {
    find: '@lexical/markdown',
    replacement: path.resolve('node_modules/@lexical/markdown/LexicalMarkdown.js'),
  },
  {
    find: '@lexical/mark',
    replacement: path.resolve('node_modules/@lexical/mark/LexicalMark.js'),
  },
  {
    find: '@lexical/yjs',
    replacement: path.resolve('node_modules/@lexical/yjs/LexicalYjs.js'),
  },
  {
    find: 'shared',
    replacement: path.resolve('../shared/src'),
  },
];
// Lexical React
[
  'LexicalTreeView',
  'LexicalComposer',
  'LexicalComposerContext',
  'useLexicalIsTextContentEmpty',
  'useLexicalTextEntity',
  'useLexicalSubscription',
  'useLexicalEditable',
  'LexicalContentEditable',
  'LexicalNestedComposer',
  'LexicalHorizontalRuleNode',
  'LexicalHorizontalRulePlugin',
  'LexicalDecoratorBlockNode',
  'LexicalBlockWithAlignableContents',
  'useLexicalNodeSelection',
  'LexicalMarkdownShortcutPlugin',
  'LexicalCharacterLimitPlugin',
  'LexicalHashtagPlugin',
  'LexicalErrorBoundary',
  'LexicalPlainTextPlugin',
  'LexicalRichTextPlugin',
  'LexicalClearEditorPlugin',
  'LexicalClickableLinkPlugin',
  'LexicalCollaborationContext',
  'LexicalCollaborationPlugin',
  'LexicalHistoryPlugin',
  'LexicalTypeaheadMenuPlugin',
  'LexicalNodeMenuPlugin',
  'LexicalContextMenuPlugin',
  'LexicalTablePlugin',
  'LexicalLinkPlugin',
  'LexicalListPlugin',
  'LexicalCheckListPlugin',
  'LexicalAutoFocusPlugin',
  "LexicalTableOfContents",
  'LexicalAutoLinkPlugin',
  'LexicalAutoEmbedPlugin',
  'LexicalOnChangePlugin',
  'LexicalNodeEventPlugin',
  'LexicalTabIndentationPlugin'
].forEach((module) => {
  let resolvedPath = path.resolve(`node_modules/@lexical/react/${module}.js`);
  moduleResolution.push({
    find: `@lexical/react/${module}`,
    replacement: resolvedPath,
  });
});
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /__DEV__/g,
          to: 'true',
        },
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      configFile: false,
      exclude: /\/\*\*\/node_modules\/(?!lexical|@lexical).+/,
      include: ['/**/node_modules/lexical/**/*', '/**/node_modules/@lexical/**/*',],
      extensions: ['jsx', 'js', 'ts', 'tsx', 'mjs'],
      plugins: [
        '@babel/plugin-transform-flow-strip-types',
        [
          require('../../scripts/error-codes/transform-error-messages'),
          {
            noMinify: true,
          },
        ],
      ],
      presets: ['@babel/preset-react'],
    }),
    react(),
    dts({
      // tsConfigFilePath: '../../tsconfig.json',
      insertTypesEntry: true,

    }),
  ],
  resolve: {
    alias: moduleResolution,
  },
  build: {
    outDir: 'build',
    lib: {
      entry: path.resolve(__dirname, 'src/App.tsx'),
      name: 'LexicalPlayground',
      formats: ['es'],
      fileName: (format) => `lexical-playground.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      // output: {
      //   globals: {
      //     react: 'React',
      //     'react-dom': 'ReactDOM',
      //     'styled-components': 'styled',
      //   },
      // },
      // input: {
      //   main: new URL('./index.html', import.meta.url).pathname,
      //   split: new URL('./split/index.html', import.meta.url).pathname,
      // },
    },
  },
});
