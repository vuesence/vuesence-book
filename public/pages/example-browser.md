# Browser usage example

The Vuesence Book can be run as a standalone web component in the browser. Vue.js and vuesence-book.umd.min.js must be loaded. Vue-router must be disabled.

```html
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
		<title>vuesence-book demo</title>

		<script src="https://unpkg.com/vue"></script>
		<script src="https://unpkg.com/@vuesence/book@0.3.42"></script>

        <link rel="stylesheet" href="css/default.css">        
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