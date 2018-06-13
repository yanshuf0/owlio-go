import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  Card,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  Container
} from 'reactstrap';
import './dash.css';

export default class DashComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      hoots: []
    };
  }

  loadHoots = () => {
    this.setState({
      hoots: this.state.hoots.concat('lorem ipsum')
    });
  };

  render() {
    const items = [];
    this.state.hoots.map((hoot, i) =>
      items.push(
        <Container fluid={true} key={i}>
          <Row>
            <Col className="nopadding">
              <Card
                body
                inverse
                style={{
                  backgroundColor: '#333',
                  borderColor: 'white',
                  height: '20em'
                }}
              >
                <CardTitle>Title</CardTitle>
                <CardText className="cardtext">{hoot}</CardText>
                <Button>Actions</Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6" className="nopadding">
              <Card
                body
                inverse
                style={{
                  backgroundColor: '#333',
                  borderColor: 'white',
                  height: '20em'
                }}
              >
                <CardTitle>Title</CardTitle>
                <CardText className="cardtext">{hoot}</CardText>
                <Button>Actions</Button>
              </Card>
            </Col>
            <Col md="6" className="nopadding">
              <Card
                body
                inverse
                style={{
                  backgroundColor: '#333',
                  borderColor: 'white',
                  height: '20em'
                }}
              >
                <CardTitle>Title</CardTitle>
                <CardText className="cardtext">{hoot}</CardText>
                <Button>Actions</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    );
    return (
      <InfiniteScroll pageStart={0} loadMore={this.loadHoots} hasMore={true}>
        {items}
      </InfiniteScroll>
    );
  }
}
