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

Output:
```html
<style>.test h2{color:$main-color}</style>
```