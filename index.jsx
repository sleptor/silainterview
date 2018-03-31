import React from 'react';
import ReactDOM from 'react-dom';
import Clipboard from 'react-clipboard.js';
import validator from 'validator';

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
        this.upQuestion = this.upQuestion.bind(this);
        this.downQuestion = this.downQuestion.bind(this);

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
                    upQuestion={this.upQuestion}
                    downQuestion={this.downQuestion}
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

    removeQuestion(idx) {
        this.setState({
            questions: this.state.questions.filter((item, sidx) => idx !== sidx)
        });
    }

    move(arr, from, to) {
        arr.splice(to, 0, arr.splice(from, 1)[0]);
    };

    upQuestion(idx) {

        let questions = this.state.questions;

        this.move(questions, idx, idx-1);

        this.setState({
            questions: questions
        });
    }

    downQuestion(idx) {

        let questions = this.state.questions;

        this.move(questions, idx, idx+1);

        this.setState({
            questions: questions
        });
    }

    questionChange(idx, field, e) {

        const newQuestions = this.state.questions.map((item, sidx) => {
            if (idx !== sidx) return item;
            item[field] = e.target.value;

            return item;
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
            questions: this.props.questions.filter((item) => item.text.length && item.url.length && validator.isURL(item.url, {require_protocol: true}))
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
                    <div className="form-group">
                        <textarea id="code" className="form-control" value={code} readOnly={true} onFocus={this.handleFocus} />
                    </div>
                    <Clipboard className="btn btn-default" data-clipboard-text={code}>
                        Copy to clipboard
                    </Clipboard>
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
                                    <Input value={item.text} required={true} placeholder="Question" className="form-control" onChange={(e) => this.props.textChange(idx, "text", e)}/>
                                </div>
                                <div className="form-group">
                                    <Input value={item.url} type="url" required={true} placeholder="Youtube URL" className="form-control" onChange={(e) => this.props.textChange(idx, "url", e)}/>
                                </div>
                                <div>
                                    <a className="btn btn-sm btn-default" onClick={(e) => this.props.removeQuestion(idx)}>Remove</a>
                                    {' '}
                                    <a className={`btn btn-sm btn-default${idx===0?' hidden':''}`} onClick={(e) => this.props.upQuestion(idx)}>&uarr;</a>
                                    {' '}
                                    <a className={`btn btn-sm btn-default${idx===this.props.questions.length-1?' hidden':''}`} onClick={(e) => this.props.downQuestion(idx)}>&darr;</a>
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

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h5>Common</h5>
                </div>
                <div className="panel-body">
                    <fieldset>
                        <div className="form-group">
                            <Input autoFocus={true} value={this.props.title} type="text" required={true} placeholder="Title" className="form-control" onChange={(e) => this.props.textChange("title", e)}/>
                        </div>
                        <div className="form-group">
                            <Input value={this.props.poster} type="url" required={true} placeholder="Video poster URL" className="form-control" onChange={(e) => this.props.textChange("poster", e)}/>
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

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(e) {
        let error = false;
        if(this.props.required === true && !e.target.value.length) {
            error = true;
        }

        if(this.props.type == 'url' && !validator.isURL(e.target.value, {require_protocol: true})) {
            error = true;
        }

        this.setState({error: error});
    }

    validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    }

    render() {
        return (
            <input autoFocus={this.props.autoFocus} onBlur={this.handleBlur} value={this.props.value} type="text" placeholder={this.props.placeholder} className={`form-control${this.state.error?' error':''}`} onChange={(e) => this.props.onChange(e)}/>
        );
    }

}

ReactDOM.render(<InterviewApp/>, document.getElementById('root'));
