import React from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import { withRouter } from 'react-router-dom';

class BeneficiarioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTemp: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }
    render() {
        // return <form onSubmit={this.handleSubmit}>
        //     <div className="AddAuthorForm__input">
        //         <label htmlFor="name">Name</label>
        //         <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange} />
        //     </div>
        //     <div className="AddAuthorForm__input">
        //         <label htmlFor="imageUrl">Image URL</label>
        //         <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange} />
        //     </div>
        //     <div className="AddAuthorForm__input">
        //         <label htmlFor="bookTemp">Books</label>
        //         {this.state.books.map((book) => <p key={book}>{book}</p>)}
        //         <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange} />
        //         <input type="button" value="+" onClick={this.handleAddBook} />
        //     </div>
        //     <input type="submit" value="Add" />
        // </form>;

        return (
            <Grid>
                <form>
                    <h1>Beneficiario</h1>
                </form>
            </Grid>
        )
    }
}

function AddBeneficiarioForm({ match, onAddAuthor }) {
    return <Grid>
        <BeneficiarioForm onAddAuthor={onAddAuthor} />
    </Grid>;
}

function mapDispatchToProps(dispatch, props) {
    debugger;

    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => { }, mapDispatchToProps)(AddBeneficiarioForm));
