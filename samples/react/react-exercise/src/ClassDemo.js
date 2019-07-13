import React, {Component} from 'react';
import classNames from 'classnames';

// 强烈建议你不要创建自己的组件基类。 在 React 组件中，代码重用的主要方式是组合而不是继承。
class ClassDemo extends Component {
	// 常用
	/**
	 * 1. 如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。
	 * 2. constructor() 函数中不要调用 setState() 方法
	 * 3. 避免将 props 的值复制给 state！这是一个常见的错误：
	 */
	constructor(props) {
		super(props);

		this.state = {
			hasError: false,
			counter: 0,
			justClicked: null,
			letters: Array.from({length: 26}, (_, i) => String.fromCharCode(A + i))
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClickKey = this.handleClickKey.bind(this);
		this.handleClickKey2 = this.handleClickKey2.bind(this);
	}

	// Handle Events
	handleClick () {
		console.log(this.state.counter);
		this.setState({
			counter: 2
		});
		this.setState((state) => {
			return {
				counter: state.counter + 1
			}
		});
	}
	handleClickKey (letter) {
		this.setState({ justClicked: letter });
	}
	handleClickKey2(e) {
		this.setState({
			justClicked: e.target.dataset.letter
		});
	}

	// 不常用
	/**
	 * 1. 在其子组件树中的任何位置捕获 JavaScript 错误，并记录这些错误，展示降级 UI 而不是崩溃的组件树。
	 * Error boundaries 组件会捕获在渲染期间，在生命周期方法以及其整个树的构造函数中发生的错误。
	 * 2. getDerivedStateFromError() 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 componentDidCatch()。
	 *
	 */
	static getDerivedStateFromError(error) {
		return {hasError: true}
	}

	// 不常用
	/**
	 * 1. 在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
	 * 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
	 * 2. 此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props。
	 * 例如，实现 <Transition> 组件可能很方便，该组件会比较当前组件与下一组件，
	 * 以决定针对哪些组件进行转场动画。
	 */
	static getDerivedStateFromProps() {

	}

	// 不常用
	/**
	 * 此生命周期在后代组件抛出错误后被调用。
	 * 在“提交”阶段被调用，因此允许执行副作用
	 * @param errorInfo
	 */
	componentDidCatch(error, errorInfo) {
		// "组件堆栈" 例子:
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logComponentStackToMyService(info.componentStack);
	}

	// 不常用
	/**
	 * 如果 shouldComponentUpdate() 返回 false，则不会调用 render()。
	 * 如果 shouldComponentUpdate() 返回 false，则不会调用 componentDidUpdate()。
	 * 当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。
	 * 返回值默认为 true。首次渲染或使用 forceUpdate() 时不会调用该方法。
	 */
	shouldComponentUpdate(nextProps, nextState, nextContext) {

	}

	// 常用 && 必有
	/***
	 * 在 React.Component 的子类中有个必须定义的 render() 函数, 其他方法均为可选。
	 * 函数应该为纯函数，在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。
	 */
	render() {
		let btnClass = classNames('btn', this.props.className, {
		  'btn-pressed': this.state.isPressed,
		  'btn-over': !this.state.isPressed && this.state.isHovered
		});
		return (
				<dl>
					{props.items.map(item => (
							// 没有`key`，React 会发出一个关键警告
							<React.Fragment key={item.id}>
								<dt>{item.term}</dt>
								<dd>{item.description}</dd>
							</React.Fragment>
					))}
				</dl>
		);

		return (
				// 短语法不支持 key 或属性。
				<>
					<button className={btnClass} onClick={this.handleClick}>Click Me</button>
					<ChildA/>
					<ChildB/>
					{/* 注释写在这里 */}
					{/* 多行注释
					  也同样有效。 */}
					<ChildC/>
					<ul>
						{this.state.letters.map(letter =>
								<li key={letter} onClick={() => this.handleClickKey(letter)}>
									{letter}
								</li>
						)}
					</ul>
					<ul>
						{this.state.letters.map(letter =>
								<li key={letter} data-letter={letter} onClick={this.handleClickKey2}>
									{letter}
								</li>
						)}
					</ul>
				</>
		);

		// React 并*没有*创建一个新的 div。它只是把子元素渲染到 `domNode` 中。
		// `domNode` 是一个可以在任何位置的有效 DOM 节点。
		// return ReactDOM.createPortal(
		// 		this.props.children,
		// 		domNode
		// );
	}

	// 常用
	componentDidMount() {
		/**
		 * 1. 依赖于 DOM 节点的初始化应该放在这里;
		 * 2. 如需通过网络请求获取数据，此处是实例化请求的好地方;
		 * 3. 比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 componentWillUnmount() 里取消订阅;
		 */
	}

	// 不常用
	/***
	 * 1. 如果组件实现了 getSnapshotBeforeUpdate() 生命周期（不常用），
	 * 则它的返回值将作为 componentDidUpdate() 的第三个参数 “snapshot” 参数传递。
	 * 否则此参数将为 undefined。
	 * 2. 在最近一次渲染输出（提交到 DOM 节点）之前调用。
	 * 它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。
	 * 此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。
	 */
	getSnapshotBeforeUpdate(prevProps, prevState) {
		// 我们是否在 list 中添加新的 items ？
		// 捕获滚动​​位置以便我们稍后调整滚动位置。
		// if (prevProps.list.length < this.props.list.length) {
		// 	const list = this.listRef.current;
		// 	return list.scrollHeight - list.scrollTop;
		// }
		// return null;
	}

	// 常用
	/***
	 * 在更新后会被立即调用。首次渲染不会执行此方法。
	 * 当组件更新后，可以在此处对 DOM 进行操作。
	 * 如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。
	 * （例如，当 props 未发生变化时，则不会执行网络请求）。
	 */
	componentDidUpdate(prevProps, prevState, snapshot) {
		// 典型用法（不要忘记比较 props）：
		if (this.props.userID !== prevProps.userID) {
			this.fetchData(this.props.userID);
		}
	}

	// 常用
	/***
	 * 在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，
	 * 例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等。
	 */
	componentWillUnmount() {

	}
}

export default ClassDemo;

/**
 * 挂载
 当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

 constructor()
 static getDerivedStateFromProps()
 render()
 componentDidMount()

 下述生命周期方法即将过时，在新代码中应该避免使用它们：
 UNSAFE_componentWillMount()
 */

/**
 * 更新
 当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

 static getDerivedStateFromProps()
 shouldComponentUpdate()
 render()
 getSnapshotBeforeUpdate()
 componentDidUpdate()

 注意:
 下述方法即将过时，在新代码中应该避免使用它们：

 UNSAFE_componentWillUpdate()
 UNSAFE_componentWillReceiveProps()
 */

/**
 * 卸载
 当组件从 DOM 中移除时会调用如下方法：

 componentWillUnmount()
 */

/**
 * 错误处理
 当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

 static getDerivedStateFromError()
 componentDidCatch()
 */

/**
 * 组件还提供了一些额外的 API：

 setState()
 forceUpdate()
 */

/**
 * class 属性
 defaultProps
 displayName
 */

/**
 * 实例属性
 props
 state
 */

/**
 * DOM
 *
 * checked
 * 1. 当 <input> 组件的 type 类型为 checkbox 或 radio 时，组件支持 checked 属性。对于构建受控组件（controlled components）很有帮助
 * 2. defaultChecked 则是非受控组件的属性，用于设置组件首次挂载时是否被选中。
 *
 * className
 * 属性用于指定 CSS 的 class
 *
 * dangerouslySetInnerHTML
 * 是 React 为浏览器 DOM 提供 innerHTML 的替换方案。通常来讲，使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于跨站脚本（XSS）的攻击。
 * function createMarkup() {
		 return {__html: 'First &middot; Second'};
	 }

	 function MyComponent() {
		 return <div dangerouslySetInnerHTML={createMarkup()} />;
	 }
 *
 * htmlFor
 * 由于 for 在 JavaScript 中是保留字，所以 React 元素中使用了 htmlFor 来代替。
 *
 * onChange
 * 事件与预期行为一致：每当表单字段变化时，该事件都会被触发。
 *
 * selected
 * <option> 组件支持 selected 属性。你可以使用该属性设置组件是否被选择。这对构建受控组件很有帮助。
 *
 * style
 * 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串。
 * 这与 DOM 中 style 的 JavaScript 属性是一致的，同时会更高效的，且能预防跨站脚本（XSS）的安全漏洞。
 * 通常不推荐将 style 属性作为设置元素样式的主要方式。
 * const divStyle = {
		 WebkitTransition: 'all', // note the capital 'W' here
		 msTransition: 'all' // 'ms' is the only lowercase vendor prefix
	 };

	 function ComponentWithTransition() {
		 return <div style={divStyle}>This should work cross-browser</div>;
	 }
 * React 会自动添加 ”px” 后缀到内联样式为数字的属性后。如需使用 ”px” 以外的单位，请将此值设为数字与所需单位组成的字符串。
 * // Result style: '10px'
	 <div style={{ height: 10 }}>
		 Hello World!
	 </div>

	 // Result style: '10%'
	 <div style={{ height: '10%' }}>
		 Hello World!
	 </div>
 *
 * value
 * <input> 和 <textarea> 组件支持 value 属性。你可以使用它为组件设置 value。这对于构建受控组件是非常有帮助。
 * defaultValue 属性对应的是非受控组件的属性，用于设置组件第一次挂载时的 value。
 *
 * SyntheticEvent
 * boolean bubbles
	 boolean cancelable
	 DOMEventTarget currentTarget
	 boolean defaultPrevented
	 number eventPhase
	 boolean isTrusted
	 DOMEvent nativeEvent
	 void preventDefault()
	 boolean isDefaultPrevented()
	 void stopPropagation()
	 boolean isPropagationStopped()
	 DOMEventTarget target
	 number timeStamp
	 string type

 * 当事件处理函数返回 false 时，不再阻止事件冒泡。你可以选择使用 e.stopPropagation() 或者 e.preventDefault() 替代。
 * SyntheticEvent 是合并而来。这意味着 SyntheticEvent 对象可能会被重用，而且在事件回调函数被调用后，所有的属性都会无效。出于性能考虑，你不能通过异步访问事件。
 * function onClick(event) {
		 console.log(event); // => nullified object.
		 console.log(event.type); // => "click"
		 const eventType = event.type; // => "click"

		 setTimeout(function() {
			 console.log(event.type); // => null
			 console.log(eventType); // => "click"
		 }, 0);

		 // 不起作用，this.state.clickEvent 的值将会只包含 null
		 this.setState({clickEvent: event});

		 // 你仍然可以导出事件属性
		 this.setState({eventType: event.type});
	 }
 * 如果你想异步访问事件属性，你需在事件上调用 event.persist()，此方法会从池中移除合成事件，允许用户代码保留对事件的引用。
 *
 */