## Browser usage example

The **Vuesence Book** can be run as a stand-alone web component in the browser. `Vue` and `@vuesence/book` packages should be loaded as scripts. Vue-router must be disabled.

```html
<!DOCTYPE html>
<html lang="en">

	<head>
		<title>Vuesence Book demo</title>

		<script src="https://unpkg.com/vue"></script>
		<script src="https://unpkg.com/@vuesence/book"></script>

        <link rel="stylesheet" href="https://unpkg.com/@vuesence/book/src/css/default.css">      
		<!-- You can plug in any custom CSS here to style the Vuesence Book-->
		<!-- <link rel="stylesheet" href="css/vuepress-style.css"> -->
		<!-- <link rel="stylesheet" href="css/google-style.css"> -->
	</head>

	<body>
		<div id="app" class="app">
			<vuesence-book
				header-title="My Book"
				:use-router="false"
			/>
		</div>
	</body>

	<script>
		new Vue({ el: '#app' })
	</script>

</html>
```
