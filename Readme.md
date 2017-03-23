# gulp-polymer-sass

> Compile SCSS code included inside your Polymer element.

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

You can pass the output style like this:
```js
...
.pipe(polymerScss({outputStyle: 'compressed'}))
...
```
Output style can be **_compressed_**, **_nested_**, **_compact_** or **_expanded_**

Output:
```html
<style>.test h2{color:$main-color}</style>
```