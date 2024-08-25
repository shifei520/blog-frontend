module.exports = {
  '**/*.{js.jsx,tsx,ts}': ['eslint --fix', 'prettier --write'],
  '**/*.scss.css': ['prettier --write', 'stylelint --fix'],
  '**/*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix'],
  '**/*.{html,json,md}': ['prettier --write'],
};
