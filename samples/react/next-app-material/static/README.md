# Next-app-material

## [Create steps](https://create-next-app.github.io/)
1. install
	- yarn add create-next-app-cli    
	- npm install --global create-next-app-cli
2. template
	- create-next-app my-app --template default
	- create-next-app my-app --template material
	- create-next-app my-app --template semantic
3. example
	- create-next-app my-app --example basic-css
	- create-next-app my-app --example with-typescript
	- create-next-app my-app --example with-next-css
	- create-next-app my-app --example with-next-sass
	- create-next-app my-app --example with-next-less
	- create-next-app my-app --example with-next-routes
	- create-next-app my-app --example with-redux
	- create-next-app my-app --example with-redux-wrapper
	- create-next-app my-app --example with-redux-saga
	- create-next-app my-app --example with-apollo-and-redux
	- create-next-app my-app --example with-apollo-and-redux-saga
	- create-next-app my-app --example with-relay-modern
	- create-next-app my-app --example with-relay-modern-server-express
	
## Problems
### create-next-app my-app --template material
1. `createGenerateClassName` not found in `src/getPageContext.js`
```javascript
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
// ==> yarn add @material-ui/styles
import { createMuiTheme } from '@material-ui/core/styles';
import { createGenerateClassName } from '@material-ui/styles';
```

2. Warning: Failed prop type: The following props are not supported: `sheetsManager`. Please remove them.
                in ThemeProvider (at _app.js:37)
comment out sheetsManager line
```javascript
<MuiThemeProvider
	theme={this.pageContext.theme}
	// sheetsManager={this.pageContext.sheetsManager}
>
	// ....
</MuiThemeProvider>
```


