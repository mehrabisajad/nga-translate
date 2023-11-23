# ngaTranslate

**A wrapper for ngx-translate library that support default translate.**

[![npm version](https://badge.fury.io/js/nga-translate.svg)](http://badge.fury.io/js/nga-translate)
[![GitHub issues](https://img.shields.io/github/issues/mehrabisajad/nga-translate.svg)](https://github.com/mehrabisajad/nga-translate/issues)
[![GitHub stars](https://img.shields.io/github/stars/mehrabisajad/nga-translate.svg)](https://github.com/mehrabisajad/nga-translate/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mehrabisajad/nga-translate/master/LICENSE)

ngaTranslate is an Angular library that provides a pipe and directive to simplify the translation of text in your Angular applications. It is a wrapper for the popular ngx-translate library and provides additional features and convenience methods.

## Installation

To install ngaTranslate, run the following command in your terminal:

```
npm install nga-translate --save
```

## Usage

### Pipe

The ngaTranslate pipe can be used to translate text in your Angular templates. The pipe takes two and three arguments:

#### 1. Three parameters:

Translation key and an optional object of default translation and optional object of params. The default translation can be use if the key is not found.

##### Examples

```html
{{ 'key' | ngaTranslate }} {{ 'key' | ngaTranslate : 'default translate' }} {{ 'key' | ngaTranslate : 'default translate' : { params } }} {{
'key' | ngaTranslate : 'default translate [{ p1 }]' : { p1: 'value' } }} {{ 'key' | ngaTranslate : { en: 'default translate [{ p1 }]', fr:
'traduction par défaut [{ p1 }]' } : { p1: 'value' } }}
```

#### 2. Two parameters:

An optional object of default translation and optional object of params. The default translation can be use if the key is not found.

##### Examples

```html
{{ { en: 'default translate' } | ngaTranslate } }} {{ { en: 'default translate [{ p1 }]' } | ngaTranslate : { p1: 'value' } }} {{ { en:
'default translate [{ p1 }]', fr: 'traduction par défaut [{ p1 }]' } | ngaTranslate : { p1: 'value' } }}
```

### Directive

The ngaTranslate directive can be used to translate a key with valueTranslate and element's content. The element's content use for default translate.

##### Examples

```html
<p ngaTranslate>Hello, world!</p>
<p ngaTranslate="key">Hello, world!</p>
<p ngaTranslate="key" [translateValues]="{ p1: 'value' }">Hello, world! [{ p1 }]</p>
<p ngaTranslate="key" [translateValues]="{ p1: 'value' }">
  &lcub; en: 'Hello, world! [&lcub; p1 }]', fr: 'Bonjour le monde! [&lcub; p1 }]' }
</p>
```

### Features

1. Simplified translation syntax: ngaTranslate provides a simpler syntax for translating text than ngx-translate.
2. Default translations: ngaTranslate allows you to specify a default translation to use if the translation key is not found.
3. Contextual translations: ngaTranslate allows you to provide additional context for translations, such as the current user's language or location.

## Contributing

We welcome contributions to ngaTranslate. Please feel free to create an issue or pull request on GitHub.

## License

ngaTranslate is licensed under the MIT License.
