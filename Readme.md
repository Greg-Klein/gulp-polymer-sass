# gulp-polymer-sass

> Compile SCSS code included inside your Polymer element.

[![NPM](https://nodei.co/npm/gulp-polymer-sass.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-polymer-sass/)

## Install

```bash
$ npm install gulp-polymer-sass --save-dev
```

## Usage
Write scss directly inside your polymer element
```html
<style lang="scss">
	$main-color: red;

	.test {
		h2 {
			color: $main-color;
		}
	}
</style>
```

Create a Gulp task

```js
var polymerScss = require('gulp-polymer-sass');

gulp.task('scss', function () {
    return gulp.src('components/*.html')
        .pipe(polymerScss())
        .pipe(gulp.dest('dist/'));
});
```

You can pass the options for Sass like this:
```js
...
.pipe(polymerScss(options))
...
```

Options can be found on the [**node_sass**](https://www.npmjs.com/package/node-sass#options) page.

Example:
-------------

```js
...
.pipe(polymerScss({outputStyle: 'compressed'}))
...
```

Output:
```html
<style>.test h2{color:$main-color}</style>
```