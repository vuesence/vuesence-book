# Vue-router

Vuesence Book optionally can use Vue-router - in this case user can bookmark a particular article in his browser

To enable it the __use-router__ `prop` must be set to `true` (default)

If your app already uses vue-router the next route should be added to the router configuration

```json
   {
      path: '/help',
      children: [
            {
               name: 'article',
               path: ':id',
            },
      ]
   }
```

This will give you `/#/help/article-id-from-config-json` routes for your articles. Article `ids` must be unique.

You can specify another `path` value of course