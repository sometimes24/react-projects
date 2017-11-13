console.log('counter-example');

class Counter extends React.Component {

	constructor(props) {
		super(props);
		this.addOne = this.addOne.bind(this);
		this.minusOne = this.minusOne.bind(this);
		this.reset = this.reset.bind(this);

		this.state = {
			count: 0
		}
	}

	componentDidMount(){
		const count = parseInt(localStorage.getItem('count'));
		console.log('componentDidMount', count)
		if(!isNaN(count)){
			this.setState(() => ({ count }));
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.count !== this.state.count){	
			localStorage.setItem('count', this.state.count);
		}
	}

	addOne() {
		this.setState((prevState) => ({	count: prevState.count + 1 }));
	}

	minusOne() {
		this.setState((prevState) => ({ count: prevState.count - 1 }));	
	}

	reset() {
		this.setState(() => ({ count: 0 }));	
	}

	render() {
		return (
			<div>
				<h1>Count: {this.state.count}</h1>
				<button onClick={this.addOne}>+1</button>
				<button onClick={this.minusOne}>-1</button>
				<button onClick={this.reset}>reset</button>
			</div>
		);
	}
}

ReactDOM.render(<Counter />, document.getElementById('app'));

// let count = 0;

// const addOne = () => {
//     count++;
//     console.log('addOne', count);
//     renderTemplateTwo();    
// };
// const minusOne = () => {
//     count--;
//     console.log('minusOne', count);
//     renderTemplateTwo();
// };
// const reset = () => {
//     count = 0;
//     console.log('reset', count);
//     renderTemplateTwo();
// };

// const appRoot = document.getElementById('app');

// const renderTemplateTwo = () => {
//     const templateTwo = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>        
//         </div>
//     );
//     //Virtual DOM algorithm is what's used to re-render pages.
//     //Minimum necessary changes is what takes place
//     ReactDOM.render(templateTwo, appRoot);
// };

// renderTemplateTwo();