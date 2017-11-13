console.log('App.js is runnings');

const app = {
    title: 'Indecision App',
    subtitle: 'Where decisions are made...',
    options: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
};

// function displayOptions(options){
//     let optionsString = '';
//     app.options.forEach((option) => {
//         optionsString += <li>option</li>
//     });
//     return optionsString;
// }

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;
    console.log(option)

    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
        renderTemplate();        
    }
    
};

const clearOptions = () => {
    app.options = [];
    renderTemplate();            
}

const user = {
    name: 'Einas Madi',
    age: 23,
    location: 'Toronto, ON'
};

function getLocation(location){
    if(location){
        return <li><p>Location: {location}</p></li>;
    }
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    console.log('randomNum: ', randomNum);
    console.log('option: ', app.options[randomNum]);    
}


const appRoot = document.getElementById('app');

const renderTemplate = () => {

    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>

            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>            
            <button onClick={clearOptions}>Remove All</button>
            
            <ol>
                {app.options.map((option) => <li key={option}>{option}</li>)}
            </ol>
    
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
    
        </div>
    );
    ReactDOM.render(template, appRoot);

}

renderTemplate();
