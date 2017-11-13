console.log('visibility-toggle');

class VisibilityToggle extends React.Component {

	constructor(props) {
		super(props);
		this.toggleDetails = this.toggleDetails.bind(this)
		this.state = {
			showDetails: false
		}
	}

	toggleDetails() {
		this.setState((prevState) => {
			return {
				showDetails: !prevState.showDetails
			}
		});
	}

	render() {
		return (
			<div>
				<h1>Visibility Toggle</h1>
				<button onClick={this.toggleDetails}>
					{this.state.showDetails ? 'Hide Details' : 'Show Details'}
				</button>
				{this.state.showDetails && (<p>Here are the nitty gritty details!</p>)}
			</div>
		);
	}
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

// let showDetails = false;

// const toggleDetails = () => {
//     showDetails = !showDetails;
//     render();    
// };

// const appRoot = document.getElementById('app');

// const render = () => {
//     const visibilityTemplate = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick={toggleDetails}>
//                 {showDetails ? 'Hide Details' : 'Show Details'}
//             </button>
//             {showDetails && (<p>Here are the nitty gritty details!</p>)}
//         </div>
//     );
//     ReactDOM.render(visibilityTemplate, appRoot);
// };

// render();

