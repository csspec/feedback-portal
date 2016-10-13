import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import QuestionList from './QuestionList';
import Footer from './Footer';
import '../sass/common.sass';

const questionList = [
	{
		id: 1,
		type: 'level',
		statement: 'Rate the instructor of your course',
		prop: {
			level: 5
		}
	},
	{
		id: 2,
		type: 'text',
		statement: 'Tell me about yourself.',
		prop: {}
	},
	{
		id: 3,
		type: 'multiple',
		statement: 'How was the course?',
		prop: {
			options: [
				{
					label: 'A',
					value: 'Easy'
				},
				{
					label: 'B',
					value: 'Medium'
				},
				{
					label: 'C',
					value: 'Difficult'
				}
			]
		}
	}
]

class App extends React.Component {
  render() {
    return (
    	<div>
    		<Header />
    		<QuestionList questionList={questionList} />
            <Footer/>
      	</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-mount-point'));
