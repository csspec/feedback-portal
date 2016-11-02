import React from 'react';
import { Link } from 'react-router';
import SlideInUp from '../../Transitions/SlideInUp';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Button from '../../Button';
import Loading from '../../Loading';
import WhereIsEveryone from '../../ErrorImages/WhereIsEveryone';
import SideBar from '../../NavigationPane/SideBar';

const loader = (
    <div key="loader" style={{
                borderRadius: '2px',
                border: '1px solid lightgray',
                maxWidth: '400px',
                display: 'block',
                margin: 'auto',
                padding: '3em'
            }}>
        <Loading height={50} />
    </div>
)

class ListItem extends React.Component {
    render() {
        return (
            <Button className="list-group-item"
                    style={{outline: 0, border: 'none', padding: '1em'}}>
                    <Link to={ "/teachers/" + this.props.teacher.userId } className="row">
                        <div className="col-xs-2 col-sm-2" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="material-icons" style={{fontSize: '50px'}}>account_circle</span>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <strong style={{display: 'block'}}>{this.props.teacher.userName}</strong>
                            <small style={{display: 'block', color: 'gray'}}>{this.props.teacher.email}</small>
                        </div>
                        <div className="col-xs-4 col-sm-4">
                            { /* we have to somehow utilize this space */ }
                        </div>
                    </Link>
            </Button>
        )
    }
}

class TeachersListGroup extends React.Component {
    render() {
        let listitems = this.props.list.map(teacher => {
            return (
                <ListItem teacher={teacher} key={teacher.userId} /> 
            )
        });

        if (listitems.length < 1) {
            // Oops! there was no teacher in this college.
            listitems = (
                <WhereIsEveryone>
                    Where is everyone?
                </WhereIsEveryone>
            );
        }

        return (
            <div className="list-group" style={{
                borderRadius: '2px',
                border: '1px solid lightgray',
                maxWidth: '768px',
                display: 'block',
                margin: 'auto'
            }}>
            {listitems}
            </div>
        )
    }
}

export default class TeachersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teachersList: [],
            loading: true,
        }
    }

    fetchTeachersList() {
        window.fbApi.getTeachersList(list => {
            this.setState({teachersList: list, loading: false});
        })
    }

    componentDidMount() {
        this.fetchTeachersList();
    }

    render() {
        let view = !this.state.loading ? <TeachersListGroup list={this.state.teachersList} /> : loader;
        return (
            <div className="row"  style={{margin: 0}}>
                <div className="sidebar col-sm-2" style={{margin: 0}}>
                    <SideBar />
                </div>
                <div className="rest col-sm-10" style={{margin: 0, padding: 0}}>
                    <nav className="navbar navbar-default" style={{
                        border: 0,
                        borderRadius: '2px',
                    }}>
                        <div className="row" style={{
                            margin: 0,
                            maxWidth: '800px',
                            display: 'flex',
                            margin: 'auto',
                            alignItems: 'center'
                        }}>
                            <h4>Select a teacher</h4>
                        </div>
                    </nav>
                    <SlideInUp>
                        {view}
                    </SlideInUp>
                </div>
            </div>
        );
    }
}

