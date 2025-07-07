module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'cicd',
        'release',
        'rename',
        'remove',
        'build',
        'hotfix',
      ],
    ],
  },
}
