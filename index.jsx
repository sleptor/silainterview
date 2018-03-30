class InterviewApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "si-" + Date.now(),
            title: "",
            description: "",
            poster: "",
            questions: [
                {
                    text: "WTF is going on?",
                    url: "https://www.youtube.com/watch?v=YCKI4FtezDk"
                }
            ]
        };

        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.questionChange = this.questionChange.bind(this);

        this.textChange = this.textChange.bind(this);
    }

    render() {
        return (
            <div>
                <Params
                    title={this.state.title}
                    poster={this.state.poster}
                    description={this.state.description}
                    textChange={this.textChange}
                />

                <QuestionsList
                    questions={this.state.questions}
                    addQuestion={this.addQuestion}
                    removeQuestion={this.removeQuestion}
                    textChange={this.questionChange}
                />

                {this.state.questions.length ?
                    <Results
                        id={this.state.id}
                        title={this.state.title}
                        description={this.state.description}
                        poster={this.state.poster}
                        questions={this.state.questions}
                    />
                    : null}
            </div>
        );
    }

    addQuestion() {
        const newQuestion = {
            text: '',
            url: ''
        };

        this.setState(prevState => ({
            questions: prevState.questions.concat(newQuestion),
            text: ''
        }));
    }

    removeQuestion(idx, e) {
        e.preventDefault();
        this.setState({
            questions: this.state.questions.filter((item, sidx) => idx !== sidx)
        });
    }

    questionChange(idx, field, e) {

        const newQuestions = this.state.questions.map((item, sidx) => {
            if (idx !== sidx) return item;
            return {...item, [field]: e.target.value};
        });

        this.setState({questions: newQuestions});
    }

    textChange(field, e) {
        this.setState({[field]: e.target.value});
    }
}

class Results extends React.Component {

    handleFocus(event) {
        event.target.select();
    }

    render() {
        const data = {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            poster: this.props.poster,
            questions: this.props.questions.filter((item) => item.text.length && item.url.length)
        };

        if(!data.questions.length) {
            return null;
        }

        const code = `<div id="${this.props.id}" class="sila-interview"></div>
<script>
var SileInterview = SileInterview || [];
SileInterview.push(${JSON.stringify(data, null, 2)});
</script>
<script src="silainterview.js"></script>
`;

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h5>Embed code</h5>
                </div>

                <div className="panel-body">
                    <textarea className="form-control" value={code} readOnly={true} onFocus={this.handleFocus}/>
                </div>
            </div>
        );
    }
}

class QuestionsList extends React.Component {

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h5>Questions</h5>
                </div>
                <div className="panel-body">
                    <fieldset>
                        {this.props.questions.map((item, idx) => (
                            <div className="question" key={idx}>
                                <div className="form-group">
                                    <input value={item.text} type="text" required placeholder="Question" className="form-control" onChange={(e) => this.props.textChange(idx, "text", e)}/>
                                </div>
                                <div className="form-group">
                                    <input value={item.url} type="url" required placeholder="Youtube URL" className="form-control" onChange={(e) => this.props.textChange(idx, "url", e)}/>
                                </div>
                                <div>
                                    <a className="" href="#" onClick={(e) => this.props.removeQuestion(idx, e)}>Remove</a>
                                </div>
                            </div>
                        ))}
                    </fieldset>
                    <button className="btn btn-primary" onClick={(e) => this.props.addQuestion()}>
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

class Params extends React.Component {

    handleBlur(e) {
        console.log(e.target.value);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h5>Common</h5>
                </div>
                <div className="panel-body">
                    <fieldset>
                        <div className="form-group">
                            <input onBlur={this.handleBlur} value={this.props.title} type="text" required placeholder="Title" className="form-control" onChange={(e) => this.props.textChange("title", e)}/>
                        </div>
                        <div className="form-group">
                            <input value={this.props.poster} type="text" required placeholder="Video poster URL" className="form-control" onChange={(e) => this.props.textChange("poster", e)}/>
                        </div>
                        <div className="form-group">
                            <textarea value={this.props.description} placeholder="Description" className="form-control" onChange={(e) => this.props.textChange("description", e)}/>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<InterviewApp/>, document.getElementById('root'));
