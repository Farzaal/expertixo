import React, { useEffect, useState }  from 'react';
import logo from './logo.svg';
import './App.css';
import questions from './questions.js';
import { Card, Typography, Row, Button, Col, Rate, Progress, Tooltip } from 'antd';
import "antd/dist/antd.css";

const gridStyle = {
  width: '50%',
  textAlign: 'center',
};

const messageStyle = {
  width: '100%',
  textAlign: 'center',
  marginTop: '40px'
}

const { Title, Text } = Typography;

function App() {
  const [current, setCurrent] = useState(0);
  const [test, setTest] = useState(questions);
  const [totalQuestions, setTotalQuestions] = useState(questions.length);
  const [options, setOptions] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [countCorrect, setCountCorrect] = useState(0);
  const [countInCorrect, setCountInCorrect] = useState(0);
  const [selected, setSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(0);
  const [rating, setRating] = useState(['default','easy','medium','hard'])
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const answer = decodeURI(test[current].correct_answer);
    const opts = [...test[current].incorrect_answers, answer];
    setSelected(false);
    setOptions(opts);
    setCorrect(answer);
    const remaining = countCorrect + (test.length - (current+1)); 
    console.log("From 100%");
    console.log("Score : ", (countCorrect/(current+1)*100));
    console.log("Maximum Score : ", ((countCorrect+remaining)/test.length * 100));
    console.log("Lowest Score : ", (countCorrect/test.length * 100));
  }, [current])

  const nextQuestion = () => {
    setCurrent(current+1)
    setProgress(progress+5) 
  }

  const optionSelection = (opt) => {

    if(selected) return;
    if(opt == correct) {
      setIsCorrect(true);
      setScore(score+5);
      setCountCorrect(countCorrect+1);
    } else {
      setIsCorrect(false);
      setCountInCorrect(countInCorrect+1);
    }

    setSelected(true);
  }
  return (
    <div style={{ width: '90%', margin: '0 auto', marginTop: '50px', padding: '40px' }}>
      <Progress percent={progress} />
      <Card type="inner" title={
        <div>
          <Title level={3}>Question {current+1} of {totalQuestions}</Title>
          <Text type="secondary">{decodeURI(test[current].category.replace(/\?|%3A|%3f|%2C/gi, ''))}</Text><br/>
          <Rate count={3} defaultValue={rating.indexOf(test[current].difficulty)} />
        </div>
      }>
      <Row>
        <Title style={{ padding: '20px' }} level={4}>{`${decodeURI(test[current].question.replace(/\?|%3f|%2C/gi, ''))} ?`}</Title>
      </Row>
      <Row>
        {options.map((opt, i) => 
              <Card.Grid key={i} style={gridStyle} onClick={() => optionSelection(opt)}>{decodeURI(opt)}</Card.Grid>
        )}
      </Row>
      {selected ? 
      <div>
        <Row>
          <Title style={messageStyle} level={3}>{ isCorrect ? 'Correct!' : 'Sorry!' }</Title>
        </Row>
        <Row>
        {(current+1) == test.length ? <Title style={messageStyle} level={3}>Your Test Has Been Completed</Title> :
          <Col span={12} offset={11}>
            <Button onClick={nextQuestion}>Next Question</Button>
          </Col>}
        </Row>
      </div> 
      : ''}
      </Card>
    </div>
  );
}

export default App;
