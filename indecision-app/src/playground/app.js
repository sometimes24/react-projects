console.log('app');

class IndecisionApp extends React.Component {

	constructor(props) {
		super(props);
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.state = {
			options: []
		};
	}

	componentDidMount(){
		try{
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if(options){
				this.setState(() => ({ options }));
			}
		} catch (e){
			//Do nothing
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.options.length !== this.state.options.length){
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}

	handleDeleteOptions() {
		this.setState(() => ({ options: [] }));
	}

	handlePick() {
		const randomOption = Math.floor(Math.random() * this.state.options.length);
		console.log('Option: ' + this.state.options[randomOption])
	}

	handleAddOption(option) {

		if (!option) {
			return "Option cannot be empty"
		} else if (this.state.options.indexOf(option) > -1) {
			return "Option already exists"
		}

		this.setState((prevState) => ({ 
			options: prevState.options.concat([option])
		}));
	}

	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => ({
			options: prevState.options.filter((option) => optionToRemove !== option)
		}));
	}

	render() {
		const subtitle = 'Where decisions are made...';

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
					options={this.state.options}
				/>
				<AddOption
					handleAddOption={this.handleAddOption}
				/>
			</div>
		);
	}
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			<h2>{props.subtitle}</h2>
		</div>
	);
}

Header.defaultProps = {
	title: 'Indecision'
}

const Action = (props) => {
	return (
		<div>
			<button
				disabled={!props.hasOptions}
				onClick={props.handlePick}
			>
				What should I do?
				</button>
		</div>
	);
}

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove all</button>
			{props.options.length === 0 && <p>Add options to get started</p>}
			<ol>
				{
					props.options.map(option =>
						<Option 
							handleDeleteOption={props.handleDeleteOption} 
							key={option} 
							optionText={option} 
						/>
					)
				}
			</ol>
		</div>
	);
}

const Option = (props) => {
	return (
		<div>
			<li>{props.optionText}</li>
				<button 
					onClick={(e) => {props.handleDeleteOption(props.optionText)}}
				>
					Remove Option
				</button>
		</div>
	);
}

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);

		this.state = {
			error: undefined
		}
	}

	handleAddOption(e) {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option)
		this.setState(() => ({ error }));

		if(!error){
			e.target.elements.option.value = '';
		}
	}

	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type='text' name='option' />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));